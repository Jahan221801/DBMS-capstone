
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
import { Member } from "@/types";
import { useNavigate } from "react-router-dom";
import { addMember, updateMember } from "@/lib/api";
import { toast } from "sonner";

const memberFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  membershipType: z.enum(["Elite", "Premium", "Basic", "Annual Premium", "Annual Basic"]),
  dateOfBirth: z.string(),
  role: z.enum(["Member", "Trainer", "Admin"]),
  status: z.enum(["Active", "Inactive"]),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

interface MemberFormProps {
  initialData?: Member;
  isEdit?: boolean;
}

export function MemberForm({ initialData, isEdit = false }: MemberFormProps) {
  const navigate = useNavigate();
  
  const defaultValues: MemberFormValues = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    membershipType: initialData?.membershipType || "Basic",
    dateOfBirth: initialData?.dateOfBirth || "",
    role: initialData?.role || "Member",
    status: initialData?.status || "Active",
  };

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues,
  });

  async function onSubmit(data: MemberFormValues) {
    try {
      if (isEdit && initialData) {
        await updateMember({
          ...initialData,
          ...data,
        });
        toast.success("Member updated successfully");
      } else {
        // Ensure all required fields are properly typed
        const newMember: Omit<Member, "id"> = {
          first_name: data.name.split(" ")[0],
          last_name: data.name.split(" ")[1],
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          membershipType: data.membershipType,
          dateOfBirth: data.dateOfBirth,
          role: data.role,
          status: data.status,
          membershipStartDate: new Date().toISOString().split("T")[0],
        
        };
        console.log("stated for adding opertaion")
        console.log(newMember)
        await addMember(newMember);
        toast.success("Member added successfully");
      }
      navigate("/members");
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
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+91 98765 43210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Chennai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Tamil Nadu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="membershipType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Membership Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select membership type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Elite">Elite</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Annual Premium">Annual Premium</SelectItem>
                    <SelectItem value="Annual Basic">Annual Basic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Trainer">Trainer</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/members")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default MemberForm;
