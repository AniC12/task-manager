'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Task = { id: string; title: string; notes: string; completed: boolean };

export default function EditTaskPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  // load the task once
  useEffect(() => {
    const stored: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const found = stored.find(t => t.id === id);
    if (!found) {
      router.push('/tasks'); // invalid id → go back
      return;
    }
    setTask(found);
    setTitle(found.title);
    setNotes(found.notes);
  }, [id, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!task) return;

    const updatedTask = { ...task, title, notes };
    const all: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const merged = all.map(t => (t.id === id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(merged));

    router.push('/tasks');
    router.refresh(); // re-render list page
  }

  if (!task) return null; // simple loading state

  return (
    <main className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 h-24"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>

      <Link href="/tasks" className="block mt-6 text-blue-600 hover:underline">
        ← Back to tasks
      </Link>
    </main>
  );
}
