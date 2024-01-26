import React from "react";
import { Link } from "react-router-dom";
import VinylCard from "./VinylCard";
import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";

const SearchResults = () => {
  const { width } = useViewportSize();

  // Définition des données fictives directement dans le composant
  const vinyls = [
    { id: 1, artist: 'Max', album: 'Album 1', image: 'https://content.discogs.com/media/green-day-saviors-300x300.jpeg', type: ['Techno'] },
    { id: 2, artist: 'Hanna', album: 'Album 2', image: 'https://content.discogs.com/media/Kid-Cudi-%E2%80%8E%E2%80%93-Insano-300x300.jpeg', type: ['Jazz'] },
  ];

  return (
    <div id="searchResults" className="VinylsListPage">
      <SimpleGrid cols={width > 1200 ? 3 : width > 800 ? 2 : 1}>
        {vinyls.map((vinyl) => (
          <Link key={vinyl.id} to={`/vinylDetail/${vinyl.id}`}>
            <VinylCard
              key={vinyl.id}
              artist={vinyl.artist}
              album={vinyl.album}
              image={vinyl.image}
              type={vinyl.type}
            />
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default SearchResults;
