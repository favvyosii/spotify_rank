"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaSpotify, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    if (session) {
      fetchTopItems();
    }
  }, [session]);

  const fetchTopItems = async () => {
    try {
      const tracksRes = await fetch('/api/spotify/top-tracks');
      const artistsRes = await fetch('/api/spotify/top-artists');
      const genresRes = await fetch('/api/spotify/top-genres');

      const tracks = await tracksRes.json();
      const artists = await artistsRes.json();
      const genres = await genresRes.json();

      setTopTracks(tracks);
      setTopArtists(artists);
      setTopGenres(genres);
    } catch (error) {
      console.error('Error fetching top items:', error);
      toast.error('Failed to fetch your Spotify data');
    }
  };

  const downloadImage = async (imageUrl, name) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download the image');
    }
  };

  if (!session) {
    return <div>Please sign in to view your Spotify stats.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Spotify Stats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {topTracks.slice(0, 5).map((track, index) => (
                <li key={track.id} className="flex items-center justify-between mb-2">
                  <span>{index + 1}. {track.name}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadImage(track.album.images[0].url, track.name)}
                  >
                    <FaDownload className="mr-2" />
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Artists</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {topArtists.slice(0, 5).map((artist, index) => (
                <li key={artist.id} className="mb-2">
                  {index + 1}. {artist.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {topGenres.slice(0, 5).map((genre, index) => (
                <li key={genre} className="mb-2">
                  {index + 1}. {genre}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}