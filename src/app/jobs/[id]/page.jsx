'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/src/lib/firebase';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import {
  Briefcase, MapPin, Calendar, Home, ChevronRight, Building,
  Users, DollarSign, Clock, BookOpen, Award, Zap, Star,
  ExternalLink, Share2, Bookmark, CheckCircle2, ArrowLeft,
  GraduationCap, Globe, Phone, Mail, Send
} from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);

  // 🔐 Auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDocs(
            query(collection(db, 'users'), where('uid', '==', currentUser.uid))
          );
          if (!userDoc.empty) {
            setUserRole(userDoc.docs[0].data().userType);
          }
        } catch (e) {
          console.error('User role fetch error:', e);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 📥 Fetch job by ID
  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobRef = doc(db, 'jobs', jobId);
        const jobSnap = await getDoc(jobRef);

        if (!jobSnap.exists()) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const jobData = { id: jobSnap.id, ...jobSnap.data() };

        // Format date
        jobData.postedDateFormatted = jobData.createdAt
          ? new Date(jobData.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          : 'Recently';

        setJob(jobData);

        // Increment views
        try {
          await updateDoc(jobRef, { views: increment(1) });
        } catch (e) {
          console.warn('View increment failed:', e);
        }

        // Fetch similar jobs (same jobType, not same id)
        try {
          const simQ = query(
            collection(db, 'jobs'),
            where('jobType', '==', jobData.jobType || 'full-time')
          );
          const simSnap = await getDocs(simQ);
          const simList = [];
          simSnap.forEach((d) => {
            if (d.id !== jobId) simList.push({ id: d.id, ...d.data() });
          });
          setSimilarJobs(simList.slice(0, 3));
        } catch (e) {
          console.warn('Similar jobs fetch failed:', e);
        }

        // Check if user already applied
        if (user) {
          try {
            const appQ = query(
              collection(db, 'applications'),
              where('jobId', '==', jobId),
              where('applicantId', '==', user.uid)
            );
            const appSnap = await getDocs(appQ);
            setHasApplied(!appSnap.empty);
          } catch (e) {
            console.warn('Application check failed:', e);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching job:', error);
        setNotFound(true);
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, user]);

  // 📝 Apply handler
  const handleApply = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (userRole !== 'candidate') {
      alert('Only candidates can apply for jobs.');
      return;
    }
    if (hasApplied) {
      alert('You have already applied for this job.');
      return;
    }

    try {
      setApplying(true);
      await addDoc(collection(db, 'applications'), {
        jobId: job.id,
        jobTitle: job.title,
        instituteId: job.instituteId || '',
        applicantId: user.uid,
        applicantEmail: user.email,
        applicantName: user.displayName || '',
        status: 'pending',
        appliedAt: new Date().toISOString(),
      });

      // Increment applications count
      try {
        await updateDoc(doc(db, 'jobs', job.id), {
          applications: increment(1),
        });
      } catch (e) {
        console.warn('Applications increment failed:', e);
      }

      setHasApplied(true);
      alert('✅ Application submitted successfully!');
    } catch (error) {
      console.error('Apply error:', error);
      alert('Failed to apply. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  // 🔗 Share handler
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title}`,
          url,
        });
      } catch (e) {
        console.warn('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // ❌ Not found
  if (notFound || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Job Not Found</h1>
          <p className="text-gray-600 mb-8">
            Ye job listing exist nahi karti ya hata di gayi hai.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const skills = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === 'string'
    ? job.skills.split(',').map((s) => s.trim())
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HERO / HEADER ===== */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center text-white/90 text-sm mb-6">
            <Link href="/" className="flex items-center hover:text-white transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3 mx-2 text-white/70" />
            <Link href="/jobs" className="hover:text-white transition-colors">
              Jobs
            </Link>
            <ChevronRight className="h-3 w-3 mx-2 text-white/70" />
            <span className="text-white font-medium truncate max-w-[200px]">
              {job.title}
            </span>
          </nav>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {/* Job Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={job.companyName || 'Company'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building className="h-10 w-10 text-white/70" />
                )}
              </div>
            </div>

            {/* Title & Meta */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {job.urgent && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    🔥 Urgent Hiring
                  </span>
                )}
                {job.featured && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                    ⭐ Featured
                  </span>
                )}
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                  {job.jobType || 'Full Time'}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                {job.title}
              </h1>

              <p className="text-lg text-yellow-300 font-semibold mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                {job.companyName || 'Institute'}
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                {job.location && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    {job.location}
                  </span>
                )}
                {job.salary && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                    <DollarSign className="h-4 w-4 mr-1.5" />
                    {job.salary}
                  </span>
                )}
                {job.experience && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                    <Award className="h-4 w-4 mr-1.5" />
                    {job.experience}
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  {job.postedDateFormatted}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-gray-50" viewBox="0 0 1440 120" fill="currentColor">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 py-8 -mt-4">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT — Job Details */}
          <div className="lg:w-2/3 space-y-6">

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleApply}
                disabled={applying || hasApplied}
                className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  hasApplied
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-70`}
              >
                {hasApplied ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Already Applied
                  </>
                ) : applying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Applying...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Apply Now
                  </>
                )}
              </button>

              <button
                onClick={() => setSaved(!saved)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium border transition-colors ${
                  saved
                    ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
                {saved ? 'Saved' : 'Save'}
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>

            {/* Job Description */}
            {job.description && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-600" />
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Overview Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Job Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <OverviewItem icon={Clock} label="Job Type" value={job.jobType || 'Full Time'} />
                <OverviewItem icon={Award} label="Experience" value={job.experience || 'Not specified'} />
                <OverviewItem icon={MapPin} label="Location" value={job.location || 'Not specified'} />
                <OverviewItem icon={DollarSign} label="Salary" value={job.salary || 'Not disclosed'} />
                <OverviewItem icon={Users} label="Applications" value={`${job.applications || 0} applied`} />
                <OverviewItem icon={Calendar} label="Posted" value={job.postedDateFormatted} />
              </div>
            </div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  Similar Jobs
                </h2>
                <div className="space-y-3">
                  {similarJobs.map((sj) => (
                    <Link
                      key={sj.id}
                      href={`/jobs/${sj.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{sj.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <Building className="h-3.5 w-3.5 mr-1" />
                            {sj.companyName || 'Institute'}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            {sj.location && (
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {sj.location}
                              </span>
                            )}
                            {sj.salary && (
                              <span className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {sj.salary}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <div className="lg:w-1/3 space-y-6">

            {/* Institute Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                About Institute
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building className="h-7 w-7 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {job.companyName || 'Institute'}
                  </p>
                  <p className="text-xs text-gray-500">Verified Employer</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Globe className="h-4 w-4 mr-2 text-gray-400" />
                  India
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  {job.jobType || 'Full Time'}
                </div>
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                <TrendingUpIcon />
                Job Insights
              </h3>
              <div className="space-y-3">
                <StatRow label="Total Views" value={job.views || 0} />
                <StatRow label="Applications" value={job.applications || 0} />
                <StatRow label="Posted On" value={job.postedDateFormatted} />
                <StatRow label="Status" value={job.status || 'Active'} />
              </div>
            </div>

            {/* Apply CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ready to Apply?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Submit your application now and get noticed by top institutes.
              </p>
              <button
                onClick={handleApply}
                disabled={applying || hasApplied}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  hasApplied
                    ? 'bg-green-500 cursor-not-allowed'
                    : 'bg-white text-blue-700 hover:bg-blue-50'
                } disabled:opacity-70`}
              >
                {hasApplied ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Applied
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Apply Now
                  </>
                )}
              </button>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Have questions about this job? Reach out to us.
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+919528794938"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +91 95287 94938
                </a>
                <a
                  href="mailto:support@srkdesigner.com"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  support@srkdesigner.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 Small reusable components
function OverviewItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900 capitalize truncate">{value}</p>
      </div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-blue-800">{label}</span>
      <span className="font-semibold text-blue-900 capitalize">{value}</span>
    </div>
  );
}

function TrendingUpIcon() {
  return <Zap className="h-5 w-5 mr-2 text-blue-600" />;
}