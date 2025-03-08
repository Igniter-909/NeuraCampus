import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingActionButtonProps {
  onSave: () => void
  onDiscard: () => void
}

export default function FloatingActionButton({ onSave, onDiscard }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white rounded-full shadow-lg p-1 z-50 border">
      <Button
        onClick={onSave}
        size="sm"
        className="rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white flex items-center gap-1 px-4"
      >
        <Check className="h-4 w-4" />
        <span>Save changes</span>
      </Button>

      <Button onClick={onDiscard} size="sm" variant="outline" className="rounded-full flex items-center gap-1 px-4">
        <X className="h-4 w-4" />
        <span>Discard</span>
      </Button>
    </div>
  )
}

