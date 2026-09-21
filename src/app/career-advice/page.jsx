'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Target, Users, GraduationCap, BookOpen, Lightbulb, 
  TrendingUp, Briefcase, Building, Star,
  Award, Zap, Heart, Shield,
  ArrowRight, ChevronRight, CheckCircle, MessageCircle,
  Phone, MapPin, Video, Download, Share2,
  Search, FileText, HelpCircle,
  Rocket, Crown, Trophy, ShieldCheck,
  Sparkles, Check, X, Plus, Minus,
  User, Play, Calculator, Upload, Edit2, Eye, FileDown
} from 'lucide-react';

export default function CareerAdvicePage() {
  const [activeTab, setActiveTab] = useState('job-seekers');
  const [expandedTips, setExpandedTips] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  const [selectedVideos, setSelectedVideos] = useState([]);
  
  const [salaryData, setSalaryData] = useState({
    experience: 3,
    location: 'metro',
    position: 'teacher'
  });
  
  const [resumeData, setResumeData] = useState({
    name: '', email: '', phone: '', position: '',
    experience: '', skills: '', education: '', summary: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const toggleTip = (index) => {
    setExpandedTips(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setSelectedVideos(files);
  };

  const calculateSalary = () => {
    const baseSalary = { teacher: 30000, professor: 50000, trainer: 35000 };
    const locationMultiplier = { metro: 1.5, city: 1.2, town: 1.0 };
    const experienceBonus = salaryData.experience * 2000;
    const base = baseSalary[salaryData.position] || 30000;
    const multiplier = locationMultiplier[salaryData.location] || 1.2;
    return Math.round((base * multiplier) + experienceBonus);
  };

  const handleResumeDownload = () => {
    alert(`Resume downloaded successfully! Template ${selectedTemplate} used.`);
    setShowResumeModal(false);
  };

  const jobSeekerTips = [
    { icon: <BookOpen className="h-6 w-6" />, title: "Perfect Your Resume", description: "Learn how to create a teaching resume that stands out from the competition.", detailed: "Include your teaching philosophy, specific achievements (like improved student scores), and relevant certifications. Use action verbs like 'Developed', 'Implemented', 'Led'.", time: "5 min read", color: "from-blue-500 to-cyan-500", tags: ["Resume", "Application", "Beginners"] },
    { icon: <Target className="h-6 w-6" />, title: "Ace Your Interview", description: "Master common teaching interview questions with proven answers.", detailed: "Prepare for questions about classroom management, lesson planning, and handling difficult parents. Practice your demo lesson thoroughly.", time: "7 min read", color: "from-purple-500 to-pink-500", tags: ["Interview", "Preparation", "Advanced"] },
    { icon: <Briefcase className="h-6 w-6" />, title: "Salary Negotiation", description: "Get the salary you deserve with our negotiation guide.", detailed: "Research average salaries in your area, know your worth, and be prepared to discuss your qualifications and achievements.", time: "6 min read", color: "from-green-500 to-emerald-500", tags: ["Salary", "Negotiation", "Professional"] },
    { icon: <GraduationCap className="h-6 w-6" />, title: "Certification Guide", description: "Complete guide to required certifications for teaching jobs.", detailed: "Understand state requirements, alternative certification paths, and continuing education opportunities.", time: "8 min read", color: "from-orange-500 to-red-500", tags: ["Certification", "Requirements", "Guidance"] },
    { icon: <Users className="h-6 w-6" />, title: "Classroom Management", description: "Effective strategies for managing diverse classrooms.", detailed: "Learn proven techniques for behavior management, student engagement, and creating positive learning environments.", time: "6 min read", color: "from-indigo-500 to-blue-500", tags: ["Management", "Classroom", "Strategies"] },
    { icon: <Lightbulb className="h-6 w-6" />, title: "Career Growth", description: "Plan your teaching career progression path.", detailed: "Explore opportunities for advancement, specialization, and leadership roles in education.", time: "9 min read", color: "from-yellow-500 to-amber-500", tags: ["Growth", "Career", "Planning"] }
  ];

  const instituteTips = [
    { icon: <Users className="h-6 w-6" />, title: "Hiring Best Teachers", description: "Strategies to attract and retain top teaching talent.", detailed: "Create compelling job descriptions, offer competitive packages, and build a positive school culture.", time: "6 min read", color: "from-indigo-500 to-blue-500", tags: ["Hiring", "Recruitment", "Strategy"] },
    { icon: <Building className="h-6 w-6" />, title: "Campus Recruitment", description: "Effective campus hiring strategies for schools.", detailed: "Partner with teacher training colleges, attend job fairs, and create internship programs.", time: "5 min read", color: "from-teal-500 to-green-500", tags: ["Campus", "Recruitment", "Partnership"] },
    { icon: <Award className="h-6 w-6" />, title: "Budget Planning", description: "Optimize your hiring and operational budget.", detailed: "Allocate resources effectively, plan for seasonal needs, and maximize ROI on hiring.", time: "7 min read", color: "from-amber-500 to-orange-500", tags: ["Budget", "Planning", "Finance"] },
    { icon: <Star className="h-6 w-6" />, title: "Retention Strategies", description: "Keep your best teachers for longer periods.", detailed: "Implement mentorship programs, provide growth opportunities, and create positive work environment.", time: "8 min read", color: "from-rose-500 to-pink-500", tags: ["Retention", "Strategy", "Culture"] },
    { icon: <ShieldCheck className="h-6 w-6" />, title: "Compliance & Legal", description: "Stay compliant with education laws and regulations.", detailed: "Understand employment laws, certification requirements, and safety regulations for educational institutions.", time: "7 min read", color: "from-blue-500 to-indigo-500", tags: ["Compliance", "Legal", "Safety"] },
    { icon: <TrendingUp className="h-6 w-6" />, title: "School Growth", description: "Strategies for institutional growth and reputation.", detailed: "Build brand reputation, improve academic results, and expand your institution's reach.", time: "9 min read", color: "from-purple-500 to-pink-500", tags: ["Growth", "Reputation", "Strategy"] }
  ];

  const successStories = [
    { name: "Priya Sharma", role: "Math Teacher", image: "PS", story: "Landed dream job at Delhi Public School within 2 weeks of using Creative Jobs", highlight: "50% salary increase", stats: { interviews: 3, offers: 2, time: "2 weeks" }, color: "from-blue-500/10 to-indigo-500/10", ring: "ring-blue-200/50" },
    { name: "Ryan International School", role: "Private School", image: "RIS", story: "Hired 15 qualified teachers in one month with our premium recruitment package", highlight: "100% retention rate", stats: { hires: 15, time: "1 month", satisfaction: "95%" }, color: "from-green-500/10 to-emerald-500/10", ring: "ring-emerald-200/50" },
    { name: "Arjun Patel", role: "Physics Professor", image: "AP", story: "Successfully transitioned from corporate sector to teaching with our career guidance", highlight: "Career change success", stats: { transition: "3 months", salary: "Match", satisfaction: "100%" }, color: "from-purple-500/10 to-pink-500/10", ring: "ring-purple-200/50" }
  ];

  const quickStats = [
    { label: "Jobs Found", value: "5,000+", icon: <Briefcase className="h-5 w-5" />, change: "+12%", color: "from-blue-500 to-cyan-500" },
    { label: "Happy Teachers", value: "3,200+", icon: <Users className="h-5 w-5" />, change: "+25%", color: "from-purple-500 to-pink-500" },
    { label: "Partner Schools", value: "850+", icon: <Building className="h-5 w-5" />, change: "+18%", color: "from-emerald-500 to-teal-500" },
    { label: "Success Rate", value: "92%", icon: <TrendingUp className="h-5 w-5" />, change: "+5%", color: "from-orange-500 to-amber-500" }
  ];

  const faqItems = [
    { question: "How long does it take to find a teaching job?", answer: "Most teachers find suitable positions within 2-4 weeks using our platform. Premium members often find jobs even faster.", category: "job-seekers" },
    { question: "What certifications do I need?", answer: "Requirements vary by state and institution. We provide detailed guides for each region and subject area.", category: "job-seekers" },
    { question: "How much should I expect to earn?", answer: "Salaries range from ₹25,000 to ₹1,00,000+ based on experience, location, and institution type. Check our salary calculator.", category: "job-seekers" },
    { question: "How quickly can I hire teachers?", answer: "Most schools fill positions within 2-3 weeks using our platform. Premium recruitment services can reduce this to 1 week.", category: "institutes" },
    { question: "What background checks do you perform?", answer: "We verify qualifications, certifications, conduct police verification, and check references for all candidates.", category: "institutes" },
    { question: "Can I hire for multiple positions?", answer: "Yes! Our bulk hiring packages offer discounts for hiring 3+ teachers. Contact our team for custom solutions.", category: "institutes" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60">
      
      {/* ============ ANIMATED BACKGROUND ============ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b10_1px,transparent_1px),linear-gradient(to_bottom,#64748b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ============ HERO SECTION ============ */}
      <section className="relative">
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-lg shadow-blue-500/10 mb-6">
                <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Exclusive Career Insights</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                Master Your{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Teaching Career
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C80 4 150 4 298 8" stroke="url(#grad2)" strokeWidth="4" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="grad2" x1="0" y1="0" x2="300" y2="0">
                        <stop stopColor="#3b82f6" />
                        <stop offset="0.5" stopColor="#6366f1" />
                        <stop offset="1" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                Expert guidance, proven strategies, and powerful tools to help teachers find dream jobs 
                and schools build exceptional teams.
              </p>
              
              {/* Quick Stats — Glass Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 max-w-4xl mx-auto">
                {quickStats.map((stat, index) => (
                  <div key={index} className="group relative bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                    <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} shadow-md mb-2 group-hover:scale-110 transition-transform`}>
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      {stat.label}
                      <span className="text-[10px] text-emerald-600 font-bold">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Switcher — Glassmorphic */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative flex flex-col sm:flex-row gap-2 bg-white/70 backdrop-blur-xl rounded-2xl p-2 shadow-2xl shadow-blue-500/10 border border-white/80">
                <button
                  onClick={() => setActiveTab('job-seekers')}
                  className={`relative flex-1 px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                    activeTab === 'job-seekers'
                      ? 'text-white shadow-lg'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
                  }`}
                >
                  {activeTab === 'job-seekers' && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 shadow-lg shadow-blue-500/40" />
                  )}
                  <Users className="h-5 w-5 relative" />
                  <span className="relative">For Job Seekers</span>
                  {activeTab === 'job-seekers' && <Sparkles className="h-4 w-4 relative" />}
                </button>
                <button
                  onClick={() => setActiveTab('institutes')}
                  className={`relative flex-1 px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                    activeTab === 'institutes'
                      ? 'text-white shadow-lg'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
                  }`}
                >
                  {activeTab === 'institutes' && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 shadow-lg shadow-purple-500/40" />
                  )}
                  <Building className="h-5 w-5 relative" />
                  <span className="relative">For Institutes</span>
                  {activeTab === 'institutes' && <Crown className="h-4 w-4 relative" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAIN CONTENT ============ */}
      <div className="container mx-auto px-4 pb-32 relative">
        
        {/* ============ TIPS SECTION ============ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-sm mb-4">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {activeTab === 'job-seekers' ? 'Success Toolkit' : 'Excellence Guide'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              {activeTab === 'job-seekers' ? (
                <>Teacher <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Success Toolkit</span></>
              ) : (
                <>Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Excellence Guide</span></>
              )}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">
              {activeTab === 'job-seekers' 
                ? 'Everything you need to land your dream teaching job'
                : 'Strategies to build and maintain an exceptional teaching team'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'job-seekers' ? jobSeekerTips : instituteTips).map((tip, index) => (
              <div key={index} className="group relative">
                {/* Glow behind */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${tip.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/80 hover:border-blue-200/70 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full hover:-translate-y-1.5 overflow-hidden">
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tip.color} opacity-70`} />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${tip.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <div className="text-white">{tip.icon}</div>
                    </div>
                    <button
                      onClick={() => toggleTip(index)}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-200 transition-all"
                    >
                      {expandedTips[index] ? (
                        <Minus className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Plus className="h-4 w-4 text-slate-500" />
                      )}
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tip.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {expandedTips[index] ? tip.detailed : tip.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tip.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-100/60 uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-semibold">{tip.time}</span>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700 text-xs font-bold">
                        Save
                      </button>
                      <div className="p-1 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <ArrowRight className="h-3.5 w-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ SUCCESS PATH / PROCESS SECTION ============ */}
        <div className="mb-20">
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-500/30">
            {/* Decorative glass circles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 backdrop-blur-3xl rounded-full -translate-y-36 translate-x-36 border border-white/20" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 backdrop-blur-3xl rounded-full translate-y-28 -translate-x-28 border border-white/20" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-4">
                  <Rocket className="h-3.5 w-3.5 text-yellow-300" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Step by Step</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
                  {activeTab === 'job-seekers' ? 'Your 5-Step Success Path' : 'Our 4-Step Recruitment Process'}
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto font-medium">
                  {activeTab === 'job-seekers' 
                    ? 'Follow this proven roadmap to land your dream teaching position'
                    : 'Streamlined process to find and hire the best teaching talent'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {(activeTab === 'job-seekers' 
                  ? [
                      { step: '01', title: 'Profile Setup', desc: 'Create compelling profile', icon: <User className="h-5 w-5" /> },
                      { step: '02', title: 'Search & Match', desc: 'Find perfect opportunities', icon: <Search className="h-5 w-5" /> },
                      { step: '03', title: 'Apply Smart', desc: 'Customized applications', icon: <CheckCircle className="h-5 w-5" /> },
                      { step: '04', title: 'Ace Interviews', desc: 'Master your interviews', icon: <Target className="h-5 w-5" /> },
                      { step: '05', title: 'Get Hired', desc: 'Start your journey', icon: <Briefcase className="h-5 w-5" /> }
                    ]
                  : [
                      { step: '01', title: 'Post Job', desc: 'List your requirements', icon: <FileText className="h-5 w-5" /> },
                      { step: '02', title: 'Candidate Match', desc: 'AI-powered matching', icon: <Users className="h-5 w-5" /> },
                      { step: '03', title: 'Interview & Select', desc: 'Coordinated interviews', icon: <Video className="h-5 w-5" /> },
                      { step: '04', title: 'Hire & Onboard', desc: 'Complete the process', icon: <Check className="h-5 w-5" /> },
                      { step: '05', title: 'Success Tracking', desc: 'Monitor performance', icon: <TrendingUp className="h-5 w-5" /> }
                    ]
                ).map((item, index) => (
                  <div key={index} className="text-center relative group">
                    <div className="relative inline-block mb-4">
                      <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                        {item.icon}
                        <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg">
                          {item.step}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-white font-bold text-sm md:text-base mb-1">{item.title}</h4>
                    <p className="text-blue-100 text-xs font-medium leading-relaxed">{item.desc}</p>
                    
                    {/* Connector */}
                    {index < 4 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 -translate-x-1/2 z-0">
                        <div className="h-full w-full bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============ SUCCESS STORIES ============ */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-sm mb-3">
                <Trophy className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Real Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                Real Success{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Stories</span>
              </h2>
              <p className="text-slate-600 font-medium">Inspiring journeys from our community members</p>
            </div>
            <Link 
              href="/success-stories" 
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              View all stories
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className={`group relative bg-gradient-to-br ${story.color} backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}>
                {/* Top accent */}
                <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full opacity-60`} />
                
                <div className="flex items-start gap-4 pt-2">
                  <div className="relative flex-shrink-0">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg ring-4 ${story.ring}`}>
                      {story.image}
                    </div>
                    <div className="absolute -bottom-1.5 -right-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-md flex items-center gap-0.5">
                      <Trophy className="h-2.5 w-2.5" />
                      Success
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 text-base truncate">{story.name}</h4>
                    <p className="text-xs text-slate-600 mb-3 font-semibold">{story.role}</p>
                    <p className="text-sm text-slate-700 mb-3 leading-relaxed">{story.story}</p>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/80 backdrop-blur border border-emerald-200/60 text-emerald-700 text-xs font-bold mb-3">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {story.highlight}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(story.stats).map(([key, value]) => (
                        <div key={key} className="bg-white/70 backdrop-blur rounded-lg p-2 text-center border border-white/80">
                          <div className="font-black text-slate-900 text-sm">{value}</div>
                          <div className="text-[10px] text-slate-500 capitalize font-semibold">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ FAQ SECTION ============ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-sm mb-4">
              <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Got Questions?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems
              .filter(item => item.category === activeTab)
              .map((item, index) => (
                <div key={index} className="group">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full bg-white/80 backdrop-blur-md rounded-2xl p-5 text-left transition-all duration-300 flex items-center justify-between gap-4 border shadow-lg shadow-slate-200/40 ${
                      activeAccordion === index
                        ? 'border-blue-300/60 shadow-xl shadow-blue-500/10'
                        : 'border-white/80 hover:border-blue-200/60 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md flex-shrink-0 ${activeAccordion === index ? 'scale-110' : ''} transition-transform`}>
                        <HelpCircle className="h-4 w-4 text-white" />
                      </div>
                      <h3 className={`text-base font-bold transition-colors ${
                        activeAccordion === index ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {item.question}
                      </h3>
                    </div>
                    <div className={`p-1.5 rounded-full flex-shrink-0 transition-all ${
                      activeAccordion === index ? 'bg-blue-100 rotate-180' : 'bg-slate-100'
                    }`}>
                      {activeAccordion === index ? (
                        <Minus className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Plus className="h-4 w-4 text-slate-500" />
                      )}
                    </div>
                  </button>
                  {activeAccordion === index && (
                    <div className="mt-2 mx-2 p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-md border border-blue-100/60">
                      <p className="text-slate-700 leading-relaxed font-medium">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* ============ RESOURCES / TOOLS SECTION ============ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-sm mb-4">
              <Zap className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Interactive Tools</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tools & Resources</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">
              Click to experience our interactive tools with video upload, salary calculator & resume builder
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Resume Template Pack",
                description: "Professional teaching resume templates (Word & PDF) with video upload feature",
                icon: <FileText className="h-6 w-6" />,
                downloads: "2.5K+",
                size: "3.2 MB",
                color: "from-blue-500 to-cyan-500",
                buttonText: "Create Resume + Upload Video",
                buttonIcon: <Upload className="ml-2 h-4 w-4" />
              },
              {
                title: "Interview Preparation Kit",
                description: "Watch 2-3 video demos and calculate expected salary",
                icon: <Video className="h-6 w-6" />,
                downloads: "1.8K+",
                size: "2.1 MB",
                color: "from-purple-500 to-pink-500",
                buttonText: "Watch Videos + Salary Calc",
                buttonIcon: <Play className="ml-2 h-4 w-4" />
              },
              {
                title: "Salary Calculator 2024",
                description: "Calculate expected salary based on location & experience",
                icon: <Calculator className="h-6 w-6" />,
                downloads: "3.2K+",
                size: "1.5 MB",
                color: "from-green-500 to-emerald-500",
                buttonText: "Calculate + Get Resume",
                buttonIcon: <Edit2 className="ml-2 h-4 w-4" />
              }
            ].map((resource, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${resource.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden h-full">
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${resource.color}`} />
                  
                  <div className="flex items-start justify-between mb-4 pt-2">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${resource.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                      <div className="text-white">{resource.icon}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100/60">
                      {resource.size}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-5 leading-relaxed">{resource.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
                    <span className="text-xs text-slate-500 font-semibold">{resource.downloads} downloads</span>
                    <button 
                      onClick={() => {
                        if (index === 0) setShowVideoModal(true);
                        else if (index === 1) setShowSalaryModal(true);
                        else if (index === 2) setShowResumeModal(true);
                      }}
                      className={`group/btn inline-flex items-center px-4 py-2 bg-gradient-to-r ${resource.color} text-white rounded-lg font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all`}
                    >
                      <Download className="h-3.5 w-3.5 mr-1.5 group-hover/btn:animate-bounce" />
                      <span className="hidden sm:inline">{resource.buttonText}</span>
                      <span className="sm:hidden">Open</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ CTA SECTION ============ */}
        <div className="mb-20">
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-500/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 backdrop-blur-3xl rounded-full -translate-y-48 translate-x-48 border border-white/20" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 backdrop-blur-3xl rounded-full translate-y-36 -translate-x-36 border border-white/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            
            <div className="relative">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6">
                  <Rocket className="h-3.5 w-3.5 text-yellow-300" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Start Today</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                  Ready to Transform Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                    {activeTab === 'job-seekers' ? 'Career' : 'Institution'}?
                  </span>
                </h2>
                <p className="text-blue-100 text-lg mb-8 font-medium">
                  Join thousands of educators and institutions who found success with Creative Jobs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={activeTab === 'job-seekers' ? "/signup?type=teacher" : "/signup?type=institute"}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-black rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Rocket className="h-5 w-5 relative" />
                    <span className="relative">Start Free Trial</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white font-black rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Book a Demo
                  </Link>
                </div>
                <p className="text-blue-200 text-sm mt-6 font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                  Free for 30 days · No credit card required · Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ VIDEO UPLOAD MODAL ============ */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-500/20 border border-white/60 relative">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full" />
            
            <div className="flex justify-between items-start mb-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Upload Teaching Videos</h3>
                  <p className="text-xs text-slate-500 font-semibold">Showcase your teaching skills</p>
                </div>
              </div>
              <button onClick={() => setShowVideoModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <p className="text-slate-600 mb-6 text-sm font-medium">Upload up to 3 videos to boost your application by 40%</p>
            
            <div className="border-2 border-dashed border-blue-300/70 rounded-2xl p-8 text-center mb-6 bg-gradient-to-br from-blue-50/70 to-cyan-50/70 backdrop-blur-sm">
              <div className="inline-flex p-4 rounded-2xl bg-white shadow-lg mb-4">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <input type="file" accept="video/*" multiple onChange={handleVideoUpload} className="hidden" id="videoUpload" />
              <label htmlFor="videoUpload" className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold shadow-md">
                <Plus className="h-4 w-4" />
                Choose Videos
              </label>
              <p className="text-xs text-slate-500 mt-3 font-semibold">Max 3 videos • MP4, AVI, MOV • Max 100MB each</p>
            </div>

            {selectedVideos.length > 0 && (
              <div className="mb-6">
                <h4 className="font-black text-slate-700 mb-3 text-sm uppercase tracking-wide">Selected Videos ({selectedVideos.length})</h4>
                <div className="space-y-2">
                  {selectedVideos.map((video, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/80 backdrop-blur rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm flex-shrink-0">
                          <Video className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700 truncate max-w-xs font-semibold text-sm">{video.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-bold flex-shrink-0 ml-3">
                        {(video.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowVideoModal(false)}
                className="flex-1 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowVideoModal(false); setShowResumeModal(true); }}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold flex items-center justify-center gap-2"
              >
                Next: Create Resume
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ SALARY CALCULATOR MODAL ============ */}
      {showSalaryModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-green-500/20 border border-white/60 relative">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-full" />
            
            <div className="flex justify-between items-start mb-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Salary Calculator 2024</h3>
                  <p className="text-xs text-slate-500 font-semibold">Real-time market rates</p>
                </div>
              </div>
              <button onClick={() => setShowSalaryModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-slate-700 mb-3 font-black text-sm uppercase tracking-wide">Years of Teaching Experience</label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={salaryData.experience}
                    onChange={(e) => setSalaryData({...salaryData, experience: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-3 font-semibold">
                    <span>0</span>
                    <span className="font-black text-base text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                      {salaryData.experience} years
                    </span>
                    <span>30+</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-3 font-black text-sm uppercase tracking-wide">Location</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'metro', label: 'Metro City', desc: 'Mumbai, Delhi', emoji: '🏙️' },
                    { value: 'city', label: 'Tier-2 City', desc: 'Jaipur, Pune', emoji: '🏢' },
                    { value: 'town', label: 'Small Town', desc: 'District level', emoji: '🏘️' }
                  ].map((loc) => (
                    <button
                      key={loc.value}
                      onClick={() => setSalaryData({...salaryData, location: loc.value})}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        salaryData.location === loc.value
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-500/20 scale-[1.02]'
                          : 'border-slate-200 hover:border-green-300 bg-white/60'
                      }`}
                    >
                      <div className="text-xl mb-1">{loc.emoji}</div>
                      <div className="font-black text-slate-900 text-sm">{loc.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-semibold">{loc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-3 font-black text-sm uppercase tracking-wide">Position</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'teacher', label: 'School Teacher', icon: '👩‍🏫' },
                    { value: 'professor', label: 'Professor', icon: '👨‍🏫' },
                    { value: 'trainer', label: 'Corporate Trainer', icon: '💼' }
                  ].map((pos) => (
                    <button
                      key={pos.value}
                      onClick={() => setSalaryData({...salaryData, position: pos.value})}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        salaryData.position === pos.value
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-500/20 scale-[1.02]'
                          : 'border-slate-200 hover:border-green-300 bg-white/60'
                      }`}
                    >
                      <div className="text-2xl mb-2">{pos.icon}</div>
                      <div className="font-black text-slate-900 text-xs leading-tight">{pos.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="relative rounded-2xl p-6 mb-6 overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-2xl shadow-green-500/30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-black text-white">Estimated Monthly Salary</h4>
                  <div className="px-3 py-1 bg-white/25 backdrop-blur rounded-full text-xs font-black text-white">
                    Updated 2024
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  ₹{calculateSalary().toLocaleString()}
                  <span className="text-lg font-bold text-green-100">/month</span>
                </div>
                <p className="text-green-50 text-xs font-semibold">
                  Based on {salaryData.location === 'metro' ? 'metro' : salaryData.location === 'city' ? 'tier-2' : 'small town'} city market standards
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSalaryModal(false)}
                className="flex-1 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold"
              >
                Close
              </button>
              <button
                onClick={() => { alert('Salary report generated! Check your downloads.'); setShowSalaryModal(false); }}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all font-bold flex items-center justify-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ RESUME BUILDER MODAL ============ */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-500/20 border border-white/60 relative">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full" />
            
            <div className="flex justify-between items-start mb-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Create Your Resume</h3>
                  <p className="text-xs text-slate-500 font-semibold">AI-powered professional resume builder</p>
                </div>
              </div>
              <button onClick={() => setShowResumeModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h4 className="font-black text-slate-900 text-base mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-black flex items-center justify-center">1</span>
                  Personal Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-700 mb-1.5 text-xs font-bold uppercase tracking-wide">Full Name</label>
                    <input type="text" value={resumeData.name} onChange={(e) => setResumeData({...resumeData, name: e.target.value})} className="w-full p-3 bg-white/70 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium" placeholder="Enter your full name" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1.5 text-xs font-bold uppercase tracking-wide">Email</label>
                      <input type="email" value={resumeData.email} onChange={(e) => setResumeData({...resumeData, email: e.target.value})} className="w-full p-3 bg-white/70 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium" placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1.5 text-xs font-bold uppercase tracking-wide">Phone</label>
                      <input type="tel" value={resumeData.phone} onChange={(e) => setResumeData({...resumeData, phone: e.target.value})} className="w-full p-3 bg-white/70 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1.5 text-xs font-bold uppercase tracking-wide">Position</label>
                    <input type="text" value={resumeData.position} onChange={(e) => setResumeData({...resumeData, position: e.target.value})} className="w-full p-3 bg-white/70 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium" placeholder="e.g., Math Teacher" />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1.5 text-xs font-bold uppercase tracking-wide">Experience</label>
                    <textarea value={resumeData.experience} onChange={(e) => setResumeData({...resumeData, experience: e.target.value})} className="w-full p-3 bg-white/70 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium resize-none" rows="2" placeholder="Describe your experience..." />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1.5 text-xs font-bold uppercase tracking-wide">Key Skills</label>
                    <input type="text" value={resumeData.skills} onChange={(e) => setResumeData({...resumeData, skills: e.target.value})} className="w-full p-3 bg-white/70 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-sm font-medium" placeholder="Classroom Management, etc." />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-black text-slate-900 text-base mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-black flex items-center justify-center">2</span>
                  Choose Template
                </h4>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedTemplate(num)}
                      className={`relative h-20 border-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                        selectedTemplate === num
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/20 scale-105'
                          : 'border-slate-200 hover:border-blue-300 bg-white/60'
                      }`}
                    >
                      <FileText className={`h-6 w-6 mb-1 ${selectedTemplate === num ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className={`text-[10px] font-black ${selectedTemplate === num ? 'text-blue-600' : 'text-slate-500'}`}>T{num}</span>
                      {selectedTemplate === num && (
                        <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <h4 className="font-black text-slate-900 text-base mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-black flex items-center justify-center">3</span>
                  Preview
                </h4>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-gradient-to-br from-slate-50/70 to-blue-50/50 backdrop-blur-sm mb-4">
                  <div className="flex items-center justify-center h-32 text-slate-400">
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-2xl bg-white shadow-md mb-2">
                        <Eye className="h-6 w-6 text-blue-500" />
                      </div>
                      <p className="text-xs font-bold text-slate-600">Live preview</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Template {selectedTemplate} selected</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-700 mb-1.5">
                    <div className="p-1 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-wide">Pro Tip</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    Upload teaching videos with resume to increase chances by <span className="font-black text-blue-600">40%</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={() => setShowResumeModal(false)}
                className="flex-1 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleResumeDownload}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold flex items-center justify-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Download Resume (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ BOTTOM CONTACT BAR ============ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-white/60 shadow-2xl shadow-blue-500/10 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-md opacity-60" />
                <div className="relative p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-md">
                  <Phone className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Need immediate help?</div>
                <div className="font-black text-slate-900 text-sm">+91 98765 43210</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Link
                href="/book-consultation"
                className="group relative px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold text-sm shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Book Free Consultation
                </span>
              </Link>
              <button className="p-2.5 rounded-xl bg-white/70 border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-all">
                <Share2 className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============ GLOBAL STYLES ============ */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.4);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
}