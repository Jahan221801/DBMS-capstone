
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWorkouts } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import FeaturedWorkout from "@/components/workouts/FeaturedWorkout";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Workout } from "@/types";
import { Dumbbell, Plus } from "lucide-react";
import { toast } from "sonner";

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [featuredWorkout, setFeaturedWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWorkouts();
        
        // Find the featured workout
        const featured = data.find(workout => workout.isFeatured);
        if (featured) {
          setFeaturedWorkout(featured);
        }
        
        // Set all workouts
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
        toast.error("Failed to load workouts");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Workouts</h1>
          <p className="text-muted-foreground">Manage workout programs and schedules</p>
        </div>

        <Button asChild>
          <Link to="/workouts/new">
            <Plus className="mr-2 h-4 w-4" /> Create Workout
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading workouts...</p>
        </div>
      ) : (
        <>
          {featuredWorkout && <FeaturedWorkout workout={featuredWorkout} />}

          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <Dumbbell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Available Workouts</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workouts
                .filter(workout => !workout.isFeatured)
                .map(workout => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))
              }
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Workouts;
