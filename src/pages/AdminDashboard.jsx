
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Settings, Database, Activity, BarChart4 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [stats, setStats] = useState({
    users: 0,
    experts: 0,
    bookings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
        return;
      }
      
      if (!isAdmin) {
        navigate("/");
        toast.error("You do not have permission to access this page");
        return;
      }
      
      fetchStats();
    }
  }, [user, loading, isAdmin, navigate]);
  
  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // Count users with user_type = 'user'
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'user');
      
      if (userError) throw userError;
      
      // Count users with user_type = 'expert'
      const { count: expertCount, error: expertError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'expert');
      
      if (expertError) throw expertError;
      
      setStats({
        users: userCount || 0,
        experts: expertCount || 0,
        bookings: 0, // Placeholder for future booking functionality
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your platform and view analytics
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                    Users
                  </CardTitle>
                  <CardDescription>Total registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.users}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-500" />
                    Experts
                  </CardTitle>
                  <CardDescription>Total registered experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.experts}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-purple-500" />
                    Bookings
                  </CardTitle>
                  <CardDescription>Total completed bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.bookings}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-primary" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full sm:w-auto" onClick={() => navigate("/admin/users")}>
                      Manage Users
                    </Button>
                    <Button className="w-full sm:w-auto" variant="outline" onClick={() => navigate("/admin/experts")}>
                      Manage Experts
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-primary" />
                    Platform Settings
                  </CardTitle>
                  <CardDescription>Configure system settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full sm:w-auto" onClick={() => navigate("/admin/settings")}>
                      General Settings
                    </Button>
                    <Button className="w-full sm:w-auto" variant="outline" onClick={() => navigate("/admin/categories")}>
                      Manage Categories
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart4 className="mr-2 h-5 w-5 text-primary" />
                    Platform Analytics
                  </CardTitle>
                  <CardDescription>Overview of platform performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Analytics charts will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
