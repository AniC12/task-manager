'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Task = { id: string; title: string; notes: string };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(stored);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks List</h1>

      {tasks.length === 0 ? (
        <p className="mb-4">You don’t have any tasks yet.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="rounded border p-4 shadow-sm bg-white"
            >
              <h2 className="font-semibold">{task.title}</h2>
              {task.notes && <p className="text-sm text-gray-600">{task.notes}</p>}
            </li>
          ))}
        </ul>
      )}

      <Link href="/tasks/new" className="text-blue-600 hover:underline">
        Add New Task
      </Link>
    </main>
  );
}
