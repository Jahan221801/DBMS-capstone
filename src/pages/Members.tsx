
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMembers } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import MemberCard from "@/components/members/MemberCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Member } from "@/types";
import { Plus, Search, Users } from "lucide-react";
import { toast } from "sonner";

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadMembers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMembers();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error("Failed to load members:", error);
      toast.error("Failed to load members from database");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMembers(members);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.phone.toLowerCase().includes(query) ||
        member.city.toLowerCase().includes(query)
    );

    setFilteredMembers(filtered);
  }, [searchQuery, members]);

  const handleMemberDeleted = () => {
    loadMembers();
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-muted-foreground">Manage gym members, trainers, and admins</p>
        </div>

        <Button asChild>
          <Link to="/members/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Member
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">All Roles</Button>
        <Button variant="outline">More Filters</Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading members from database...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No members found</h3>
          <p className="text-muted-foreground mb-4">Add your first member to get started</p>
          <Button asChild>
            <Link to="/members/new">Add New Member</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard 
              key={member.id} 
              member={member} 
              onMemberDeleted={handleMemberDeleted}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Members;
