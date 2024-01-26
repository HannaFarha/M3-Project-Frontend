import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { MultiSelect, Select } from '@mantine/core';

const NewVinyl = () => {
  const { fetchWithToken, userId } = useContext(AuthContext)
  const navigate = useNavigate()
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [year, setYear] = useState('')
  const [types, setTypes] = useState('')
  const [condition, setCondition] = useState('')
  const [image, setImage] = useState('');


  const handleSubmit = async event => {
    event.preventDefault()
    const vinylToCreate = { artist, album, year, types, condition }

    try {
      const response = await fetchWithToken('/vinyls', 'POST', vinylToCreate)
      if (response.status === 201) {
        const vinyl = await response.json()
        console.log(vinyl)
        navigate(`/vinyl/${vinyl._id}`)
      } else {
        console.log('Something went wrong')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>New Vinyl</h1>
      <form
        onSubmit={handleSubmit}
        action='submit'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor='album'>Album:</label>
        <input
          type='text'
          id='album'
          value={album}
          onChange={event => setAlbum(event.target.value)}
        />

        <label htmlFor='artist'>Artist:</label>
        <input
          type='text'
          id='artist'
          value={artist}
          onChange={event => setArtist(event.target.value)}
        />

        <label htmlFor='year'>Year:</label>
        <input
          type='text'
          id='year'
          value={year}
          onChange={event => setYear(event.target.value)}
        />
        <label htmlFor='types'>Year:</label>
        <input
          type='text'
          id='types'
          value={types}
          onChange={event => setTypes(event.target.value)}
        />
        <label htmlFor='condition'>Year:</label>
        <input
          type='text'
          id='condition'
          value={condition}
          onChange={event => setCondition(event.target.value)}
        />
       
        
       <label htmlFor='types'>Types:</label>
         <MultiSelect
        value={types}
      data={['Jazz', 'Rock', 'Electronic', 'Hip-hop', 'Funk']}
         />
        <label htmlFor='condition'>Condition:</label>
        <Select
            value={condition}

      data={['Mint', 'VeryGood', 'Fair']}
       />
      

        <button type='submit'>SUBMIT</button>
      </form>
    </>
  )
}

export default NewVinyl
