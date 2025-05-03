
import { Workout } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Flame } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  // Function to get color based on workout category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Strength":
        return "bg-gym-workout-strength";
      case "Cardio":
        return "bg-gym-workout-cardio";
      case "Yoga":
        return "bg-gym-workout-yoga";
      case "Core":
        return "bg-gym-workout-core";
      case "Leg":
        return "bg-gym-workout-leg";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className={`${getCategoryColor(workout.category)} h-32 flex items-center justify-center`}>
        <h3 className="text-2xl font-bold text-white">{workout.name}</h3>
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Flame className="h-4 w-4" />
            <span>{workout.calories} kcal</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 flex-grow">{workout.description}</p>
        
        <div className="flex justify-between mt-auto">
          <Button variant="outline" size="sm">Details</Button>
          <Button variant="outline" size="sm">Schedule</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
