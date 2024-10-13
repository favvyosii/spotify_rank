'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Spotify Ranking</h1>
      <p className="text-xl mb-8 text-center">
        Discover your most listened songs, artists, and genres on Spotify.
      </p>
      <div className="flex justify-center">
        {!session ? (
          <Link href="/api/auth/signin">
            <Button size="lg">Sign in with Spotify</Button>
          </Link>
        ) : (
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  );
}