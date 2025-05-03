
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import WorkoutForm from "@/components/workouts/WorkoutForm";
import { Workout } from "@/types";
import { fetchWorkout } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const EditWorkout = () => {
  const { id } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkout = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchWorkout(parseInt(id));
        if (data) {
          setWorkout(data);
        } else {
          toast.error("Workout not found");
        }
      } catch (error) {
        console.error("Failed to load workout:", error);
        toast.error("Failed to load workout");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkout();
  }, [id]);

  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/workouts" className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Workouts
        </Link>
        <h1 className="text-2xl font-bold">Edit Workout</h1>
        <p className="text-muted-foreground">Update workout information</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading workout data...</p>
        </div>
      ) : workout ? (
        <div className="border rounded-lg p-6 bg-white">
          <WorkoutForm initialData={workout} isEdit={true} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Workout not found</p>
        </div>
      )}
    </MainLayout>
  );
};

export default EditWorkout;
