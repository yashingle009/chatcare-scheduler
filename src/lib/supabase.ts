
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
    about: "Specialized in tax planning for startups and small businesses. Harvard graduate with experience at Deloitte.",
    bio: "Sarah is a chartered accountant with over 8 years of experience specializing in tax planning and financial consulting for startups and small businesses. She has a proven track record of helping clients optimize their tax strategies and improve financial performance.",
    education: "MBA in Finance, Harvard Business School\nBachelors in Accounting, NYU",
    languages: ["English", "Spanish"],
    specializations: ["Tax Planning", "Financial Consulting", "Startup Advisory"],
    verifiedStatus: true,
    services: [
      { id: 1, name: "Tax Consultation", duration: "45 min", price: 150, description: "Comprehensive review of your tax situation with strategic planning advice." },
      { id: 2, name: "Financial Planning", duration: "60 min", price: 200, description: "Detailed financial planning session tailored to your business needs." },
      { id: 3, name: "Audit Preparation", duration: "90 min", price: 300, description: "Complete preparation for upcoming audits to ensure compliance." }
    ]
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
    about: "Specialized in intellectual property and technology law. Helped over 50 startups with legal structure and compliance.",
    bio: "Michael is a corporate lawyer with 12 years of experience specializing in intellectual property and technology law. He has helped establish the legal foundation for over 50 successful startups and continues to serve as legal counsel for several tech companies.",
    education: "JD, Stanford Law School\nBachelors in Business, UC Berkeley",
    languages: ["English", "Mandarin", "Cantonese"],
    specializations: ["Intellectual Property", "Technology Law", "Corporate Compliance"],
    verifiedStatus: true,
    services: [
      { id: 1, name: "Legal Consultation", duration: "45 min", price: 200, description: "General legal advice for your business needs." },
      { id: 2, name: "Contract Review", duration: "60 min", price: 250, description: "Detailed review of contracts with recommendations." },
      { id: 3, name: "IP Strategy", duration: "90 min", price: 375, description: "Comprehensive intellectual property strategy session." }
    ]
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
    about: "Expert in corporate governance and regulatory compliance. Former advisor to multiple Fortune 500 companies.",
    bio: "Priya is a Company Secretary with 6 years of experience in corporate governance and regulatory compliance. She has advised multiple Fortune 500 companies and specializes in ensuring businesses maintain proper documentation and follow all regulatory requirements.",
    education: "Masters in Corporate Law, University of Chicago\nBachelors in Business Administration, Northwestern University",
    languages: ["English", "Hindi", "Gujarati"],
    specializations: ["Corporate Governance", "Regulatory Compliance", "Board Advisory"],
    verifiedStatus: true,
    services: [
      { id: 1, name: "Compliance Review", duration: "45 min", price: 120, description: "Review of your company's compliance with regulatory requirements." },
      { id: 2, name: "Corporate Documentation", duration: "60 min", price: 150, description: "Assistance with preparing and maintaining corporate documents." },
      { id: 3, name: "Board Meeting Preparation", duration: "75 min", price: 185, description: "Complete preparation for board meetings including all required documentation." }
    ]
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
    about: "Specialized in retirement planning and investment strategies. Certified financial planner with a track record of positive returns.",
    bio: "David is a certified financial advisor with 10 years of experience in retirement planning and investment strategies. He has helped hundreds of clients achieve their financial goals through personalized investment plans and has a proven track record of generating positive returns.",
    education: "Masters in Finance, University of Miami\nBachelors in Economics, Florida State University",
    languages: ["English", "Spanish"],
    specializations: ["Retirement Planning", "Investment Strategies", "Wealth Management"],
    verifiedStatus: true,
    services: [
      { id: 1, name: "Financial Review", duration: "45 min", price: 180, description: "Comprehensive review of your current financial situation." },
      { id: 2, name: "Investment Planning", duration: "60 min", price: 225, description: "Detailed investment strategy tailored to your goals." },
      { id: 3, name: "Retirement Planning", duration: "75 min", price: 280, description: "Complete retirement planning session with projections and strategies." }
    ]
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
    about: "Specialist in international taxation and cross-border transactions. Helped clients save over $2M in taxes collectively.",
    bio: "Emma is a tax consultant with 7 years of experience specializing in international taxation and cross-border transactions. She has helped her clients collectively save over $2M in taxes through strategic planning and expert knowledge of international tax codes.",
    education: "Masters in Taxation, Boston University\nBachelors in Accounting, Northeastern University",
    languages: ["English", "French"],
    specializations: ["International Taxation", "Cross-border Transactions", "Tax Optimization"],
    verifiedStatus: true,
    services: [
      { id: 1, name: "Tax Consultation", duration: "45 min", price: 140, description: "General tax consultation for your specific situation." },
      { id: 2, name: "International Tax Planning", duration: "60 min", price: 185, description: "Specialized planning for international taxation issues." },
      { id: 3, name: "Tax Audit Support", duration: "90 min", price: 275, description: "Complete support during tax audits including representation." }
    ]
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
    about: "Specialized in employment law, workplace policy, and dispute resolution. Former legal counsel for major tech companies.",
    bio: "James is an employment lawyer with 15 years of experience specializing in workplace policy and dispute resolution. He previously served as legal counsel for several major tech companies and now provides expert advice to businesses on employment law compliance and best practices.",
    education: "JD, University of Washington\nBachelors in Political Science, Seattle University",
    languages: ["English", "Korean"],
    specializations: ["Employment Law", "Workplace Policy", "Dispute Resolution"],
    verifiedStatus: true,
    services: [
      { id: 1, name: "Employment Law Consultation", duration: "45 min", price: 220, description: "General consultation on employment law matters." },
      { id: 2, name: "Policy Review", duration: "60 min", price: 275, description: "Detailed review of your workplace policies and procedures." },
      { id: 3, name: "Dispute Resolution", duration: "90 min", price: 395, description: "Strategic consultation for ongoing employment disputes." }
    ]
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

export const mockReviews = [
  {
    id: 1,
    professionalId: 1,
    author: "John D.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    date: "2023-12-15",
    comment: "Sarah provided excellent tax planning advice for my startup. Her strategies helped us save a significant amount on our tax obligations. Highly recommend her services!"
  },
  {
    id: 2,
    professionalId: 1,
    author: "Emily R.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    date: "2023-11-22",
    comment: "Very knowledgeable and professional. Sarah took the time to understand my business needs and provided tailored advice. Will definitely use her services again."
  },
  {
    id: 3,
    professionalId: 1,
    author: "Robert L.",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    date: "2023-10-08",
    comment: "Outstanding financial consultant! Sarah helped me navigate some complex tax situations with ease. Her expertise is truly invaluable."
  },
  {
    id: 4,
    professionalId: 2,
    author: "Lisa K.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    date: "2023-12-10",
    comment: "Michael provided excellent legal advice for my tech startup. His knowledge of IP law is extensive, and he was able to help us secure our patents efficiently."
  },
  {
    id: 5,
    professionalId: 2,
    author: "Daniel W.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    date: "2023-11-25",
    comment: "Great experience working with Michael on our corporate contracts. He was thorough and caught several issues that could have caused problems down the line."
  },
  {
    id: 6,
    professionalId: 3,
    author: "Sophia T.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    date: "2023-12-18",
    comment: "Priya is exceptionally knowledgeable about corporate governance. She helped our board navigate some complex regulatory requirements with ease. Highly recommended!"
  },
  {
    id: 7,
    professionalId: 4,
    author: "Alex M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4,
    date: "2023-12-05",
    comment: "David provided solid investment advice that has already improved my portfolio performance. His retirement planning strategies were particularly helpful."
  },
  {
    id: 8,
    professionalId: 5,
    author: "Jessica P.",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    date: "2023-11-30",
    comment: "Emma is an expert in international tax matters. As someone with business interests in multiple countries, her advice was invaluable and saved me thousands in tax liabilities."
  },
  {
    id: 9,
    professionalId: 6,
    author: "Thomas B.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    date: "2023-12-12",
    comment: "James provided excellent counsel regarding an employment dispute we were facing. His approach was strategic and ultimately led to a favorable resolution."
  }
];
