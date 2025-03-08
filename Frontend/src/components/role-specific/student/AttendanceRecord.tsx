// src/components/role-specific/student/AttendanceRecord.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { apiClient } from '@/lib/api';

interface AttendanceData {
  subjectId: string;
  subjectName: string;
  attendedClasses: number;
  totalClasses: number;
  percentage: number;
}

interface AttendanceRecordProps {
  studentId: string;
}

export default function AttendanceRecord({ studentId }: AttendanceRecordProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [view, setView] = useState('current');
  
  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/students/${studentId}/attendance?semester=${view}`);
        setAttendanceData(response.data);
      } catch (err) {
        setError('Failed to load attendance data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAttendance();
  }, [studentId, view]);
  
  // Calculate overall attendance
  const overallAttendance = attendanceData.length
    ? attendanceData.reduce((sum, subject) => sum + subject.percentage, 0) / attendanceData.length
    : 0;
  
  const getAttendanceColor = (percentage: number) => {
    if (percentage < 75) return 'bg-red-500';
    if (percentage < 85) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Attendance Record</CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="current" onValueChange={setView}>
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Semester</TabsTrigger>
            <TabsTrigger value="all">All Semesters</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : attendanceData.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No attendance records found</div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Overall Attendance</div>
                  <div className={`text-sm font-medium ${
                    overallAttendance < 75 ? 'text-red-500' : 
                    overallAttendance < 85 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {overallAttendance.toFixed(1)}%
                  </div>
                </div>
                <Progress 
                  value={overallAttendance} 
                  className={getAttendanceColor(overallAttendance)}
                />
              </div>
              
              <div className="space-y-3">
                {attendanceData.map((subject) => (
                  <div key={subject.subjectId}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm">{subject.subjectName}</div>
                      <div className={`text-xs font-medium ${
                        subject.percentage < 75 ? 'text-red-500' : 
                        subject.percentage < 85 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {subject.attendedClasses}/{subject.totalClasses} ({subject.percentage.toFixed(1)}%)
                      </div>
                    </div>
                    <Progress 
                      value={subject.percentage} 
                      className={getAttendanceColor(subject.percentage)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Tabs>
    </Card>
  );
}