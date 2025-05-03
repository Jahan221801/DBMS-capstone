
import MainLayout from "@/components/layout/MainLayout";
import MemberForm from "@/components/members/MemberForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddMember = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/members" className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Members
        </Link>
        <h1 className="text-2xl font-bold">Add New Member</h1>
        <p className="text-muted-foreground">Create a new member profile</p>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <MemberForm />
      </div>
    </MainLayout>
  );
};

export default AddMember;
