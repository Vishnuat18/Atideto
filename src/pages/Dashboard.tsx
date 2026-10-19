import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import SEO from '@/components/seo/SEO';
import StudentBlackWhiteDashboard from '@/components/dashboard/StudentBlackWhiteDashboard';
import AdminErpDashboard from '@/components/dashboard/AdminErpDashboard';

export default function Dashboard() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'student' | 'admin'>(() => {
    return user?.role === 'admin' ? 'admin' : 'student';
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#AFAFAF]">Loading your Atideto workspace...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ADMIN ERP SUITE (Exact copy of Atideto Technologies ERP)
  // -------------------------------------------------------------
  if (viewMode === 'admin') {
    return (
      <>
        <SEO 
          title="Atideto Technologies ERP • Admin Management Suite" 
          description="Enterprise resource planning, students directory, certificates, and registrations for Atideto Technologies." 
          noindex={true} 
        />
        <AdminErpDashboard 
          user={user} 
          onSwitchToStudent={() => setViewMode('student')} 
        />
      </>
    );
  }

  // -------------------------------------------------------------
  // STUDENT DASHBOARD (Strictly Two Colors Only: Pure Black & White)
  // Exact Image 1 & Image 2 Implementation
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <SEO 
        title="Student Learning Dashboard | Atideto" 
        description="Track your course lectures, video modules, weekly learning statistics, and verified internships." 
        noindex={true} 
      />
      <div className="w-full max-w-[1440px]">
        <StudentBlackWhiteDashboard 
          user={user} 
          onSwitchToAdmin={user.role === 'admin' ? () => setViewMode('admin') : undefined} 
        />
      </div>
    </div>
  );
}
