
"use client"
import { Suspense } from 'react';
import { useAuth } from '@/lib/auth/hooks';
import { getAllComplaints, getMyComplaints, getAssignedComplaints, getStaffList } from '@/lib/data';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { User, Complaint } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

function DashboardData() {
  const { user, loading: authLoading } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [staffList, setStaffList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoading(true);
      if (user.role === 'admin') {
        const [complaintsData, staffListData] = await Promise.all([
          getAllComplaints(),
          getStaffList(),
        ]);
        setComplaints(complaintsData);
        setStaffList(staffListData);
      } else if (user.role === 'student') {
        const complaintsData = await getMyComplaints(user.uid);
        setComplaints(complaintsData);
      } else if (user.role === 'staff') {
        const complaintsData = await getAssignedComplaints(user.uid);
        setComplaints(complaintsData);
      }
      setLoading(false);
    }

    fetchData();
  }, [user]);

  if (authLoading || loading) {
    return <DashboardSkeleton />;
  }

  if (!user) return <p>User not found.</p>;

  return <DashboardClient user={user} initialComplaints={complaints} staffList={staffList} />;
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardData />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
