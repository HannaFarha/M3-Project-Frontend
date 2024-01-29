import React from "react";
import { Link } from "react-router-dom";
import VinylCard from "./VinylCard";
import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";
import { useState, useEffect } from 'react'

const SearchResults = () => {
  const { width } = useViewportSize();

  const [vinyls, setVinyls] = useState([])

  const fetchVinyls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls`)
      if (response.ok) {
        const vinylData = await response.json()
        setVinyls(vinylData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVinyls()
  }, [])

  return (

    <div> <h1> Search </h1>
    <div id="searchResults" className="VinylsListPage">
      <SimpleGrid cols={width > 1200 ? 3 : width > 800 ? 2 : 1}>
        {vinyls.map((vinyl) => (
          <Link key={vinyl.id} to={`/vinylDetail/${vinyl.id}`}>
            <VinylCard
              key={vinyl.id}
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
