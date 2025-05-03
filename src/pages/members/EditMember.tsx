
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import MemberForm from "@/components/members/MemberForm";
import { Member } from "@/types";
import { fetchMember } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const EditMember = () => {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMember = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchMember(parseInt(id));
        if (data) {
          setMember(data);
        } else {
          toast.error("Member not found");
        }
      } catch (error) {
        console.error("Failed to load member:", error);
        toast.error("Failed to load member");
      } finally {
        setIsLoading(false);
      }
    };

    loadMember();
  }, [id]);

  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/members" className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Members
        </Link>
        <h1 className="text-2xl font-bold">Edit Member</h1>
        <p className="text-muted-foreground">Update member information</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading member data...</p>
        </div>
      ) : member ? (
        <div className="border rounded-lg p-6 bg-white">
          <MemberForm initialData={member} isEdit={true} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Member not found</p>
        </div>
      )}
    </MainLayout>
  );
};

export default EditMember;
