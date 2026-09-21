'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, BookOpen, Briefcase, Star,
  Users, MessageCircle, Phone, Mail, Shield,
  GraduationCap, Clock, Calendar, Sparkles,
  Eye, ArrowRight, Bookmark, BookmarkCheck, Crown,
  Rocket, UserPlus, Filter as FilterIcon,
  X, Crown as CrownIcon, Check
} from 'lucide-react';

export default function TeachersDirectory() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [experienceRange, setExperienceRange] = useState([0, 30]);
  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [savedTeachers, setSavedTeachers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockTeachers = [
      { id: 1, name: "Dr. Priya Sharma", title: "Mathematics Expert", experience: 15, rating: 4.9, reviews: 128, subjects: ["Mathematics", "Physics", "Calculus"], location: "Delhi", available: true, hourlyRate: "₹800-₹1200", education: "PhD in Mathematics, IIT Delhi", bio: "15+ years of teaching experience with 1000+ students successfully placed in top colleges.", avatar: "PS", tags: ["IIT JEE", "Board Exams", "Olympiad"], featured: true, verified: true, color: "from-blue-500 to-cyan-500" },
      { id: 2, name: "Rohit Verma", title: "Physics Specialist", experience: 12, rating: 4.8, reviews: 95, subjects: ["Physics", "Electronics", "Mechanics"], location: "Mumbai", available: true, hourlyRate: "₹700-₹1000", education: "MSc Physics, BARC Mumbai", bio: "Specialized in conceptual physics teaching with innovative methods.", avatar: "RV", tags: ["NEET", "Engineering", "Competitive"], featured: true, verified: true, color: "from-purple-500 to-pink-500" },
      { id: 3, name: "Anjali Patel", title: "Chemistry Mentor", experience: 10, rating: 4.7, reviews: 87, subjects: ["Chemistry", "Organic Chemistry", "Biochemistry"], location: "Bangalore", available: false, hourlyRate: "₹600-₹900", education: "PhD in Chemistry, IISc Bangalore", bio: "Making chemistry fun and understandable for all students.", avatar: "AP", tags: ["Medical", "Engineering", "Research"], featured: false, verified: true, color: "from-green-500 to-emerald-500" },
      { id: 4, name: "Arjun Singh", title: "Biology Expert", experience: 8, rating: 4.6, reviews: 64, subjects: ["Biology", "Botany", "Zoology"], location: "Hyderabad", available: true, hourlyRate: "₹500-₹800", education: "MSc Biotechnology, University of Hyderabad", bio: "Simplifying complex biological concepts with real-world examples.", avatar: "AS", tags: ["NEET", "Medical", "Life Sciences"], featured: false, verified: true, color: "from-amber-500 to-orange-500" },
      { id: 5, name: "Meera Reddy", title: "English Language Coach", experience: 20, rating: 4.9, reviews: 156, subjects: ["English", "Literature", "Communication"], location: "Chennai", available: true, hourlyRate: "₹900-₹1400", education: "PhD in English Literature, University of Oxford", bio: "20+ years of teaching English to students from diverse backgrounds.", avatar: "MR", tags: ["IELTS", "TOEFL", "Spoken English"], featured: true, verified: true, color: "from-rose-500 to-pink-500" },
      { id: 6, name: "Kunal Malhotra", title: "Computer Science Guru", experience: 7, rating: 4.5, reviews: 42, subjects: ["Computer Science", "Programming", "AI"], location: "Pune", available: true, hourlyRate: "₹1000-₹1500", education: "MTech Computer Science, IIT Bombay", bio: "Industry professional turned teacher with real-world coding experience.", avatar: "KM", tags: ["Coding", "Web Development", "Data Science"], featured: false, verified: true, color: "from-indigo-500 to-blue-500" },
      { id: 7, name: "Sanskriti Sharma", title: "Social Studies Expert", experience: 18, rating: 4.8, reviews: 112, subjects: ["History", "Geography", "Civics"], location: "Kolkata", available: false, hourlyRate: "₹600-₹900", education: "MA History, JNU Delhi", bio: "Making history come alive with storytelling and interactive sessions.", avatar: "SS", tags: ["UPSC", "Board Exams", "Competitive"], featured: true, verified: true, color: "from-teal-500 to-green-500" },
      { id: 8, name: "Vikram Joshi", title: "Economics Professor", experience: 14, rating: 4.7, reviews: 89, subjects: ["Economics", "Business Studies", "Statistics"], location: "Ahmedabad", available: true, hourlyRate: "₹700-₹1100", education: "PhD Economics, Delhi School of Economics", bio: "Simplifying economics with real-world examples and case studies.", avatar: "VJ", tags: ["CA", "Commerce", "Banking"], featured: false, verified: true, color: "from-violet-500 to-purple-500" }
    ];

    setTeachers(mockTeachers);
    setFilteredTeachers(mockTeachers);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...teachers];

    if (searchQuery) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
        teacher.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(teacher =>
        selectedSubjects.some(subject =>
          teacher.subjects.map(s => s.toLowerCase()).includes(subject.toLowerCase())
        )
      );
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter(teacher => selectedLocations.includes(teacher.location));
    }

    filtered = filtered.filter(teacher =>
      teacher.experience >= experienceRange[0] && teacher.experience <= experienceRange[1]
    );

    if (availability !== 'all') {
      filtered = filtered.filter(teacher =>
        availability === 'available' ? teacher.available : !teacher.available
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'experience': return b.experience - a.experience;
        case 'price-low':
          return parseInt(a.hourlyRate.split('-')[0].replace('₹', '')) - parseInt(b.hourlyRate.split('-')[0].replace('₹', ''));
        case 'price-high':
          return parseInt(b.hourlyRate.split('-')[1].replace('₹', '')) - parseInt(a.hourlyRate.split('-')[1].replace('₹', ''));
        case 'reviews': return b.reviews - a.reviews;
        default: return 0;
      }
    });

    setFilteredTeachers(filtered);
  }, [searchQuery, selectedSubjects, selectedLocations, experienceRange, availability, sortBy, teachers]);

  const subjectsList = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Economics", "Business Studies", "Accountancy", "Political Science", "Psychology", "Sociology", "Art", "Music", "Physical Education", "Languages"];
  const locationsList = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"];

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev => prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]);
  };

  const handleLocationToggle = (location) => {
    setSelectedLocations(prev => prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]);
  };

  const toggleSaveTeacher = (teacherId) => {
    setSavedTeachers(prev => prev.includes(teacherId) ? prev.filter(id => id !== teacherId) : [...prev, teacherId]);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubjects([]);
    setSelectedLocations([]);
    setExperienceRange([0, 30]);
    setAvailability('all');
    setSortBy('rating');
  };

  const activeFilterCount = selectedSubjects.length + selectedLocations.length + (availability !== 'all' ? 1 : 0) + (experienceRange[1] !== 30 ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-white/60 rounded-2xl w-1/4" />
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/80">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60">
      
      {/* ============ ANIMATED BACKGROUND ============ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden">
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-lg shadow-blue-500/10 mb-6">
                <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-700">India's Largest Teacher Network</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                Find Your Perfect{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Teaching Mentor
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 350 12" fill="none">
                    <path d="M2 10C100 4 200 4 348 8" stroke="url(#gradTeachers)" strokeWidth="4" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradTeachers" x1="0" y1="0" x2="350" y2="0">
                        <stop stopColor="#3b82f6" />
                        <stop offset="0.5" stopColor="#6366f1" />
                        <stop offset="1" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                Browse <span className="text-slate-900 font-bold">10,000+</span> verified teachers across India. Filter by subject, location, 
                experience, and availability. Find the perfect match for your learning needs.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-3xl mx-auto mb-10">
                <div className="relative group">
                  {/* Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur-md opacity-30 group-focus-within:opacity-60 transition-opacity" />
                  
                  <div className="relative flex items-center bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/80 overflow-hidden">
                    <div className="pl-5 pr-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by subject, teacher name, location, or keyword..."
                      className="flex-1 py-4 pr-2 bg-transparent border-0 focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                    />
                    <button
                      onClick={() => setShowFilters(true)}
                      className="hidden md:flex items-center gap-2 mr-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all"
                    >
                      <FilterIcon className="h-4 w-4" />
                      <span>Filters</span>
                      {activeFilterCount > 0 && (
                        <span className="ml-1 h-5 w-5 rounded-full bg-white text-blue-600 text-xs font-black flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
                {[
                  { icon: Users, value: '10,000+', label: 'Teachers', color: 'from-blue-500 to-cyan-500' },
                  { icon: BookOpen, value: '50+', label: 'Subjects', color: 'from-purple-500 to-pink-500' },
                  { icon: MapPin, value: '100+', label: 'Cities', color: 'from-emerald-500 to-teal-500' },
                  { icon: Star, value: '4.8', label: 'Avg Rating', color: 'from-amber-500 to-orange-500' },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="group bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                      <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} shadow-md mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-xl md:text-2xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAIN CONTENT ============ */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* ============ FILTERS SIDEBAR (Desktop) ============ */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-white/80 p-6 overflow-hidden">
                  {/* Top gradient */}
                  <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full" />
                  
                  <div className="flex items-center justify-between mb-6 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                        <FilterIcon className="h-4 w-4 text-white" />
                      </div>
                      <h2 className="text-lg font-black text-slate-900">Filters</h2>
                      {activeFilterCount > 0 && (
                        <span className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                          {activeFilterCount}
                        </span>
                      )}
                    </div>
                    {activeFilterCount > 0 && (
                      <button onClick={resetFilters} className="text-xs text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wide">
                        Clear All
                      </button>
                    )}
                  </div>
                  
                  {/* Experience */}
                  <div className="mb-6">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                      <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                      Experience
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-semibold">0 years</span>
                        <span className="font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                          {experienceRange[1]}+ years
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={experienceRange[1]}
                        onChange={(e) => setExperienceRange([0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {[0, 5, 10, 15, 20, 25].map(num => (
                          <button
                            key={num}
                            onClick={() => setExperienceRange([0, num])}
                            className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all ${
                              experienceRange[1] === num
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                                : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                          >
                            {num}+
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 my-4" />
                  
                  {/* Subjects */}
                  <div className="mb-6">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                      <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                      Subjects
                      {selectedSubjects.length > 0 && (
                        <span className="ml-auto text-xs text-blue-600 font-bold">{selectedSubjects.length} selected</span>
                      )}
                    </h3>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scroll">
                      {subjectsList.map(subject => (
                        <button
                          key={subject}
                          onClick={() => handleSubjectToggle(subject)}
                          className={`flex items-center w-full text-left p-2 rounded-lg transition-all ${
                            selectedSubjects.includes(subject)
                              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100'
                              : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                          }`}
                        >
                          <div className={`h-4 w-4 rounded-md border-2 mr-3 flex items-center justify-center transition-all flex-shrink-0 ${
                            selectedSubjects.includes(subject)
                              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600'
                              : 'border-slate-300'
                          }`}>
                            {selectedSubjects.includes(subject) && (
                              <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
                            )}
                          </div>
                          <span className="text-xs font-semibold">{subject}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 my-4" />
                  
                  {/* Locations */}
                  <div className="mb-6">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-blue-600" />
                      Location
                      {selectedLocations.length > 0 && (
                        <span className="ml-auto text-xs text-blue-600 font-bold">{selectedLocations.length} selected</span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {locationsList.map(location => (
                        <button
                          key={location}
                          onClick={() => handleLocationToggle(location)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedLocations.includes(location)
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                              : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 my-4" />
                  
                  {/* Availability */}
                  <div className="mb-6">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                      <Clock className="h-3.5 w-3.5 text-blue-600" />
                      Availability
                    </h3>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['all', 'available', 'unavailable'].map(option => (
                        <button
                          key={option}
                          onClick={() => setAvailability(option)}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${
                            availability === option
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                              : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Results Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Show {filteredTeachers.length} Teachers
                  </button>
                </div>
                
                {/* CTA Card */}
                <div className="relative rounded-2xl p-6 overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-2xl shadow-emerald-500/30">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16" />
                  <div className="relative">
                    <div className="inline-flex p-2.5 rounded-xl bg-white/20 backdrop-blur-md mb-3 border border-white/30">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-black text-white text-lg mb-2">Are You a Teacher?</h3>
                    <p className="text-emerald-50 text-xs mb-4 font-medium leading-relaxed">
                      Join our network of 10,000+ educators and reach more students.
                    </p>
                    <Link
                      href="/teachers/signup"
                      className="group block w-full py-2.5 bg-white text-emerald-600 text-center font-bold rounded-xl hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all text-sm"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Join as Teacher
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ============ MAIN CONTENT AREA ============ */}
            <div className="flex-1 min-w-0">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 tracking-tight">
                    Top Teaching <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Experts</span>
                  </h2>
                  <p className="text-sm text-slate-600 font-medium">
                    Showing <span className="font-black text-blue-600">{filteredTeachers.length}</span> of {teachers.length} teachers
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-xl border border-white/80 shadow-sm px-3 py-2">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent border-0 text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <option value="rating">Highest Rating</option>
                      <option value="experience">Most Experienced</option>
                      <option value="reviews">Most Reviews</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30"
                  >
                    <FilterIcon className="h-4 w-4" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="h-5 w-5 rounded-full bg-white text-blue-600 text-xs font-black flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Teachers Grid */}
              {filteredTeachers.length === 0 ? (
                <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl border border-white/80 shadow-lg">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-4 border border-blue-100">
                    <Search className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">No teachers found</h3>
                  <p className="text-slate-600 mb-6 font-medium">Try adjusting your filters or search terms</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTeachers.map(teacher => (
                    <div key={teacher.id} className="group relative">
                      {/* Glow */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-br ${teacher.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                      
                      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-lg shadow-slate-200/50 border border-white/80 hover:border-blue-200/70 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden transition-all duration-300 h-full flex flex-col">
                        
                        {/* Gradient top bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${teacher.color}`} />
                        
                        {/* Content */}
                        <div className="p-5 flex-1">
                          
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4 pt-1">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="relative flex-shrink-0">
                                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${teacher.color} flex items-center justify-center text-white text-lg font-black shadow-lg ring-4 ring-white`}>
                                  {teacher.avatar}
                                </div>
                                {teacher.verified && (
                                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-3 ring-white shadow-md">
                                    <Shield className="h-3 w-3 text-white" strokeWidth={3} />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h3 className="text-base font-black text-slate-900 truncate">
                                    {teacher.name}
                                  </h3>
                                  {teacher.featured && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black rounded-full shadow-sm">
                                      <CrownIcon className="h-2.5 w-2.5" />
                                      PRO
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs font-bold text-blue-600 truncate">{teacher.title}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                  <span className="text-xs font-black text-slate-900">{teacher.rating}</span>
                                  <span className="text-[10px] text-slate-500 font-semibold">({teacher.reviews})</span>
                                </div>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => toggleSaveTeacher(teacher.id)}
                              className={`p-2 rounded-xl transition-all flex-shrink-0 ${
                                savedTeachers.includes(teacher.id)
                                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 shadow-sm'
                                  : 'hover:bg-slate-100 text-slate-400'
                              }`}
                            >
                              {savedTeachers.includes(teacher.id) ? (
                                <BookmarkCheck className="h-4 w-4" />
                              ) : (
                                <Bookmark className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          
                          {/* Info rows */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                              <div className="p-1.5 rounded-lg bg-slate-100 flex-shrink-0">
                                <Briefcase className="h-3 w-3 text-slate-500" />
                              </div>
                              <span>{teacher.experience} years experience</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                              <div className="p-1.5 rounded-lg bg-slate-100 flex-shrink-0">
                                <MapPin className="h-3 w-3 text-slate-500" />
                              </div>
                              <span>{teacher.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                              <div className="p-1.5 rounded-lg bg-slate-100 flex-shrink-0">
                                <GraduationCap className="h-3 w-3 text-slate-500" />
                              </div>
                              <span className="truncate">{teacher.education}</span>
                            </div>
                          </div>
                          
                          {/* Availability Badge */}
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black mb-4 ${
                            teacher.available
                              ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            <span className="relative flex h-2 w-2">
                              {teacher.available && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              )}
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                teacher.available ? 'bg-emerald-500' : 'bg-slate-400'
                              }`} />
                            </span>
                            {teacher.available ? 'Available Now' : 'Currently Busy'}
                          </div>
                          
                          {/* Subjects */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {teacher.subjects.slice(0, 3).map((subject, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-[10px] font-black rounded-full border border-blue-100"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                          
                          {/* Bio */}
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                            {teacher.bio}
                          </p>
                        </div>
                        
                        {/* Footer */}
                        <div className="border-t border-slate-100 p-4 bg-gradient-to-br from-white to-slate-50/50">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Hourly Rate</div>
                              <div className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                {teacher.hourlyRate}
                              </div>
                            </div>
                            
                            <div className="flex gap-1">
                              {[MessageCircle, Phone, Mail].map((Icon, i) => (
                                <button key={i} className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group/icon">
                                  <Icon className="h-3.5 w-3.5 text-slate-500 group-hover/icon:text-blue-600 transition-colors" />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              href={`/teachers/${teacher.id}`}
                              className="group/btn relative flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-xs shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all overflow-hidden"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                              <Eye className="h-3.5 w-3.5 relative" />
                              <span className="relative">View Profile</span>
                            </Link>
                            <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-xs hover:bg-blue-50 transition-all">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Book Trial</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {filteredTeachers.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-white/80 shadow-lg">
                    <button className="px-4 py-2 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      ← Previous
                    </button>
                    {[1, 2, 3, '...', 10].map((page, index) => (
                      <button
                        key={index}
                        disabled={page === '...'}
                        className={`min-w-[36px] h-9 px-3 rounded-lg text-xs font-black transition-all ${
                          page === 1
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                            : page === '...'
                            ? 'text-slate-400 cursor-default'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="px-4 py-2 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* ============ CTA BANNER ============ */}
      <section className="relative py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-500/30 text-center">
            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 backdrop-blur-3xl rounded-full -translate-y-32 translate-x-32 border border-white/20" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 backdrop-blur-3xl rounded-full translate-y-28 -translate-x-28 border border-white/20" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6">
                <Rocket className="h-3.5 w-3.5 text-yellow-300" />
                <span className="text-xs font-black text-white uppercase tracking-wider">Join Our Elite Network</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
                Ready to Find Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                  Perfect Teacher?
                </span>
              </h2>
              
              <p className="text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium">
                Browse our verified teacher profiles, read reviews, and book a free trial session. 
                Your learning journey starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="group relative px-8 py-3.5 bg-white text-blue-600 font-black rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <UserPlus className="h-5 w-5 mr-2 relative" />
                  <span className="relative">Find a Teacher Now</span>
                </Link>
                <Link
                  href="/teachers/signup"
                  className="px-8 py-3.5 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white font-black rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Join as Teacher
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MOBILE FILTERS MODAL ============ */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md" onClick={() => setShowFilters(false)} />
          
          <div className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl overflow-y-auto">
            {/* Gradient side */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500" />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                    <FilterIcon className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-black text-slate-900">Filters</h2>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Experience */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                    <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                    Experience
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-semibold">0 years</span>
                      <span className="font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        {experienceRange[1]}+ years
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={experienceRange[1]}
                      onChange={(e) => setExperienceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Subjects */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                    <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                    Subjects
                  </h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {subjectsList.map(subject => (
                      <button
                        key={subject}
                        onClick={() => handleSubjectToggle(subject)}
                        className={`flex items-center w-full text-left p-2 rounded-lg transition-all ${
                          selectedSubjects.includes(subject)
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`h-4 w-4 rounded-md border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                          selectedSubjects.includes(subject)
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600'
                            : 'border-slate-300'
                        }`}>
                          {selectedSubjects.includes(subject) && (
                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
                          )}
                        </div>
                        <span className="text-xs font-semibold">{subject}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Locations */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    Location
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {locationsList.map(location => (
                      <button
                        key={location}
                        onClick={() => handleLocationToggle(location)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedLocations.includes(location)
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                            : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Availability */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                    Availability
                  </h3>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['all', 'available', 'unavailable'].map(option => (
                      <button
                        key={option}
                        onClick={() => setAvailability(option)}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          availability === option
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                            : 'bg-slate-100 text-slate-600 hover:bg-blue-50'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => { resetFilters(); setShowFilters(false); }}
                  className="w-full py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all"
                >
                  Show {filteredTeachers.length} Teachers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          border-radius: 3px;
          outline: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #3b82f6;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
          transition: transform 0.2s;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #3b82f6;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}