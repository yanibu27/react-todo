import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import type { Todo } from "../types/todo";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

type TodoItemProps = {
  todo: Todo;
  onEdit: (id: string, title: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    onEdit(todo._id, editTitle, todo.completed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onEdit(todo._id, todo.title, !todo.completed);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-3 p-4 bg-card rounded-lg border shadow-sm">
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="flex-1"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" variant="default">
            <Check className="h-4 w-4" />
          </Button>
          <Button onClick={handleCancel} size="sm" variant="outline">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggleComplete}
        className="shrink-0"
      />
      <span 
        className={cn(
          "flex-1 text-sm",
          todo.completed && "line-through text-muted-foreground"
        )}
      >
        {todo.title}
      </span>
      <div className="flex gap-2">
        <Button
          onClick={() => setIsEditing(true)}
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onDelete(todo._id)}
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
