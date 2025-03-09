
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  User, BookOpen, Languages, Upload, DollarSign, 
  CheckCircle, Clock, Save, Award
} from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { mockCategories } from "@/lib/supabase";

const ExpertProfile = () => {
  const navigate = useNavigate();
  const { user, profile, loading, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expertData, setExpertData] = useState({
    title: "",
    category_id: "",
    price: "",
    experience: "",
    languages: [] as string[],
    location: "",
    about: "",
    education: "",
    specializations: [] as string[],
  });
  const [consultationModes, setConsultationModes] = useState({
    video: true,
    audio: true,
    chat: false,
  });
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchExpertProfile();
    }
  }, [user, loading]);

  const fetchExpertProfile = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("experts")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching expert profile:", error);
        if (error.code !== "PGRST116") { // Not found error code
          toast.error("Error loading profile");
        }
        return;
      }

      if (data) {
        setExpertData({
          title: data.title || "",
          category_id: data.category_id?.toString() || "",
          price: data.price?.toString() || "",
          experience: data.experience || "",
          languages: data.languages || [],
          location: data.location || "",
          about: data.about || "",
          education: data.education || "",
          specializations: data.specializations || [],
        });
        setProfileExists(true);
      }
    } catch (error) {
      console.error("Error in fetchExpertProfile:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpertData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setExpertData(prev => {
      const languages = [...prev.languages];
      if (languages.includes(language)) {
        return { ...prev, languages: languages.filter(lang => lang !== language) };
      } else {
        return { ...prev, languages: [...languages, language] };
      }
    });
  };

  const handleSpecializationToggle = (specialization: string) => {
    setExpertData(prev => {
      const specializations = [...prev.specializations];
      if (specializations.includes(specialization)) {
        return { ...prev, specializations: specializations.filter(spec => spec !== specialization) };
      } else {
        return { ...prev, specializations: [...specializations, specialization] };
      }
    });
  };

  const handleConsultationModeChange = (mode: keyof typeof consultationModes) => {
    setConsultationModes(prev => ({ ...prev, [mode]: !prev[mode] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);

      // Update the user type to 'expert' if it's not already
      if (profile?.user_type !== 'expert') {
        await updateProfile({ user_type: 'expert' });
      }

      // Prepare expert data
      const expertProfileData = {
        id: user.id,
        title: expertData.title,
        category_id: parseInt(expertData.category_id),
        price: expertData.price ? parseFloat(expertData.price) : null,
        experience: expertData.experience,
        languages: expertData.languages,
        location: expertData.location,
        about: expertData.about,
        education: expertData.education,
        specializations: expertData.specializations,
        verified_status: false, // Default to pending verification
      };

      // Insert or update the expert profile
      const { error } = profileExists
        ? await supabase
            .from("experts")
            .update(expertProfileData)
            .eq("id", user.id)
        : await supabase
            .from("experts")
            .insert([expertProfileData]);

      if (error) {
        throw error;
      }

      toast.success(
        profileExists 
        ? "Expert profile updated successfully!" 
        : "Expert profile created! It will be reviewed shortly."
      );
      navigate("/expert-dashboard");
    } catch (error: any) {
      console.error("Error saving expert profile:", error);
      toast.error(error.message || "Failed to save expert profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 px-6 flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-3">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">{profileExists ? "Edit Expert Profile" : "Expert Profile Setup"}</h1>
            <p className="text-muted-foreground mb-8">
              {profileExists 
                ? "Update your professional details and services" 
                : "Complete your profile to start offering consultations"}
            </p>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="personal">Personal Details</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="personal" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="mr-2 h-5 w-5 text-primary" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="e.g. Senior Financial Advisor"
                            value={expertData.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            name="category_id" 
                            value={expertData.category_id} 
                            onValueChange={(value) => setExpertData(prev => ({ ...prev, category_id: value }))}
                            required
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input
                            id="experience"
                            name="experience"
                            placeholder="e.g. 5+ years"
                            value={expertData.experience}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="e.g. New York, USA or Remote"
                            value={expertData.location}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="block mb-2">Languages</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["English", "Spanish", "French", "German", "Chinese", "Other"].map(language => (
                            <div key={language} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`language-${language}`} 
                                checked={expertData.languages.includes(language)}
                                onCheckedChange={() => handleLanguageToggle(language)}
                              />
                              <label 
                                htmlFor={`language-${language}`}
                                className="text-sm cursor-pointer"
                              >
                                {language}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="about">About</Label>
                        <Textarea
                          id="about"
                          name="about"
                          placeholder="Tell clients about yourself and your expertise..."
                          value={expertData.about}
                          onChange={handleInputChange}
                          className="min-h-32"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="credentials" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-primary" />
                        Education & Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Textarea
                          id="education"
                          name="education"
                          placeholder="List your degrees, universities, certifications..."
                          value={expertData.education}
                          onChange={handleInputChange}
                          className="min-h-32"
                          required
                        />
                      </div>
                      
                      <div className="mt-6">
                        <Label className="block mb-4">Areas of Specialization</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["Investment", "Tax Planning", "Retirement", "Estate Planning", "Insurance", "Business Finance", "Personal Finance", "Debt Management"].map(specialization => (
                            <div key={specialization} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`specialization-${specialization}`} 
                                checked={expertData.specializations.includes(specialization)}
                                onCheckedChange={() => handleSpecializationToggle(specialization)}
                              />
                              <label 
                                htmlFor={`specialization-${specialization}`}
                                className="text-sm cursor-pointer"
                              >
                                {specialization}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
                        <div className="flex items-start">
                          <Upload className="h-5 w-5 text-primary mt-1 mr-3" />
                          <div>
                            <h4 className="font-medium">Upload Credentials (Coming Soon)</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Soon you'll be able to upload certificates, degrees, and other credentials to verify your expertise.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="services" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-primary" />
                        Consultation Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="price">Consultation Fee ($ per hour)</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="e.g. 100"
                            value={expertData.price}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label className="block mb-2">Consultation Modes</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-md p-4">
                            <div className="flex items-start">
                              <Checkbox 
                                id="mode-video" 
                                checked={consultationModes.video}
                                onCheckedChange={() => handleConsultationModeChange('video')}
                              />
                              <div className="ml-3">
                                <label htmlFor="mode-video" className="font-medium cursor-pointer">Video Call</label>
                                <p className="text-xs text-muted-foreground mt-1">Face-to-face virtual consultations</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4">
                            <div className="flex items-start">
                              <Checkbox 
                                id="mode-audio" 
                                checked={consultationModes.audio}
                                onCheckedChange={() => handleConsultationModeChange('audio')}
                              />
                              <div className="ml-3">
                                <label htmlFor="mode-audio" className="font-medium cursor-pointer">Audio Call</label>
                                <p className="text-xs text-muted-foreground mt-1">Voice-only consultations</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4">
                            <div className="flex items-start">
                              <Checkbox 
                                id="mode-chat" 
                                checked={consultationModes.chat}
                                onCheckedChange={() => handleConsultationModeChange('chat')}
                              />
                              <div className="ml-3">
                                <label htmlFor="mode-chat" className="font-medium cursor-pointer">Chat</label>
                                <p className="text-xs text-muted-foreground mt-1">Text-based consultations</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            You'll be able to set your availability schedule after completing your profile.
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Saving...
                        </>
                      ) : profileExists ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Update Profile
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Submit for Review
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ExpertProfile;
