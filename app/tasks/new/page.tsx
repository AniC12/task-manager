'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function saveTask(task: { id: string; title: string; notes: string }) {
  const existing = JSON.parse(localStorage.getItem('tasks') || '[]');
  localStorage.setItem('tasks', JSON.stringify([...existing, task]));
}

export default function NewTaskPage() {
  const [title, setTitle]   = useState('');
  const [notes, setNotes]   = useState('');
  const router              = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    saveTask({ id: crypto.randomUUID(), title, notes });
    router.push('/tasks');
  }

  return (
    <main className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="Buy groceries"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Notes (optional)</label>
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
          Save Task
        </button>
      </form>

      <Link href="/tasks" className="block mt-6 text-blue-600 hover:underline">
        ← Back to tasks
      </Link>
    </main>
  );
}
