import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import "../styles/details.css"
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

  return vinyl ? (<div  className="modal-container">
  <div  className="modal-content">
      <i  className ="bi bi-x-circle-fill modal-icon"></i>  
      <div className="modal-content-img">
      <img src={vinyl.image}  />
          </div> 
          <div className="modal-content-info">
              <h5 className="modal-content-info-title">Vinyl Details</h5>
              <div className="modal-content-info-price"><b>{vinyl.artist}</b></div><br/>
              <div className="modal-content-info-price"><b>{vinyl.album}</b></div>  <br/> 
              <div className="modal-content-info-price"><b>{vinyl.year}</b>  </div>   <br/> 
              <div className="modal-content-info-price"><b>{vinyl.types}</b></div>   <br/> 
              <div className="modal-content-info-price"><b>{vinyl.condition}</b></div>   <br/> 
              <div className="modal-content-info-price"><b>{vinyl.timestamps}</b></div>   <br/> 
              {userId === vinyl.createdBy && (<>
        <button onClick={handleDelete}  className="modal-add-to-cart-btn">
          Delete</button>
          <Link to={`/vinyl/${vinyl._id}`}> <button className="modal-add-to-cart-btn">Update</button></Link>
          <br/> <br/></>)}
       <div> <Link to={`/`}> <button className="modal-add-to-cart-btn">Back</button></Link></div>
      </div>
      
              </div> 
      </div>

  ): (
    <h2>Loading...</h2>)

}
export default VinylsDetailsPage
