
// Placeholder for Supabase integration
// This will be implemented when connecting to a Supabase project
// For now, we're using mock data

export const mockCategories = [
  {
    id: 1,
    name: "Chartered Accountants",
    icon: "calculator",
    description: "Tax planning, financial consulting and accounting services",
    count: 25
  },
  {
    id: 2,
    name: "Lawyers",
    icon: "scale",
    description: "Legal advice, document preparation, and representation",
    count: 42
  },
  {
    id: 3,
    name: "Company Secretaries",
    icon: "briefcase",
    description: "Corporate compliance, governance and advisory services",
    count: 18
  },
  {
    id: 4,
    name: "Financial Advisors",
    icon: "trending-up",
    description: "Investment strategies, portfolio management and planning",
    count: 34
  }
];

export const mockProfessionals = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Chartered Accountant",
    categoryId: 1,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviewCount: 128,
    experience: "8 years",
    price: 150,
    availableToday: true,
    location: "New York",
    about: "Specialized in tax planning for startups and small businesses. Harvard graduate with experience at Deloitte."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Corporate Lawyer",
    categoryId: 2,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviewCount: 93,
    experience: "12 years",
    price: 200,
    availableToday: false,
    location: "San Francisco",
    about: "Specialized in intellectual property and technology law. Helped over 50 startups with legal structure and compliance."
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Company Secretary",
    categoryId: 3,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 75,
    experience: "6 years",
    price: 120,
    availableToday: true,
    location: "Chicago",
    about: "Expert in corporate governance and regulatory compliance. Former advisor to multiple Fortune 500 companies."
  },
  {
    id: 4,
    name: "David Rodriguez",
    title: "Financial Advisor",
    categoryId: 4,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviewCount: 114,
    experience: "10 years",
    price: 180,
    availableToday: true,
    location: "Miami",
    about: "Specialized in retirement planning and investment strategies. Certified financial planner with a track record of positive returns."
  },
  {
    id: 5,
    name: "Emma Wilson",
    title: "Tax Consultant",
    categoryId: 1,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 89,
    experience: "7 years",
    price: 140,
    availableToday: false,
    location: "Boston",
    about: "Specialist in international taxation and cross-border transactions. Helped clients save over $2M in taxes collectively."
  },
  {
    id: 6,
    name: "James Lee",
    title: "Employment Lawyer",
    categoryId: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviewCount: 156,
    experience: "15 years",
    price: 220,
    availableToday: true,
    location: "Seattle",
    about: "Specialized in employment law, workplace policy, and dispute resolution. Former legal counsel for major tech companies."
  }
];

export const mockTimeSlots = [
  { id: 1, time: "09:00 AM", available: true },
  { id: 2, time: "10:00 AM", available: true },
  { id: 3, time: "11:00 AM", available: false },
  { id: 4, time: "12:00 PM", available: false },
  { id: 5, time: "01:00 PM", available: true },
  { id: 6, time: "02:00 PM", available: true },
  { id: 7, time: "03:00 PM", available: true },
  { id: 8, time: "04:00 PM", available: false },
  { id: 9, time: "05:00 PM", available: true }
];
