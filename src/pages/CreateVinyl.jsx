import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Select } from '@mantine/core';
import classes from '../styles/CreateVinyl.module.css';

const NewVinyl = () => {
  const { fetchWithToken, userId } = useContext(AuthContext)
  const navigate = useNavigate()
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [year, setYear] = useState('')
  const [types, setTypes] = useState('');
  const [condition, setCondition] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault()
  
    
  
    const vinylToCreate = { artist, album, year, types: types, condition, image } 
  
    try {
      const response = await fetchWithToken('/vinyls', 'POST', vinylToCreate)
      if (response.status === 201) {
        const vinyl = await response.json()
        console.log(vinyl)
        navigate(`/vinyls/${vinyl._id}`)
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
        className={classes.form}
        onSubmit={handleSubmit}
        action='submit'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor='album'>Album:</label>
        <input
         className={classes.inputo}
          type='text'
          id='album'
          value={album}
          onChange={event => setAlbum(event.target.value)}
        />

        <label htmlFor='artist'>Artist:</label>
        <input
         className={classes.inputo}
         type='text'
          id='artist'
          value={artist}
          onChange={event => setArtist(event.target.value)}
        />

        <label htmlFor='year'>Year:</label>
        <input
         className={classes.inputo}
         type='text'
          id='year'
          value={year}
          onChange={event => setYear(event.target.value)}
        />
         <label htmlFor='types'>Types</label>
         <Select
         className={classes.inputo}
         value={types}
            onChange={(value) => setTypes(value)} 
            data={['Jazz', 'Rock', 'Electronic', 'Hip-hop', 'Funk']}
          />
        <label htmlFor='condition'>Condition:</label>
        <Select
         className={classes.inputo}
         value={condition}
          onChange={(value) => setCondition(value)} 
          data={['Mint', 'VeryGood', 'Fair']}
        />
        <label htmlFor='image'>Image:   </label>
           
            <input
         className={classes.inputo}
         type="text"
              value={image}
              placeholder="Image URL..."
              onChange={(e) => setImage(e.target.value)}
            />
        

      
        <button
         className={classes.button}
          type='submit'>SUBMIT</button>
      </form>
    </>
  )
}

export default NewVinyl
