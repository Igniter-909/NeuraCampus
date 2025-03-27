"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Image, Video, Bold, Italic, List, ListOrdered, Link2, Code2, X } from "lucide-react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { Toggle } from "@/components/ui/toggle"

interface CreatePostFormProps {
  onCreatePost: (postData: any) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-1 mb-2">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Code"
      >
        <Code2 className="h-4 w-4" />
      </Toggle>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const url = window.prompt('Enter URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        className={editor.isActive('link') ? 'is-active' : ''}
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function CreatePostForm({ onCreatePost }: CreatePostFormProps) {
  const [category, setCategory] = useState("general")
  const [mediaFiles, setMediaFiles] = useState<{ type: "image" | "video"; url: string }[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'What\'s on your mind?',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 cursor-pointer',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[100px] p-4',
      },
    },
  })

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const fileType = file.type.startsWith("image/") ? "image" : "video"
      const url = URL.createObjectURL(file)
      setMediaFiles(prev => [...prev, { type: fileType, url }])
    })
  }

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!editor?.getHTML() && mediaFiles.length === 0) return

    onCreatePost({
      content: editor?.getHTML() || '',
      category,
      media: mediaFiles,
      author: "John Doe", // Replace with actual user
      authorImage: "/placeholder.jpg", // Replace with actual user image
    })

    // Reset form
    editor?.commands.clearContent()
    setCategory("general")
    setMediaFiles([])
    setIsExpanded(false)
  }

  return (
    <Card className="p-4 bg-background/60 backdrop-blur-sm border-input hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-colors">
      <div className="space-y-4">
        {!isExpanded ? (
          <div
            onClick={() => setIsExpanded(true)}
            className="cursor-text p-2 rounded-md bg-muted/50 text-muted-foreground"
          >
            What's on your mind?
          </div>
        ) : (
          <>
            <div className="border rounded-md">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
            </div>

            {/* Media Preview */}
            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    {file.type === "image" ? (
                      <img
                        src={file.url}
                        alt="Preview"
                        className="rounded-md w-full h-48 object-cover"
                      />
                    ) : (
                      <video
                        src={file.url}
                        className="rounded-md w-full h-48 object-cover"
                        controls
                      />
                    )}
                    <button
                      onClick={() => removeMedia(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove media"
                      aria-label="Remove media"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleMediaUpload}
                accept="image/*,video/*"
                className="hidden"
                multiple
                id="media-upload"
                title="Upload media"
                aria-label="Upload photos or videos"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-500 dark:text-blue-400"
              >
                <Image className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-500 dark:text-blue-400"
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="ml-auto px-3 py-1 rounded-md bg-muted/50 border border-input text-sm"
                id="post-category"
                title="Select post category"
                aria-label="Post category"
              >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="jobs">Jobs</option>
                <option value="internships">Internships</option>
                <option value="projects">Projects</option>
              </select>

              <Button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white ml-2"
              >
                Post
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

