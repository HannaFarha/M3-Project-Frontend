import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import {  Select } from '@mantine/core';
const UpdateVinyl = () => {
  const { vinylsId } = useParams()
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [year, setYear] = useState('')
  const [types, setTypes] = useState("");
  const [condition, setCondition] = useState('');


  const { fetchWithToken } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOneVinyl = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls/${vinylsId}`)

        if (response.ok) {
          const vinylData = await response.json()
          setArtist(vinylData.artist)
          setAlbum(vinylData.album)
          setYear(vinylData.year)
          setTypes(vinylData.types)
          setCondition(vinylData.condition)
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
         <label htmlFor='year'>Types</label>
        <Select
          value={types}
          onChange={(value) => setTypes(value)} 
          data={['Jazz', 'Rock', 'Electronic', 'Hip-hop', 'Funk']}
        />
        <label htmlFor='year'>Condition:</label>
        <Select
          value={condition}
          onChange={(value) => setCondition(value)} 
          data={['Mint', 'VeryGood', 'Fair']}
        />
      
        <button type='submit'>SUBMIT</button>
      </form>



      {/* <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <label>
          Author:
          <input value={author} onChange={event => setAuthor(event.target.value)} />
        </label>
        <label>
          Pages:
          <input value={pages} type='number' onChange={event => setPages(event.target.value)} />
        </label>
        <button type='submit'>Update</button>
      </form> */}
    </>
  )
}

export default UpdateVinyl