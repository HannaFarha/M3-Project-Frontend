import './styles/App.css'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotFound from "./pages/NotFound";
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import { Route, Routes } from 'react-router-dom'
import VinylsPage from './pages/VinylsPage';
import VinylsDetailsPage from './pages/VinylsDetailsPage';

function App() {

  return (
    <>
     <Navbar />
     
     <Routes>
        <Route path="/" element={<VinylsPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path="/vinyls/:vinylsId" element={<VinylsDetailsPage />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
