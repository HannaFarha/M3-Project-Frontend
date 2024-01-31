import React, { useState, useEffect,useContext } from 'react';
import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import VinylCard from '../components/VinylCard';
import { AuthContext } from '../contexts/AuthContext';


function VinylsPage() {
  const { width } = useViewportSize();
  const [vinyls, setVinyls] = useState([]);
  const [search, setSearch] = useState('');
  const { isAuthenticated, fetchWithToken, userId } = useContext(AuthContext);
  
  const fetchVinyls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls`);
      if (response.ok) {
        const vinylData = await response.json();
        setVinyls(vinylData);
        console.log(vinylData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCollection = async (vinylId) => {

    try {
     /* const vinylResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyl/${vinylId}`);
      if (!vinylResponse.ok) {
        throw new Error('Failed to fetch vinyl details');
      }
      const vinylData = await vinylResponse.json();
      */
      const authToken = localStorage.getItem("authToken")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/coll/collection/${vinylId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization :`Bearer ${authToken} ` },
        body: JSON.stringify({ userId })
      });
  
      if (response.ok) {
        console.log('Vinyl added to collection');
      }
    } catch (error) {
      console.error('Error while adding vinyl to collection:', error);
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
    .filter((vinyl) => vinyl.album.toLowerCase().includes(search.toLowerCase()))
    .map((vinyl) => (
      <VinylCard
        key={vinyl._id} 
        artist={vinyl.artist}
        vinyl={vinyl}
        album={vinyl.album}
        image={vinyl.image}
        types={vinyl.types}
        onAddToCollection={() => addToCollection(vinyl._id)}
      />
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
