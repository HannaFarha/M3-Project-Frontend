import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function VinylsPage() {
  const [vinyl, setVinyls] = useState([])

  const fetchVinyls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls`)
      if (response.ok) {
        const vinylData = await response.json()
        console.log(vinylData)
        setVinyls(vinylData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVinyls()
  }, [])

  return (
    <div>
      <h1>Vinyls page</h1>
      <ul>
        {vinyl.map(vinyl => (
          <li key={vinyl._id}>
            <Link to={`/vinyls/${vinyl._id}`}>
              <p>{vinyl.artist}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VinylsPage