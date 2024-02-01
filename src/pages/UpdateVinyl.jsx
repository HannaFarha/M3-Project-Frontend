import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import {  Select } from '@mantine/core';
import classes from '../styles/CreateVinyl.module.css';

const UpdateVinyl = () => {
    const { fetchWithToken } = useContext(AuthContext)
    const navigate = useNavigate()

  const { vinylsId } = useParams()
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [year, setYear] = useState('')
  const [types, setTypes] = useState('');
  const [condition, setCondition] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    const fetchOneVinyl = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls/${vinylsId}`)

        if (response.ok) {
          const vinylData = await response.json("")
          setArtist(vinylData.artist)
          setAlbum(vinylData.album)
          setYear(vinylData.year)
          setTypes(vinylData.types)
          setCondition(vinylData.condition)
          setImage(vinylData.image)
        }
      } catch (error) {
        console.log('Something went wrong ', error)
      }
    }

    fetchOneVinyl()
  }, [vinylsId])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await fetchWithToken(`/vinyl/${vinylsId}`, 'PUT', { artist, album, year, types, condition })
      if (response.status === 200) {
        navigate(`/vinyls/${vinylsId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Update Vinyl </h1>
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
         <label htmlFor='Types'>Types</label>
        <Select
         className={classes.inputo}
          value={types}
          onChange={(value) => setTypes(value)} 
          data={['Jazz', 'Rock', 'Electronic', 'Hip-hop', 'Funk']}
        />
        <label htmlFor='Condition'>Condition:</label>
        <Select
        className={classes.inputo}
          value={condition}
          onChange={(value) => setCondition(value)} 
          data={['Mint', 'VeryGood', 'Fair']}
        />
         <label htmlFor='image'>Image: </label>
            <input
              className={classes.inputo}
              type="text"
              value={image}
              placeholder="Image URL..."
              onChange={(e) => setImage(e.target.value)}
            />
         
      
        <button 
        className={classes.button}
        type='submit'>
          SUBMIT</button>
      </form>
    </>
  )
}

export default UpdateVinyl