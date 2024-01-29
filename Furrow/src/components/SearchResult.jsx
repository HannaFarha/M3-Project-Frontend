// SearchResult.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import VinylCard from './VinylCard';
import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

const SearchResults = ({ vinyls }) => {
  const { width } = useViewportSize();

  return (
    <div>
      <h1>Search Results</h1>
      <div className="VinylsListPage">
        <SimpleGrid cols={width > 1200 ? 3 : width > 800 ? 2 : 1}>
          {vinyls && vinyls.length > 0 ? (
            vinyls.map((vinyl) => (
              <Link key={vinyl._id} to={`/vinyl/${vinyl._id}`}>
                <VinylCard
                  artist={vinyl.artist}
                  album={vinyl.album}
                  image={vinyl.image}
                  types={vinyl.types}
                />
              </Link>
            ))
          ) : (
            <p>No vinyls found</p>
          )}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default SearchResults;
