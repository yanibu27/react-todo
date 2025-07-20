import React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type AddTodoProps = {
  onAdd: (title: string) => void;
};

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Todo List</h1>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="text"
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
        </Button>
      </form>
    </div>
  );
}
