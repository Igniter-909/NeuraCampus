import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Club {
  id: string;
  name: string;
  description: string;
  members: number;
  events: any[];
  agenda: any[];
  achievements: any[];
  category?: string;
  facultyAdvisor?: string;
  meetingSchedule?: string;
}

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Club, "id" | "members" | "events" | "agenda" | "achievements">) => void;
  club?: Club;
  mode: "add" | "edit";
}

export default function ClubModal({ isOpen, onClose, onSubmit, club, mode }: ClubModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    facultyAdvisor: "",
    meetingSchedule: "",
  });

  useEffect(() => {
    if (club) {
      setFormData({
        name: club.name,
        description: club.description,
        category: club.category || "",
        facultyAdvisor: club.facultyAdvisor || "",
        meetingSchedule: club.meetingSchedule || "",
      });
    }
  }, [club]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Club" : "Edit Club"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Create a new club by filling out the form below." : "Update club information below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Club Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="facultyAdvisor">Faculty Advisor</Label>
            <Input
              id="facultyAdvisor"
              value={formData.facultyAdvisor}
              onChange={(e) => setFormData({ ...formData, facultyAdvisor: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meetingSchedule">Meeting Schedule</Label>
            <Input
              id="meetingSchedule"
              value={formData.meetingSchedule}
              onChange={(e) => setFormData({ ...formData, meetingSchedule: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button type="submit">{mode === "add" ? "Create Club" : "Update Club"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 