'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '../components/Card';

type Task = { id: string; title: string; notes: string; completed: boolean };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // read tasks once on mount
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }, []);

  // toggle handler
  function toggleDone(id: string) {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  }

  function deleteTask(id: string) {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  }


  return (
    <Card>
      <h1 className="text-3xl font-bold mb-6">Tasks List</h1>

      {tasks.length === 0 ? (
        <p className="mb-4">You don’t have any tasks yet.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {tasks.map(t => (
            <li
              key={t.id}
              className="flex items-start gap-3 rounded border p-4 shadow-sm
           bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleDone(t.id)}
                className="mt-1 accent-blue-600"
              />
              <div className={t.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : ''}>
                <h2 className="font-semibold">{t.title}</h2>
                {t.notes && <p className="text-sm">{t.notes}</p>}
              </div>

              <Link
                href={`/tasks/${t.id}/edit`}
                aria-label='Edit task'
                className='text-blue-500 hover:text-blue-700'
              >
                ✎
              </Link>
              <button
                onClick={() => deleteTask(t.id)}
                aria-label="Delete task"
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link href="/tasks/new" className="text-blue-600 hover:underline">
        Add New Task
      </Link>
    </Card>
  );
}
