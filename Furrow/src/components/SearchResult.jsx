import React from "react";
import { Link } from "react-router-dom"; 
import VinylCard from "./VinylCard";
import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";

const SearchResults = ({ vinyls }) => {
  const { width } = useViewportSize();

  return (
    <div id="searchResults" className="VinylsListPage">
      <SimpleGrid cols={width > 1200 ? 3 : width > 800 ? 2 : 1}>
        {vinyls.map((vinyl) => (
          <Link key={vinyl.id} to={`/vinylDetail/${vinyl.id}`}>
            <VinylCard
              key={vinyl.id}
              artiste={vinyl.artiste}
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