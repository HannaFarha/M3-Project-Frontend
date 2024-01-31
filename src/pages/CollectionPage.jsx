import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Badge, Button, Group, SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { AuthContext } from '../contexts/AuthContext'; 

function CollectionPage() {
  const { width } = useViewportSize();
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState('');


  const fetchCollections = async () => {
    try {
      const tokenFromLocalStorage = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/coll/collections/`, 
        {headers: { Authorization: `Bearer ${tokenFromLocalStorage}`}}); 
      if (response.ok) {
        const collectionData = await response.json();
        setCollections(collectionData);
        console.log("Collections:", collections);
      } else {
        console.error('Failed to fetch collections:', response.status);
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (collections.length < 1 ) {
    return  <p> no vinyls to show</p>;
  }
  console.log(collections);

  return (
    <>
      <div className="authors-search-wrapper">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search in Vinyls"
        />
      </div>
      <div className="CollectionsListPage">
        <SimpleGrid cols={width > 1200 ? 3 : width > 800 ? 2 : 1}>
          {collections && collections.map((collection) => (
            collection.vinyl.map((vinylItem) => (
              <Link key={vinylItem._id} to={`/collection/${collection._id}`}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <img src={vinylItem.image} height={160} alt="Vinyl Cover" />
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} c="#252525">{vinylItem.artist} - {vinylItem.album}</Text>
                    <Badge color="pink">{vinylItem.types}</Badge>
                  </Group>
                  <Button color="blue" fullWidth mt="md" radius="md">
                    View Vinyl Details
                  </Button>
                </Card>
              </Link>
            ))
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}

export default CollectionPage;
