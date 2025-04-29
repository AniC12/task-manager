'use client';
import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm
                    dark:border-gray-700 dark:bg-gray-800">
      {children}
    </div>
  );
}
