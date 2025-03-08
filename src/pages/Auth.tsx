
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Lock, UserCheck, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "expert">("user");
  const { signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      await signUp(email, password, userType);
    } else {
      await signIn(email, password);
    }
  };

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-16 px-6">
        <motion.div 
          className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-border p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp 
                ? "Sign up to connect with professionals" 
                : "Sign in to continue to your account"}
            </p>
          </div>
          
          <motion.form 
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-5"
            key={isSignUp ? "signup" : "signin"}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {isSignUp && (
              <div className="space-y-3">
                <Label>I am a:</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={(value) => setUserType(value as "user" | "expert")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className={`border rounded-lg p-4 cursor-pointer transition-all ${userType === "user" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="user" id="user" className="sr-only" />
                    <Label htmlFor="user" className="flex flex-col items-center cursor-pointer space-y-2">
                      <UserCheck className={`w-6 h-6 ${userType === "user" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">Client/User</span>
                      <span className="text-xs text-muted-foreground text-center">Looking for professional services</span>
                    </Label>
                  </div>
                  
                  <div className={`border rounded-lg p-4 cursor-pointer transition-all ${userType === "expert" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value="expert" id="expert" className="sr-only" />
                    <Label htmlFor="expert" className="flex flex-col items-center cursor-pointer space-y-2">
                      <UserCheck className={`w-6 h-6 ${userType === "expert" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">Expert</span>
                      <span className="text-xs text-muted-foreground text-center">Providing professional services</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  {isSignUp ? "Sign Up" : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
