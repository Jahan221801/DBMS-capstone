
import MainLayout from "@/components/layout/MainLayout";
import WorkoutForm from "@/components/workouts/WorkoutForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddWorkout = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/workouts" className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Workouts
        </Link>
        <h1 className="text-2xl font-bold">Create New Workout</h1>
        <p className="text-muted-foreground">Set up a new workout program</p>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <WorkoutForm />
      </div>
    </MainLayout>
  );
};

export default AddWorkout;
