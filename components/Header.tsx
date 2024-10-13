"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaSpotify } from 'react-icons/fa';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <FaSpotify className="mr-2" />
          Spotify Ranking
        </Link>
        <nav>
          {session ? (
            <div className="flex items-center space-x-4">
              <span>Hello, {session.user.name}</span>
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          ) : (
            <Button onClick={() => signIn('spotify')}>Sign in</Button>
          )}
        </nav>
      </div>
    </header>
  );
}