import { Users2, MoreHorizontal, Plus, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Bell } from "lucide-react"

interface Club {
  id: string;
  name: string;
  description: string;
  members: number;
  events: any[];
  agenda: any[];
  achievements: any[];
}

interface ClubAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "high" | "medium" | "low";
  clubId: string;
}

interface ClubPerformance {
  id: string;
  clubId: string;
  metric: string;
  value: number;
  target: number;
  period: string;
}

interface ClubListProps {
  clubs: Club[];
  clubAnnouncements: ClubAnnouncement[];
  clubPerformance: ClubPerformance[];
  onAddClub: () => void;
  onEditClub: (club: Club) => void;
}

export default function ClubList({
  clubs,
  clubAnnouncements,
  clubPerformance,
  onAddClub,
  onEditClub,
}: ClubListProps) {
  return (
    <div className="space-y-4">
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-blue-700 dark:text-blue-400">Club Overview</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onAddClub}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Users2 className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-1" />
                <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {clubs.reduce((acc, club) => acc + club.members, 0)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Total Members</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <CalendarDays className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-1" />
                <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                  {clubs.reduce((acc, club) => acc + club.events.length, 0)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Total Events</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Clubs</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={onAddClub}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Club
                </Button>
              </div>
              {clubs.map((club) => (
                <div key={club.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <Users2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm">{club.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      {club.members} members
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEditClub(club)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-blue-700 dark:text-blue-400">Club Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clubPerformance.map((performance) => {
              const club = clubs.find((c) => c.id === performance.clubId);
              return (
                <div key={performance.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium">{club?.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{performance.period}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{performance.metric}</span>
                      <span className="font-medium">{performance.value}%</span>
                    </div>
                    <Progress
                      value={(performance.value / performance.target) * 100}
                      className="h-2"
                      indicatorClassName={performance.value >= performance.target ? "bg-green-600" : "bg-blue-600"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-blue-700 dark:text-blue-400">Club Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clubAnnouncements.map((announcement) => {
              const club = clubs.find((c) => c.id === announcement.clubId);
              return (
                <div key={announcement.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-sm">{announcement.title}</span>
                    <Badge
                      variant="secondary"
                      className={`ml-auto ${
                        announcement.priority === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                          : announcement.priority === "medium"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      }`}
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{announcement.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{club?.name}</span>
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 