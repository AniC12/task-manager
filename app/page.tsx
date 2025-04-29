import Link from 'next/link';
import Card from './components/Card';

export default function HomePage() {
  return (
    <Card>
      <h1 className="mb-6 text-4xl font-bold">Welcome to Task Manager</h1>
      <Link href="/tasks" className="text-blue-600 hover:underline">
        Go to Tasks
      </Link>
    </Card>
  );
}
