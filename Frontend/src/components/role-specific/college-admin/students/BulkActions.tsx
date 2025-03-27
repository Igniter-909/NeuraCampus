"use client"

import { Users, Download, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BulkActionsProps {
  onPromote: () => void
  onExportCSV: () => void
  onExportPDF: () => void
  onSendEmail: () => void
}

export default function BulkActions({ onPromote, onExportCSV, onExportPDF, onSendEmail }: BulkActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="gap-2" onClick={onPromote}>
            <Users className="h-4 w-4" />
            Promote
          </Button>
          <Button variant="outline" className="gap-2" onClick={onExportCSV}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" className="gap-2" onClick={onExportPDF}>
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="gap-2" onClick={onSendEmail}>
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 