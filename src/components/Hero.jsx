'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, Briefcase, Building, Users, ArrowRight, 
  MapPin, TrendingUp, GraduationCap, Award,
  BookOpen, Target, Zap, Star, Sparkles,
  ChevronRight, Shield, Heart,
  CheckCircle
} from 'lucide-react';

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [jobType, setJobType] = useState('all');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append('q', searchQuery.trim());
      if (jobType !== 'all') params.append('type', jobType);
      if (location.trim()) params.append('location', location.trim());
      
      router.push(`/jobs${params.toString() ? `?${params.toString()}` : ''}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const stats = [
    { number: '10,000+', label: 'Active Jobs', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { number: '5,000+', label: 'Institutes', icon: Building, color: 'from-emerald-500 to-teal-500' },
    { number: '50,000+', label: 'Job Seekers', icon: Users, color: 'from-purple-500 to-pink-500' },
    { number: '95%', label: 'Success Rate', icon: TrendingUp, color: 'from-orange-500 to-amber-500' }
  ];

  const categories = [
    { icon: BookOpen, title: 'Teaching Jobs', count: '2,500+', color: 'from-blue-500 to-cyan-500' },
    { icon: Building, title: 'Administration', count: '1,200+', color: 'from-emerald-500 to-teal-500' },
    { icon: Users, title: 'Counseling', count: '800+', color: 'from-purple-500 to-pink-500' },
    { icon: Target, title: 'Management', count: '1,500+', color: 'from-orange-500 to-red-500' },
    { icon: GraduationCap, title: 'Research', count: '600+', color: 'from-pink-500 to-rose-500' },
    { icon: Award, title: 'Special Education', count: '400+', color: 'from-indigo-500 to-blue-500' }
  ];

  const features = [
    { icon: Shield, title: 'Verified Institutes', description: '100% verified' },
    { icon: Zap, title: 'Quick Response', description: 'Within 48 hours' },
    { icon: Heart, title: 'Free Forever', description: 'For job seekers' },
    { icon: Star, title: 'Easy Apply', description: 'One-click apply' }
  ];

  const popularJobs = [
    { title: 'Math Teacher', location: 'Delhi', salary: '₹35K - ₹45K', type: 'Full Time' },
    { title: 'Science Faculty', location: 'Mumbai', salary: '₹40K - ₹50K', type: 'Full Time' },
    { title: 'School Principal', location: 'Bangalore', salary: '₹80K - ₹1L', type: 'Full Time' },
    { title: 'Online Tutor', location: 'Remote', salary: '₹25K - ₹35K', type: 'Part Time' },
  ];

  const trendingRoles = [
    'Math Teacher', 'Science Faculty', 'Principal', 'Vice Principal', 
    'Counsellor', 'Administrator', 'Online Tutor', 'PGT', 'TGT', 'Nursery Teacher'
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* ============ PREMIUM BACKGROUND ============ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b15_1px,transparent_1px),linear-gradient(to_bottom,#64748b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* ============ MAIN HERO SECTION ============ */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* ---- Left Content ---- */}
            <div className="space-y-8">
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-lg shadow-blue-500/10">
                <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  India's #1 Education Job Portal
                </span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                  Find Your Dream{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                      Teaching Job
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                      <path d="M2 10C50 4 100 4 198 8" stroke="url(#grad)" strokeWidth="4" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="200" y2="0">
                          <stop stopColor="#3b82f6" />
                          <stop offset="0.5" stopColor="#6366f1" />
                          <stop offset="1" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Connect with <span className="text-slate-900 font-bold">5,000+</span> verified schools, colleges, and coaching institutes. 
                  Discover opportunities that match your skills and aspirations.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index} 
                      className="group relative p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      {/* Gradient top accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                      
                      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-md mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-xl md:text-2xl font-black text-slate-900">{stat.number}</div>
                      <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/login?type=job_seeker" 
                  className="group relative px-7 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center overflow-hidden"
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Find Teaching Jobs</span>
                  <ArrowRight className="relative ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/login?type=institute" 
                  className="group px-7 py-4 bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-800 rounded-xl font-bold hover:bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                >
                  <Briefcase className="mr-3 h-5 w-5 text-blue-600" />
                  <span>Hire Educators</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                        <Icon className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{feature.title}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---- Right Content: Search Card ---- */}
            <div className="lg:pl-4">
              <div className="relative">
                {/* Decorative glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/60 p-6 md:p-8">
                  
                  {/* Gradient top bar */}
                  <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full" />
                  
                  <div className="pt-2">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                      Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Perfect Match</span>
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 font-medium">
                      Search from 10,000+ verified teaching positions
                    </p>
                    
                    <form onSubmit={handleSearch} className="space-y-4">
                      {/* Main Search Input */}
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Job title, subject, or institute name"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-medium"
                        />
                      </div>

                      {/* Filters */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Job Type
                          </label>
                          <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="w-full px-3 py-3 bg-slate-50/80 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-900 font-medium text-sm cursor-pointer"
                          >
                            <option value="all">All Types</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="remote">Remote/WFH</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Location
                          </label>
                          <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-3 py-3 bg-slate-50/80 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-900 font-medium text-sm cursor-pointer"
                          >
                            <option value="">Anywhere</option>
                            <option value="delhi">Delhi NCR</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="chennai">Chennai</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Experience
                          </label>
                          <select className="w-full px-3 py-3 bg-slate-50/80 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-900 font-medium text-sm cursor-pointer">
                            <option value="">Any</option>
                            <option value="fresher">Fresher</option>
                            <option value="1-3">1-3 Years</option>
                            <option value="3-5">3-5 Years</option>
                            <option value="5+">5+ Years</option>
                          </select>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="mr-3 h-5 w-5 relative" />
                            <span className="relative">Search Jobs</span>
                          </>
                        )}
                      </button>
                    </form>

                    {/* Trending Searches */}
                    <div className="mt-6 pt-6 border-t border-slate-200/70">
                      <p className="text-xs font-bold text-slate-700 mb-3 flex items-center uppercase tracking-wide">
                        <TrendingUp className="h-3.5 w-3.5 mr-2 text-blue-600" />
                        Trending Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trendingRoles.slice(0, 6).map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(tag);
                              setTimeout(() => {
                                document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                              }, 100);
                            }}
                            className="group px-3 py-1.5 bg-slate-100/80 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-700 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center"
                          >
                            <span>{tag}</span>
                            <ArrowRight className="ml-1.5 h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Jobs Preview */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {popularJobs.slice(0, 2).map((job, index) => (
                    <div 
                      key={index}
                      className="group bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/80 hover:border-blue-200 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                      onClick={() => router.push('/jobs')}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h4>
                          <div className="flex items-center mt-1.5 text-xs text-slate-500 font-medium">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-blue-600">{job.salary}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{job.type}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ============ CATEGORIES SECTION ============ */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-sm mb-4">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Browse Categories</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Explore Teaching{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Categories
                </span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                Find opportunities across various education domains and specializations
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={index}
                    href={`/jobs?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group relative bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-5 hover:bg-white hover:border-blue-200 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                  >
                    {/* Hover gradient glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative flex flex-col items-center text-center">
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      
                      <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      
                      <p className="text-xs text-slate-500 font-semibold">{category.count} jobs</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/jobs" 
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-800 rounded-xl font-bold hover:bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View All Categories</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ============ HOW IT WORKS ============ */}
          <div className="mt-24 relative">
            {/* Card background with gradient */}
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/80 shadow-2xl shadow-blue-500/10 overflow-hidden">
              {/* Decorative gradient corner */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                    <Zap className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Simple Process</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                    How It{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      Works
                    </span>
                  </h2>
                  <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                    Get your dream teaching job in just 4 simple steps
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { number: '01', title: 'Create Profile', desc: 'Sign up and complete your profile', icon: '👤', color: 'from-blue-500 to-cyan-500' },
                    { number: '02', title: 'Search Jobs', desc: 'Browse through verified positions', icon: '🔍', color: 'from-purple-500 to-pink-500' },
                    { number: '03', title: 'Apply', desc: 'Apply with one click using your profile', icon: '🚀', color: 'from-orange-500 to-amber-500' },
                    { number: '04', title: 'Get Hired', desc: 'Connect with institutes and get selected', icon: '🎉', color: 'from-emerald-500 to-teal-500' },
                  ].map((step, index) => (
                    <div key={index} className="relative group">
                      <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/80 hover:bg-white shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                        {/* Top gradient bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
                        
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl filter drop-shadow-sm">{step.icon}</div>
                          <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br ${step.color} opacity-60`}>
                            {step.number}
                          </div>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                      
                      {/* Connector arrow */}
                      {index < 3 && (
                        <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                          <div className="p-1.5 rounded-full bg-white border border-slate-200 shadow-md">
                            <ChevronRight className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                  <Link
                    href="/register"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Sparkles className="h-4 w-4 relative" />
                    <span className="relative">Get Started Free</span>
                    <ArrowRight className="h-4 w-4 relative group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="mt-3 text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    No credit card required · Free forever for job seekers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ CUSTOM ANIMATIONS ============ */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Hero;