import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function VinylsPage() {
  const [vinyl, setVinyls] = useState([])
  const [search, setSearch] = useState("");
  const fetchVinyls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vinyls`)
      if (response.ok) {
        const vinylData = await response.json()
        
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
    <>
    <div className="authors-search-wrapper">
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      type="search"
      placeholder="Search in Type"
    />
  </div>
    <div>
      <h1>Vinyls page</h1>
      <ul>
        {vinyl.filter(a => a.types.toLowerCase().includes(search)).map(vinyl => (
          <li key={vinyl._id}>
            <Link to={`/vinyls/${vinyl._id}`}>
              {/* <p>{vinyl.artist}</p> */}
              <p>{vinyl.types}</p>
              {/* <p>{vinyl.album}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default VinylsPage