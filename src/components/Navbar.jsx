'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/src/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, X, Briefcase, User, Home, 
  MessageSquare, LogOut, ChevronDown,
  Users, LayoutDashboard, Lightbulb, 
  MessageCircle, Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', rating: 0 });
  
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const handleProtectedAction = (action, path) => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }
    if (path) router.push(path);
    else if (action) action();
    return true;
  };

  const handleJobApply = (jobId) => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }
    router.push(`/jobs/${jobId}/apply`);
  };

  const handlePostJob = () => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }
    router.push('/jobs/post');
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '917250945759';
    const message = 'Hi! I need help with TeachersDoor Jobs';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const a = document.createElement('a');
    a.href = whatsappUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.message.trim()) {
      alert('Please enter your feedback');
      return;
    }
    try {
      console.log('Feedback submitted:', feedback);
      alert('Thank you for your feedback!');
      setFeedback({ message: '', rating: 0 });
      setShowFeedback(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const mainLinks = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { href: '/jobs', label: 'Jobs', icon: <Briefcase className="h-4 w-4" /> },
    { href: '/career-advice', label: 'Career Advice', icon: <Lightbulb className="h-4 w-4" /> },
    { href: '/teachers', label: 'Teachers', icon: <Users className="h-4 w-4" /> },
  ];

  const userDashboardLinks = user ? [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { href: '/applications', label: 'My Applications', icon: <Briefcase className="h-4 w-4" /> },
  ] : [];

  // ============ LOGO COMPONENT (Using public/logo.png) ============
  const Logo = ({ size = 'md' }) => {
    const sizeMap = {
      sm: { img: 36, text: 'text-base', sub: 'text-[8px]' },
      md: { img: 44, text: 'text-lg', sub: 'text-[9px]' },
      lg: { img: 52, text: 'text-xl', sub: 'text-[10px]' },
    };
    const s = sizeMap[size] || sizeMap.md;

    return (
      <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
        {/* Logo Image from public/logo.png */}
        <div className="relative flex-shrink-0">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-md opacity-50 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Logo container */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-lg border border-white/60 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 overflow-hidden">
            <Image
              src="/cr.png"
              alt="TeachersDoor Logo"
              width={s.img}
              height={s.img}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Logo Text */}
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent ${s.text}`}>
            Teachers<span className="text-blue-600">Door</span>
          </span>
          <span className={`font-semibold tracking-[0.2em] text-gray-400 uppercase ${s.sub}`}>
            Jobs Portal
          </span>
        </div>
      </Link>
    );
  };

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            <Logo />
            <div className="h-9 w-9 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* ==================== MAIN NAVBAR ==================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/75 backdrop-blur-2xl shadow-lg shadow-blue-500/5 border-b border-white/40'
            : 'bg-white/60 backdrop-blur-xl border-b border-white/20'
        }`}
      >
        {/* Animated gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80" />

        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">

            {/* ---- Left: Logo + Desktop Nav ---- */}
            <div className="flex items-center gap-8">
              <Logo />

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 shadow-inner">
                {mainLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? 'text-white shadow-md'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30" />
                      )}
                      <span className="relative flex items-center gap-2">
                        {link.icon}
                        <span>{link.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ---- Right Side Actions ---- */}
            <div className="flex items-center gap-2">

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Post Job */}
                <button
                  onClick={handlePostJob}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 rounded-lg shadow-lg shadow-purple-500/40" />
                  <Briefcase className="h-4 w-4 relative" />
                  <span className="relative">Post Job</span>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsAppClick}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 rounded-lg shadow-lg shadow-green-500/40" />
                  <MessageCircle className="h-4 w-4 relative" />
                  <span className="relative">WhatsApp</span>
                </button>

                {/* Feedback */}
                <button
                  onClick={() => setShowFeedback(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-blue-600 bg-white/50 hover:bg-blue-50/70 backdrop-blur-md border border-white/60 hover:border-blue-200 transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Feedback</span>
                </button>
              </div>

              {/* User Menu / Login */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/70 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        {user.displayName?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">View Profile</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 hidden lg:block group-hover:rotate-180 transition-transform duration-300" />
                  </button>

                  {/* Dropdown - Glassmorphic */}
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-blue-500/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    
                    <div className="px-4 py-3 mt-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Signed in as
                      </p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email}
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-100/80 mx-2" />
                    
                    {userDashboardLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200"
                      >
                        {link.icon}
                        <span className="text-sm font-semibold">{link.label}</span>
                      </Link>
                    ))}
                    
                    <div className="border-t border-gray-100/80 mx-2 my-1" />
                    
                    <div className="px-3 py-2 space-y-2">
                      <button
                        onClick={handleWhatsAppClick}
                        className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm font-semibold shadow-md shadow-green-500/20 transition-all"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp Help</span>
                      </button>
                      
                      <button
                        onClick={() => setShowFeedback(true)}
                        className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-300 text-sm font-semibold transition-all"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Give Feedback</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100/80 mx-2 my-1" />
                    
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 w-full transition-colors font-semibold text-sm"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:flex group relative items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 rounded-full shadow-lg shadow-blue-500/40" />
                  <Sparkles className="h-4 w-4 relative" />
                  <span className="relative">Login</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/70 text-gray-700 hover:text-blue-600 shadow-sm transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== MOBILE SIDEBAR ==================== */}
      <div className={`lg:hidden fixed inset-0 z-[60] ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-[320px] max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-2xl transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500" />

          {/* Header */}
          <div className="p-5 border-b border-gray-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
            <div className="flex items-center justify-between mb-5">
              <Logo size="lg" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/80 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/30"
              >
                <Sparkles className="h-4 w-4" />
                Login Now
              </Link>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="h-[calc(100%-180px)] overflow-y-auto p-5">

            {/* Navigation */}
            <div className="space-y-1 mb-6">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] px-3 mb-3">
                Navigation
              </h3>
              {mainLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {link.icon}
                    </div>
                    <span className="text-sm font-semibold">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] px-3 mb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    if (user) {
                      router.push('/jobs/post');
                      setIsMenuOpen(false);
                    } else {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }
                  }}
                  className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md hover:shadow-purple-500/20 transition-all"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">Post Job</span>
                  {!user && <span className="text-[9px] text-gray-400">(Login)</span>}
                </button>

                <button
                  onClick={() => { handleWhatsAppClick(); setIsMenuOpen(false); }}
                  className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-md hover:shadow-green-500/20 transition-all"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-md">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">WhatsApp</span>
                </button>

                <button
                  onClick={() => { setShowFeedback(true); setIsMenuOpen(false); }}
                  className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md hover:shadow-blue-500/20 transition-all"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">Feedback</span>
                </button>

                <button
                  onClick={() => {
                    if (user) {
                      router.push('/jobs');
                      setIsMenuOpen(false);
                    } else {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }
                  }}
                  className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:shadow-md hover:shadow-amber-500/20 transition-all"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">Apply Jobs</span>
                  {!user && <span className="text-[9px] text-gray-400">(Login)</span>}
                </button>
              </div>
            </div>

            {/* User Dashboard */}
            {user && (
              <div className="mb-6">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] px-3 mb-3">
                  My Account
                </h3>
                <div className="space-y-1">
                  {userDashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 rounded-xl transition-all"
                    >
                      <div className="p-2 rounded-lg bg-gray-100">
                        {link.icon}
                      </div>
                      <span className="text-sm font-semibold">{link.label}</span>
                    </Link>
                  ))}

                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 w-full rounded-xl transition-all"
                  >
                    <div className="p-2 rounded-lg bg-red-100">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            )}

            {/* Login CTA for non-users */}
            {!user && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-white/10 blur-xl" />
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                    <h3 className="text-sm font-bold text-white">Join TeachersDoor</h3>
                  </div>
                  <p className="text-xs text-blue-100 mb-3 leading-relaxed">
                    Login to apply for jobs, post jobs, and track applications
                  </p>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 bg-white text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 shadow-md transition-all"
                  >
                    Login Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== AUTH REQUIRED MODAL ==================== */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl max-w-md w-full shadow-2xl border border-white/60 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Login Required</h3>
                    <p className="text-xs text-gray-500">Please login to continue</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { icon: Briefcase, text: 'Apply for jobs', color: 'from-blue-500 to-indigo-500' },
                  { icon: Briefcase, text: 'Post new jobs', color: 'from-purple-500 to-pink-500' },
                  { icon: LayoutDashboard, text: 'Track applications', color: 'from-green-500 to-emerald-500' },
                  { icon: User, text: 'Create your profile', color: 'from-amber-500 to-orange-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} shadow-sm`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/login"
                onClick={() => setShowAuthModal(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Login Now
              </Link>
              
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FEEDBACK MODAL ==================== */}
      {showFeedback && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl max-w-md w-full shadow-2xl border border-white/60 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Share Feedback</h3>
                    <p className="text-xs text-gray-500">Help us improve</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    How would you rate us?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedback({ ...feedback, rating: star })}
                        className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                          star <= feedback.rating
                            ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback.message}
                    onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                    placeholder="What can we improve? What do you like?"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28 resize-none bg-gray-50/50"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFeedback(false)}
                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 text-white rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
    </>
  );
}