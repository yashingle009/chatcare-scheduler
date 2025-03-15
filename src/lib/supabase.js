
export const mockCategories = [
  {
    id: 1,
    name: "Legal Consultation",
    description: "Get expert legal advice from qualified attorneys across various specializations.",
    icon: "Scale",
    professionals: 42
  },
  {
    id: 2,
    name: "Mental Health",
    description: "Connect with licensed therapists, counselors, and psychologists for mental wellness support.",
    icon: "Brain",
    professionals: 68
  },
  {
    id: 3,
    name: "Financial Advisory",
    description: "Professional guidance on investments, retirement planning, taxes, and wealth management.",
    icon: "LineChart",
    professionals: 35
  },
  {
    id: 4,
    name: "Career Coaching",
    description: "Get personalized career advice, resume reviews, and interview preparation from experienced coaches.",
    icon: "Briefcase",
    professionals: 27
  },
  {
    id: 5,
    name: "Nutrition & Dietetics",
    description: "Consult with registered dietitians for personalized nutrition plans and dietary guidance.",
    icon: "Apple",
    professionals: 31
  },
  {
    id: 6,
    name: "Business Consultancy",
    description: "Strategic advice for businesses from experienced consultants across various industries.",
    icon: "Building",
    professionals: 39
  },
  {
    id: 7,
    name: "Academic Tutoring",
    description: "One-on-one tutoring sessions with qualified educators across various subjects and levels.",
    icon: "GraduationCap",
    professionals: 53
  },
  {
    id: 8,
    name: "Fitness & Wellness",
    description: "Personalized fitness programs and wellness advice from certified trainers and coaches.",
    icon: "Dumbbell",
    professionals: 44
  },
  {
    id: 9,
    name: "Tech Support",
    description: "Technical assistance and IT consultations from experienced professionals.",
    icon: "Laptop",
    professionals: 29
  },
  {
    id: 10,
    name: "Design Consultation",
    description: "Creative guidance from experienced designers for various design-related projects.",
    icon: "Palette",
    professionals: 36
  },
  {
    id: 11,
    name: "Language Learning",
    description: "Private language lessons with fluent speakers and certified language teachers.",
    icon: "Languages",
    professionals: 47
  },
  {
    id: 12,
    name: "Parenting & Childcare",
    description: "Expert advice on parenting strategies, child development, and family dynamics.",
    icon: "Baby",
    professionals: 25
  }
];

export const mockProfessionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviewCount: 124,
    location: "New York, NY",
    price: 120,
    experience: "15+ years",
    about: "Dr. Johnson specializes in cognitive behavioral therapy and has helped hundreds of individuals overcome anxiety, depression, and stress-related disorders. Her warm and empathetic approach creates a safe space for clients to explore their challenges.",
    specialties: ["Anxiety Disorders", "Depression", "Stress Management", "Trauma"],
    education: [
      "Ph.D. in Clinical Psychology, Stanford University",
      "M.A. in Psychology, Columbia University",
      "Licensed Clinical Psychologist"
    ],
    availability: {
      monday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
      tuesday: ["10:00 AM - 3:00 PM"],
      wednesday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
      thursday: ["10:00 AM - 3:00 PM"],
      friday: ["9:00 AM - 1:00 PM"]
    },
    category: 2
  },
  {
    id: 2,
    name: "James Wilson",
    title: "Financial Advisor, CFP",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviewCount: 98,
    location: "Chicago, IL",
    price: 150,
    experience: "12 years",
    about: "James is a Certified Financial Planner with expertise in retirement planning, investment strategies, and wealth management. He takes a holistic approach to financial planning, helping clients achieve long-term financial security and peace of mind.",
    specialties: ["Retirement Planning", "Investment Management", "Tax Planning", "Estate Planning"],
    education: [
      "MBA in Finance, University of Chicago",
      "Certified Financial Planner (CFP)",
      "Series 7 and 66 Licenses"
    ],
    availability: {
      monday: ["8:00 AM - 4:00 PM"],
      tuesday: ["8:00 AM - 4:00 PM"],
      wednesday: ["8:00 AM - 4:00 PM"],
      thursday: ["8:00 AM - 4:00 PM"],
      friday: ["8:00 AM - 2:00 PM"]
    },
    category: 3
  },
  {
    id: 3,
    name: "Rachel Chen",
    title: "Corporate Attorney",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.7,
    reviewCount: 87,
    location: "San Francisco, CA",
    price: 200,
    experience: "8 years",
    about: "Rachel specializes in corporate law with a focus on startup companies, intellectual property, and business contracts. She provides clear, actionable legal advice that helps businesses navigate complex legal landscapes while minimizing risk.",
    specialties: ["Corporate Law", "Contract Negotiations", "Intellectual Property", "Startup Advisory"],
    education: [
      "J.D., Harvard Law School",
      "B.A. in Economics, UC Berkeley",
      "Member of California State Bar Association"
    ],
    availability: {
      monday: ["9:00 AM - 5:00 PM"],
      tuesday: ["9:00 AM - 5:00 PM"],
      wednesday: ["9:00 AM - 5:00 PM"],
      thursday: ["9:00 AM - 5:00 PM"],
      friday: ["9:00 AM - 3:00 PM"]
    },
    category: 1
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    title: "Career Coach",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 4.9,
    reviewCount: 132,
    location: "Austin, TX",
    price: 90,
    experience: "10+ years",
    about: "Michael is a certified career coach who has helped over 500 professionals advance their careers, transition to new industries, and land their dream jobs. His approach combines practical strategies with personalized guidance to help clients achieve their career goals.",
    specialties: ["Career Transitions", "Resume Building", "Interview Coaching", "Salary Negotiation"],
    education: [
      "M.S. in Organizational Psychology, NYU",
      "Certified Career Development Professional (CCDP)",
      "Former HR Director at Fortune 500 companies"
    ],
    availability: {
      monday: ["11:00 AM - 7:00 PM"],
      tuesday: ["11:00 AM - 7:00 PM"],
      wednesday: ["11:00 AM - 7:00 PM"],
      thursday: ["11:00 AM - 7:00 PM"],
      friday: ["10:00 AM - 4:00 PM"]
    },
    category: 4
  },
  {
    id: 5,
    name: "Dr. Emma Thompson",
    title: "Registered Dietitian",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 4.8,
    reviewCount: 106,
    location: "Boston, MA",
    price: 110,
    experience: "7 years",
    about: "Dr. Thompson specializes in nutrition counseling for weight management, digestive health, and chronic disease prevention. She creates personalized nutrition plans that fit into clients' lifestyles, making healthy eating achievable and sustainable.",
    specialties: ["Weight Management", "Digestive Health", "Sports Nutrition", "Medical Nutrition Therapy"],
    education: [
      "Ph.D. in Nutritional Sciences, Tufts University",
      "Registered Dietitian Nutritionist (RDN)",
      "Certified Diabetes Educator"
    ],
    availability: {
      monday: ["9:00 AM - 3:00 PM"],
      tuesday: ["9:00 AM - 3:00 PM"],
      wednesday: ["12:00 PM - 6:00 PM"],
      thursday: ["9:00 AM - 3:00 PM"],
      friday: ["9:00 AM - 1:00 PM"]
    },
    category: 5
  },
  {
    id: 6,
    name: "David Park",
    title: "Business Consultant",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 4.7,
    reviewCount: 91,
    location: "Seattle, WA",
    price: 175,
    experience: "15 years",
    about: "David is a strategic business consultant with expertise in operations, growth strategy, and digital transformation. He has worked with startups, mid-sized companies, and enterprises across multiple industries to improve performance and drive business growth.",
    specialties: ["Business Strategy", "Operations Optimization", "Digital Transformation", "Market Entry Strategy"],
    education: [
      "MBA, Wharton School of Business",
      "B.S. in Industrial Engineering, MIT",
      "Certified Management Consultant (CMC)"
    ],
    availability: {
      monday: ["8:00 AM - 6:00 PM"],
      tuesday: ["8:00 AM - 6:00 PM"],
      wednesday: ["8:00 AM - 6:00 PM"],
      thursday: ["8:00 AM - 6:00 PM"],
      friday: ["8:00 AM - 4:00 PM"]
    },
    category: 6
  }
];

export const mockReviews = [
  {
    id: 1,
    professionalId: 1,
    userId: "user123",
    userName: "John D.",
    userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5,
    comment: "Dr. Johnson was incredibly helpful and insightful. She provided practical strategies for managing my anxiety that I've been able to implement in my daily life. I've seen significant improvement after just a few sessions.",
    date: "2023-04-15T14:30:00Z"
  },
  {
    id: 2,
    professionalId: 1,
    userId: "user456",
    userName: "Lisa M.",
    userAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    comment: "Dr. Sarah is an exceptional therapist. She listens attentively and provides thoughtful insights. Her cognitive behavioral therapy techniques have really helped me overcome my panic attacks. Highly recommend!",
    date: "2023-03-22T10:15:00Z"
  },
  {
    id: 3,
    professionalId: 1,
    userId: "user789",
    userName: "Robert K.",
    userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4,
    comment: "Very professional and knowledgeable. Dr. Johnson created a comfortable environment where I felt safe discussing difficult topics. The only reason for 4 stars instead of 5 is sometimes sessions ran a bit short.",
    date: "2023-05-10T16:45:00Z"
  },
  {
    id: 4,
    professionalId: 2,
    userId: "user234",
    userName: "Jennifer L.",
    userAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    comment: "James helped me develop a comprehensive retirement plan that gave me clarity and confidence about my financial future. His explanations were clear and he was patient with all my questions. Excellent service!",
    date: "2023-04-05T13:20:00Z"
  },
  {
    id: 5,
    professionalId: 2,
    userId: "user567",
    userName: "Thomas B.",
    userAvatar: "https://randomuser.me/api/portraits/men/36.jpg",
    rating: 4,
    comment: "Very knowledgeable financial advisor. James provided solid investment advice and helped me diversify my portfolio. My investments have performed well since our consultation.",
    date: "2023-05-18T11:00:00Z"
  },
  {
    id: 6,
    professionalId: 3,
    userId: "user890",
    userName: "Sophia P.",
    userAvatar: "https://randomuser.me/api/portraits/women/24.jpg",
    rating: 5,
    comment: "Rachel is an exceptional attorney. She helped us navigate a complex contract negotiation with clear explanations and strategic advice. She was always responsive and truly looked out for our best interests.",
    date: "2023-03-30T15:30:00Z"
  },
  {
    id: 7,
    professionalId: 4,
    userId: "user321",
    userName: "Alex W.",
    userAvatar: "https://randomuser.me/api/portraits/men/60.jpg",
    rating: 5,
    comment: "Michael completely transformed my job search. His resume advice and interview coaching were invaluable. I landed a job that increased my salary by 30%! Worth every penny and more.",
    date: "2023-04-22T17:15:00Z"
  },
  {
    id: 8,
    professionalId: 5,
    userId: "user654",
    userName: "Emily R.",
    userAvatar: "https://randomuser.me/api/portraits/women/57.jpg",
    rating: 4,
    comment: "Dr. Thompson created a nutrition plan that finally worked for me. She took the time to understand my lifestyle and preferences, making her recommendations practical and sustainable. I've lost 15 pounds and feel so much better!",
    date: "2023-05-08T14:00:00Z"
  }
];

export const mockBookings = [
  {
    id: "book-001",
    professionalId: 1,
    userId: "current-user",
    professional: {
      name: "Dr. Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Clinical Psychologist"
    },
    startTime: "2023-05-25T14:00:00Z",
    endTime: "2023-05-25T15:00:00Z",
    status: "confirmed",
    type: "video",
    notes: "Initial consultation to discuss anxiety management strategies"
  },
  {
    id: "book-002",
    professionalId: 3,
    userId: "current-user",
    professional: {
      name: "Rachel Chen",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      title: "Corporate Attorney"
    },
    startTime: "2023-05-28T10:00:00Z",
    endTime: "2023-05-28T11:00:00Z",
    status: "confirmed",
    type: "in-person",
    notes: "Review contract for new business partnership"
  },
  {
    id: "book-003",
    professionalId: 5,
    userId: "current-user",
    professional: {
      name: "Dr. Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      title: "Registered Dietitian"
    },
    startTime: "2023-06-02T15:30:00Z",
    endTime: "2023-06-02T16:30:00Z",
    status: "pending",
    type: "video",
    notes: "Consultation for personalized nutrition plan"
  },
  {
    id: "book-004",
    professionalId: 2,
    userId: "current-user",
    professional: {
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "Financial Advisor, CFP"
    },
    startTime: "2023-06-10T13:00:00Z",
    endTime: "2023-06-10T14:00:00Z",
    status: "confirmed",
    type: "video",
    notes: "Retirement planning session"
  },
  {
    id: "book-005",
    professionalId: 4,
    userId: "current-user",
    professional: {
      name: "Michael Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      title: "Career Coach"
    },
    startTime: "2023-05-20T11:00:00Z",
    endTime: "2023-05-20T12:00:00Z",
    status: "completed",
    type: "video",
    notes: "Resume review and interview preparation"
  }
];

export const mockExpertBookings = [
  {
    id: "exp-book-001",
    professionalId: "expert-user",
    userId: "client-001",
    client: {
      name: "Jennifer Adams",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg"
    },
    startTime: "2023-05-24T09:00:00Z",
    endTime: "2023-05-24T10:00:00Z",
    status: "confirmed",
    type: "video",
    notes: "Initial consultation"
  },
  {
    id: "exp-book-002",
    professionalId: "expert-user",
    userId: "client-002",
    client: {
      name: "Robert Johnson",
      avatar: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    startTime: "2023-05-24T13:00:00Z",
    endTime: "2023-05-24T14:00:00Z",
    status: "confirmed",
    type: "in-person",
    notes: "Follow-up session"
  },
  {
    id: "exp-book-003",
    professionalId: "expert-user",
    userId: "client-003",
    client: {
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    startTime: "2023-05-25T11:00:00Z",
    endTime: "2023-05-25T12:00:00Z",
    status: "pending",
    type: "video",
    notes: "Initial consultation - needs prep work"
  },
  {
    id: "exp-book-004",
    professionalId: "expert-user",
    userId: "client-004",
    client: {
      name: "Daniel Lee",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    startTime: "2023-05-26T15:00:00Z",
    endTime: "2023-05-26T16:00:00Z",
    status: "confirmed",
    type: "phone",
    notes: "Quick check-in session"
  },
  {
    id: "exp-book-005",
    professionalId: "expert-user",
    userId: "client-005",
    client: {
      name: "Sophia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    startTime: "2023-05-22T10:00:00Z",
    endTime: "2023-05-22T11:00:00Z",
    status: "completed",
    type: "video",
    notes: "Final session - review progress"
  },
  {
    id: "exp-book-006",
    professionalId: "expert-user",
    userId: "client-006",
    client: {
      name: "William Brown",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg"
    },
    startTime: "2023-05-23T14:00:00Z",
    endTime: "2023-05-23T15:00:00Z",
    status: "completed",
    type: "in-person",
    notes: "Initial strategy session"
  },
  {
    id: "exp-book-007",
    professionalId: "expert-user",
    userId: "client-007",
    client: {
      name: "Olivia Taylor",
      avatar: "https://randomuser.me/api/portraits/women/15.jpg"
    },
    startTime: "2023-05-27T09:00:00Z",
    endTime: "2023-05-27T10:00:00Z",
    status: "confirmed",
    type: "video",
    notes: "Consultation for new project"
  }
];
