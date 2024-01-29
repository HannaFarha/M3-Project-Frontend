import React, { useState, useEffect, useRef } from 'react';

const SearchForm = () => {
  const [keywords, setKeywords] = useState([]);
  // const [yearFilter, setYearFilter] = useState('');
  const [types, setTypes] = useState({
    Jazz: false,
    Rock: false,
    Electronic: false,
    Funk: false,
    'Hip-hop': false
  });
  const [vinyls, setVinyls] = useState([]);
  const [filteredVinyls, setFilteredVinyls] = useState([]);

  const fetchVinyls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls`);
      if (response.ok) {
        const vinylData = await response.json();
        setVinyls(vinylData);
        if (!filteredVinyls.length) {
          setFilteredVinyls(vinylData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateFilteredVinyls = (searchCriteria) => {
    const filtered = vinyls.filter((vinyl) => {
      const artists = (vinyl.extendedArtists || []).map((artist) => artist.original);
      const hasKeywords = searchCriteria.keywords.every((keyword) =>
        artists.some((artist) => artist.toLowerCase().includes(keyword.toLowerCase()))
      );

      const hasTypes = searchCriteria.types.every((type) => {
        if (Array.isArray(vinyl.types)) {
          return vinyl.types.includes(type);
        }
        return false;
      });
      return hasKeywords && hasTypes;
    });
    console.log('Filtered Vinyls:', filtered);
    setFilteredVinyls(filtered);
  };

  useEffect(() => {
    fetchVinyls();
  }, []);

  const searchResultsRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchCriteria = {
      keywords,
      // yearFilter: setYearFilter
      types: Object.keys(types).filter((type) => types[type])
    };

    console.log('Search Criteria:', searchCriteria);

    updateFilteredVinyls(searchCriteria);
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
    setKeywords([...keywords, e.target.keyword.value]);
    e.target.keyword.value = '';
  };

  const handleDeleteKeyword = (index) => {
    const updatedKeywordsList = [...keywords];
    updatedKeywordsList.splice(index, 1);
    setKeywords(updatedKeywordsList);
  };

  const handleTypes = (type) => {
    setTypes((prevTypes) => ({ ...prevTypes, [type]: !prevTypes[type] }));
  };

  const typesLabels = {
    Jazz: 'Jazz',
    Rock: 'Rock',
    Electronic: 'Electronic',
    Funk: 'Funk',
    'Hip-hop': 'Hip-hop'
  };

  return (
    <div>
      <div>
        <h1>Find pepita</h1>
      </div>
      <div>
        <form onSubmit={handleKeywordSubmit}>
          <div>
            <input type="text" name="keyword" placeholder="Search pepita" />
            <button type="submit">Add</button>
          </div>
          <div>
            {keywords.map((keyword, index) => (
              <div key={index}>
                {keyword} <button onClick={() => handleDeleteKeyword(index)}>X</button>
              </div>
            ))}
          </div>
        </form>
        <div>
          <div>
            Any specific types of music?
            {Object.keys(types).map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={types[type]}
                  onChange={() => handleTypes(type)}
                />
                {typesLabels[type] || type}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" onClick={handleSearch}>
          Search for Vinyls ideas
        </button>
      </div>
      <div ref={searchResultsRef}></div>
    </div>
  );
};

export default SearchForm;
