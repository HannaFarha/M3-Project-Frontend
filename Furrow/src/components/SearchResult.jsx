import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import VinylCard from "./VinylCard";
import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";

const SearchResults = () => {
  const { width } = useViewportSize();
  const [filteredVinyls, setFilteredVinyls] = useState([]);

  const fetchVinyls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls`);
      if (response.ok) {
        const vinylData = await response.json();
        setFilteredVinyls(vinylData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchVinyls();
  }, []);

  return (
    <div>
      <h1>Search Results</h1>
      <div className="VinylsListPage">
        <SimpleGrid cols={width > 1200 ? 3 : width > 800 ? 2 : 1}>
          {filteredVinyls.map((vinyl) => (
            <Link key={vinyl._id} to={`/vinyls/${vinyl._id}`}>
              <VinylCard
                artist={vinyl.artist}
                album={vinyl.album}
                image={vinyl.image}
                types={vinyl.types}
              />
            </Link>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default SearchResults;
