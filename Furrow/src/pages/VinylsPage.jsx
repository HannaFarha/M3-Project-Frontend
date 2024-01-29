import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VinylCard from '../components/VinylCard';
import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

function VinylsPage() {
  const { width } = useViewportSize();
  const [vinyls, setVinyls] = useState([]);
  const [search, setSearch] = useState('');

  const fetchVinyls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls`);
      if (response.ok) {
        const vinylData = await response.json();
        setVinyls(vinylData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVinyls();
  }, []);

  return (
    <>
      <div className="authors-search-wrapper">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search in Type"
        />
      </div>
      <div className="VinylsListPage">
        <SimpleGrid cols={width > 1200 ? 3 : width > 800 ? 2 : 1}>
          {vinyls && vinyls.length > 0 ? (
            vinyls
              .filter((vinyl) => vinyl.artist.toLowerCase().includes(search.toLowerCase()))
              .map((vinyl) => (
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
    </>
  );
}

export default VinylsPage;
