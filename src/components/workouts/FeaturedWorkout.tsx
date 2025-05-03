
import { Workout } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

interface FeaturedWorkoutProps {
  workout: Workout;
}

export function FeaturedWorkout({ workout }: FeaturedWorkoutProps) {
  return (
    <Card className="bg-primary text-white overflow-hidden">
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-primary-light text-primary rounded-md px-3 py-1 inline-block mb-4 font-medium text-sm">
            Featured Program
          </div>
          <h2 className="text-3xl font-bold mb-4">{workout.name}</h2>
          <p className="mb-6">{workout.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm opacity-80">Duration</p>
              <p className="font-semibold">{workout.weeks} Weeks</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Difficulty</p>
              <p className="font-semibold">{workout.difficulty}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Workouts</p>
              <p className="font-semibold">{workout.sessions} Sessions</p>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            className="bg-white text-primary hover:bg-gray-100"
          >
            View Program
          </Button>
        </div>
        
        <div className="flex justify-center lg:justify-end items-center">
          <div className="text-right">
            <Dumbbell className="w-24 h-24 mb-4 ml-auto" />
            <div className="text-5xl font-bold mb-2">{workout.discount}</div>
            <p className="text-lg">For Premium Members</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FeaturedWorkout;
