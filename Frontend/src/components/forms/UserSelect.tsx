'use client'
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Control, useController } from "react-hook-form";
import { apiClient } from "@/lib/api";

interface User {
  id: string;
  name: string;
  role: string;
}

interface UserSelectProps {
  name: string;
  control: Control<any>;
  collegeId: string;
  role?: string;
  placeholder?: string;
  errorMessage?: string;
}

export function UserSelect({ 
  name, 
  control, 
  collegeId, 
  role = 'FACULTY',
  placeholder = "Select user...",
  errorMessage 
}: UserSelectProps) {
  const { field } = useController({ name, control });
  const [users, setUsers] = React.useState<User[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiClient.get(`/colleges/${collegeId}/users?role=${role}`);
      setUsers(response.data);
    };
    fetchUsers();
  }, [collegeId, role]);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {field.value
              ? users.find((user: User) => user.id === field.value)?.name
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search users..." />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user:User) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={() => {
                    field.onChange(user.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.name}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({user.role})
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
