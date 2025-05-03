
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardStats, fetchMembers } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import MembersList from "@/components/dashboard/MembersList";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/types";
import { Member } from "@/types";
import { Users, Award, Dumbbell, IndianRupee, Plus } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [statsData, membersData] = await Promise.all([
          fetchDashboardStats(),
          fetchMembers()
        ]);
        
        setStats(statsData);
        setMembers(membersData.filter(member => member.role === 'Member' && member.status === 'Active'));
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading dashboard data...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Alpha Fit management system</p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">
            Export Data
          </Button>
          <Button asChild>
            <Link to="/members/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Member
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Members" 
          value={stats?.totalMembers || 0} 
          trend={{ value: stats?.memberGrowth || 0, label: "from last month", isPositive: true }}
          icon={<Users className="h-5 w-5 text-primary" />}
          iconClassName="bg-primary-light p-2 rounded-full text-primary"
        />
        <StatCard 
          title="Active Trainers" 
          value={stats?.activeTrainers || 0} 
          icon={<Award className="h-5 w-5 text-gym-blue" />}
          iconClassName="bg-blue-50 p-2 rounded-full text-gym-blue"
        />
        <StatCard 
          title="Active Workouts" 
          value={stats?.activeWorkouts || 0} 
          trend={{ value: stats?.workoutGrowth || 0, label: "from last week", isPositive: true }}
          icon={<Dumbbell className="h-5 w-5 text-gym-orange" />}
          iconClassName="bg-orange-50 p-2 rounded-full text-gym-orange"
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats?.totalRevenue?.toLocaleString('en-IN') || 0}`} 
          trend={{ value: stats?.revenueGrowth || 0, label: "from last month", isPositive: true }}
          icon={<IndianRupee className="h-5 w-5 text-green-600" />}
          iconClassName="bg-green-50 p-2 rounded-full text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ActivityChart data={stats?.monthlyActivity || []} />
        <MembersList 
          members={members} 
          totalMembers={stats?.totalMembers || 0}
          checkIns={stats?.checkIns || 0}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
