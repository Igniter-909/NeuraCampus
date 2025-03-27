"use client"

import { useState, useEffect } from "react"
import GradeOverview from "@/components/role-specific/student/grades/GradeOverview"
import GradeFilters from "@/components/role-specific/student/grades/GradeFilters"
import GradeTable from "@/components/role-specific/student/grades/GradeTable"

// Sample grades data
const grades = [
  {
    id: 1,
    courseCode: "CSE101",
    courseName: "Introduction to Programming",
    semester: "1st Semester",
    year: "1st Year",
    credits: 4,
    grade: "A",
    gradePoints: 9,
    status: "Pass",
  },
  {
    id: 2,
    courseCode: "CSE201",
    courseName: "Data Structures",
    semester: "2nd Semester",
    year: "1st Year",
    credits: 4,
    grade: "B+",
    gradePoints: 8,
    status: "Pass",
  },
  {
    id: 3,
    courseCode: "CSE301",
    courseName: "Database Management Systems",
    semester: "3rd Semester",
    year: "2nd Year",
    credits: 3,
    grade: "B",
    gradePoints: 7,
    status: "Pass",
  },
  {
    id: 4,
    courseCode: "CSE401",
    courseName: "Artificial Intelligence",
    semester: "5th Semester",
    year: "3rd Year",
    credits: 4,
    grade: "A+",
    gradePoints: 10,
    status: "Pass",
  },
  {
    id: 5,
    courseCode: "CSE501",
    courseName: "Web Development",
    semester: "5th Semester",
    year: "3rd Year",
    credits: 3,
    grade: "C+",
    gradePoints: 6,
    status: "Pass",
  },
  {
    id: 6,
    courseCode: "CSE601",
    courseName: "Machine Learning",
    semester: "6th Semester",
    year: "3rd Year",
    credits: 4,
    grade: "In Progress",
    gradePoints: 0,
    status: "In Progress",
  },
]

export default function GradesPage() {
  const [filteredGrades, setFilteredGrades] = useState(grades)
  const [sortOption, setSortOption] = useState("none")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")

  // Calculate grade statistics
  const calculateStats = () => {
    const completedGrades = grades.filter((grade) => grade.status !== "In Progress")
    const totalCredits = completedGrades.reduce((sum, grade) => sum + grade.credits, 0)
    const completedCredits = completedGrades.reduce((sum, grade) => sum + grade.credits, 0)
    const totalGradePoints = completedGrades.reduce((sum, grade) => sum + grade.gradePoints, 0)
    const averageGradePoints = totalGradePoints / completedGrades.length

    // Convert grade points to letter grade
    const getLetterGrade = (points: number) => {
      if (points >= 9.5) return "A+"
      if (points >= 9) return "A"
      if (points >= 8.5) return "B+"
      if (points >= 8) return "B"
      if (points >= 7.5) return "C+"
      if (points >= 7) return "C"
      if (points >= 6) return "D"
      return "F"
    }

    return {
      cgpa: (totalGradePoints / completedGrades.length).toFixed(2),
      totalCredits,
      completedCredits,
      averageGrade: getLetterGrade(averageGradePoints),
    }
  }

  // Handle filter changes
  const handleFilterChange = () => {
    let result = [...grades]

    // Apply semester filter
    if (semesterFilter !== "all") {
      result = result.filter((grade) => grade.semester === semesterFilter)
    }

    // Apply year filter
    if (yearFilter !== "all") {
      result = result.filter((grade) => grade.year === yearFilter)
    }

    // Apply sorting
    if (sortOption === "grade") {
      result.sort((a, b) => b.gradePoints - a.gradePoints)
    } else if (sortOption === "credits") {
      result.sort((a, b) => b.credits - a.credits)
    } else if (sortOption === "semester") {
      result.sort((a, b) => {
        const semesterOrder = ["6th", "5th", "4th", "3rd", "2nd", "1st"]
        return semesterOrder.indexOf(b.semester.split(" ")[0]) - semesterOrder.indexOf(a.semester.split(" ")[0])
      })
    }

    setFilteredGrades(result)
  }

  // Apply filters when filter options change
  useEffect(() => {
    handleFilterChange()
  }, [semesterFilter, yearFilter, sortOption])

  const stats = calculateStats()

  return (
    <div className="container mx-auto p-4 max-w-7xl bg-transparent min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Academic Grades</h1>

      {/* Grade Overview */}
      <GradeOverview
        cgpa={parseFloat(stats.cgpa)}
        totalCredits={stats.totalCredits}
        completedCredits={stats.completedCredits}
        averageGrade={stats.averageGrade}
      />

      {/* Filters */}
      <GradeFilters
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onFilterChange={handleFilterChange}
      />

      {/* Grades Table */}
      <GradeTable grades={filteredGrades} />
    </div>
  )
}