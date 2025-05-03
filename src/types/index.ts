
export interface Member {
  last_name: any;
  first_name: any;
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  membershipType: 'Elite' | 'Premium' | 'Basic' | 'Annual Premium' | 'Annual Basic';
  membershipStartDate: string;
  dateOfBirth: string;
  status: 'Active' | 'Inactive';
  role: 'Member' | 'Trainer' | 'Admin';
  avatar?: string;
}

export interface Workout {
  id: number;
  name: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: number;
  sessions?: number;
  category: 'Strength' | 'Cardio' | 'Yoga' | 'Core' | 'Leg';
  isFeatured?: boolean;
  discount?: string;
  weeks?: number;
}

export interface Payment {
  id: number;
  memberId: number;
  memberName: string;
  memberEmail: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Credit Card' | 'UPI';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface DashboardStats {
  totalMembers: number;
  activeTrainers: number;
  activeWorkouts: number;
  totalRevenue: number;
  memberGrowth: number;
  revenueGrowth: number;
  workoutGrowth: number;
  checkIns: number;
  monthlyActivity: { month: string; count: number }[];
  averageSession: number;
  sessionGrowth: number;
  newMembers: number;
  newMembersGrowth: number;
  revenue: number;
  revenueGrowthRate: number;
}
