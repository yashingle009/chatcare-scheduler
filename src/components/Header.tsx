
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCircle2, Calendar, Home, Menu, X, Search, Settings, Edit, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Find Professionals", path: "/professionals", icon: <Search className="h-5 w-5" /> },
    { name: "My Bookings", path: "/bookings", icon: <Calendar className="h-5 w-5" /> }
  ];
  
  const isActive = (path: string) => {
    if (path === "/profile" && location.pathname.startsWith("/profile")) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ease-apple",
          scrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-xl font-semibold tracking-tight"
            >
              ConsultEase
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-full relative transition-all duration-300 ease-apple",
                  isActive(item.path) 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full"
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </Link>
            ))}
            
            {/* Profile Popover */}
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={cn(
                      "ml-2 rounded-full transition-all duration-300 ease-apple",
                      isActive("/profile") 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <UserCircle2 className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-2">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-medium">
                        {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : 'Your Account'}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {profile?.user_type === 'expert' ? 'Expert' : 'User'} Account
                      </p>
                    </div>
                    
                    <div className="p-2">
                      <Link to="/profile">
                        <Button variant="ghost" className="w-full justify-start h-auto py-2 px-3 mb-1">
                          <UserCircle2 className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </Link>
                      <Link to="/profile/edit">
                        <Button variant="ghost" className="w-full justify-start h-auto py-2 px-3 mb-1">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </Link>
                      <Link to="/settings">
                        <Button variant="ghost" className="w-full justify-start h-auto py-2 px-3 mb-1">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      </Link>
                      
                      <div className="h-px bg-border my-2"></div>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start h-auto py-2 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate("/auth")}
                className="ml-2"
              >
                Sign In
              </Button>
            )}
          </nav>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="p-2 rounded-full md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu className={cn(
              "h-6 w-6 transition-opacity duration-300 ease-apple",
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            )} />
            <X className={cn(
              "h-6 w-6 absolute transition-opacity duration-300 ease-apple",
              mobileMenuOpen ? "opacity-100" : "opacity-0"
            )} />
          </motion.button>
        </div>
      </header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 pt-24 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.nav 
              className="flex flex-col space-y-3"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                    }
                  }}
                >
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center p-4 rounded-xl ",
                      isActive(item.path) 
                        ? "bg-secondary text-primary font-medium" 
                        : "text-muted-foreground hover:bg-secondary/50"
                    )}
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* User Authentication in Mobile Menu */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                  }
                }}
              >
                <div className="mt-4 border-t border-border pt-4">
                  {user ? (
                    <>
                      <div className="text-sm font-medium text-muted-foreground mb-2 px-4">
                        {profile?.user_type === 'expert' ? 'Expert Account' : 'User Account'}
                      </div>
                      
                      <Link 
                        to="/profile"
                        className="flex items-center p-4 rounded-xl text-muted-foreground hover:bg-secondary/50"
                      >
                        <UserCircle2 className="h-5 w-5 mr-3" />
                        <span>View Profile</span>
                      </Link>
                      
                      <Link 
                        to="/profile/edit"
                        className="flex items-center p-4 rounded-xl text-muted-foreground hover:bg-secondary/50"
                      >
                        <Edit className="h-5 w-5 mr-3" />
                        <span>Edit Profile</span>
                      </Link>
                      
                      <Link 
                        to="/settings"
                        className="flex items-center p-4 rounded-xl text-muted-foreground hover:bg-secondary/50"
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        <span>Settings</span>
                      </Link>
                      
                      <button 
                        className="flex items-center p-4 rounded-xl text-destructive hover:bg-destructive/10 w-full"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => navigate("/auth")}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Sign In / Sign Up
                    </Button>
                  )}
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
