import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
      <Link href="/tasks" className="text-blue-600 hover:underline">
        Go to Tasks
      </Link>
    </main>
  )
}
