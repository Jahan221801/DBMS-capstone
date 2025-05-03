
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Workout } from "@/types";
import { useNavigate } from "react-router-dom";
import { addWorkout, updateWorkout } from "@/lib/api";
import { toast } from "sonner";

const workoutFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  duration: z.coerce.number().min(5, { message: "Duration must be at least 5 minutes." }),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  calories: z.coerce.number().min(0, { message: "Calories must be a positive number." }),
  category: z.enum(["Strength", "Cardio", "Yoga", "Core", "Leg"]),
  isFeatured: z.boolean().default(false),
  discount: z.string().optional(),
  sessions: z.coerce.number().optional(),
  weeks: z.coerce.number().optional(),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

interface WorkoutFormProps {
  initialData?: Workout;
  isEdit?: boolean;
}

export function WorkoutForm({ initialData, isEdit = false }: WorkoutFormProps) {
  const navigate = useNavigate();
  
  const defaultValues: WorkoutFormValues = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    duration: initialData?.duration || 30,
    difficulty: initialData?.difficulty || "Beginner",
    calories: initialData?.calories || 0,
    category: initialData?.category || "Strength",
    isFeatured: initialData?.isFeatured || false,
    discount: initialData?.discount || "",
    sessions: initialData?.sessions,
    weeks: initialData?.weeks,
  };

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues,
  });

  const isFeatured = form.watch("isFeatured");

  async function onSubmit(data: WorkoutFormValues) {
    try {
      if (isEdit && initialData) {
        await updateWorkout({
          ...initialData,
          ...data,
        });
        toast.success("Workout updated successfully");
      } else {
        // Ensure all required fields are passed to the API
        const newWorkout: Omit<Workout, "id"> = {
          name: data.name,
          description: data.description,
          duration: data.duration,
          difficulty: data.difficulty,
          calories: data.calories,
          category: data.category,
          isFeatured: data.isFeatured,
        };
        
        // Add optional fields only if they have values
        if (data.discount) newWorkout.discount = data.discount;
        if (data.sessions) newWorkout.sessions = data.sessions;
        if (data.weeks) newWorkout.weeks = data.weeks;
        
        await addWorkout(newWorkout);
        toast.success("Workout added successfully");
      }
      navigate("/workouts");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Body Workout" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Yoga">Yoga</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Leg">Leg</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="A comprehensive workout targeting all major muscle groups..." 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel className="text-base">Featured Program</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    This workout will be featured on the homepage
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isFeatured && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
            <FormField
              control={form.control}
              name="sessions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Sessions</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weeks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Weeks</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (e.g., "30% OFF")</FormLabel>
                  <FormControl>
                    <Input placeholder="30% OFF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/workouts")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Update Workout" : "Create Workout"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default WorkoutForm;
