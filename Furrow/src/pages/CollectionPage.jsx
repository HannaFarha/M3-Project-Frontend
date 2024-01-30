import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Badge, Button, Group, SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { AuthContext } from '../contexts/AuthContext'; // Importez le contexte d'authentification

function CollectionPage() {
  const { width } = useViewportSize();
  const { fetchWithToken } = useContext(AuthContext); // Utilisez le contexte d'authentification pour accéder à fetchWithToken
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCollections = async () => {
    try {
      const response = await fetchWithToken('/collection'); // Utilisez fetchWithToken pour envoyer la requête avec le token JWT attaché
      if (response.ok) {
        const collectionData = await response.json();
        setCollections(collectionData);
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
          {collections && collections.length > 0 ? (
            collections
              .filter((collection) => collection.vinyl.artist.toLowerCase().includes(search.toLowerCase()))
              .map((collection) => (
                <Link key={collection._id} to={`/collection/${collection._id}`}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <img src={collection.vinyl.image} height={160} alt="Vinyl Cover" />
                    </Card.Section>
                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500} c="#252525">{collection.vinyl.artist} - {collection.vinyl.album}</Text>
                      <Badge color="pink">{collection.vinyl.types}</Badge>
                    </Group>
                    <Button color="blue" fullWidth mt="md" radius="md">
                      View Vinyl Details
                    </Button>
                  </Card>
                </Link>
              ))
          ) : (
            <p>No collections found</p>
          )}
        </SimpleGrid>
      </div>
    </>
  );
}

export default CollectionPage;
