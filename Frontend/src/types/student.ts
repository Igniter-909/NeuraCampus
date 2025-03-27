export interface Student {
  id: string
  name: string
  image: string
  enrollmentNumber: string
  department: string
  program: string
  year: string
  semester: string
  status: "Active" | "Inactive"
  attendance: number
  cgpa: number
  email: string
  phone: string
  dob: string
  gender: string
  address: string
  feePaid: boolean
  feeAmount: string
  feePending: string
} 