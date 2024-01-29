import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const VinylsDetailsPage = () => {
 
  const [vinyl, setVinyl] = useState()
  const { fetchWithToken, userId } = useContext(AuthContext)
  const navigate = useNavigate()
  const{ vinylsId } = useParams();

  useEffect(() => {
    const fetchVinyl = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls/${vinylsId}`)
        if (response.ok) {
          const vinylData = await response.json()
          setVinyl(vinylData)
          
        } else {
          console.log('Something went wrong')
          console.log(vinylsId)
        }
      } catch (error) {
        console.log(error)
      }
    }
    

    fetchVinyl()
  }, [vinylsId])


  
  const handleDelete = async () => {
    try {
      const response = await fetchWithToken(`/vinyl/${vinylsId}`, 'DELETE')
      
      if (response.status === 204) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return vinyl ? (
    <>
      <h1>Vinyl Details</h1>
      <p>{vinyl.artist}</p>
      <p>{vinyl.album}</p>
      <p>{vinyl.types}</p>
      <p>{vinyl.years}</p>
      <p>{vinyl.condition}</p>
      {userId === vinyl.createdBy && (
        <>
          <button type='button' onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/vinyl/${vinyl._id}/update`}>Update</Link>
        </>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  )
}

export default VinylsDetailsPage