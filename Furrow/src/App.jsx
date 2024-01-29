import './styles/App.css'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotFound from "./pages/NotFound";
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import NewVinyl from './pages/CreateVinyl.jsx';
import VinylsPage from './pages/VinylsPage';
import VinylsDetailsPage from './pages/VinylsDetailsPage';
import {Link, Route, Routes } from 'react-router-dom'
import '@mantine/core/styles.css';
import UpdateVinyl from './pages/UpdateVinyl.jsx';

function App() {
  return (
    <>
      <Navbar />
<<<<<<< HEAD
    <VinylsPage /> 
=======
     <VinylsPage />
>>>>>>> main
     
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
        <Route path="/vinyls" element={<NewVinyl />} />
        <Route path="/vinyls" element={<VinylsPage />} />
=======
        <Route path="/newvinyl" element={<NewVinyl />} />
        {/* <Route path="/vinyls" element={<VinylsPage />} /> */}
>>>>>>> main
        <Route path="/vinyls/:vinylsId" element={<VinylsDetailsPage />} />
        <Route path="/vinyl/:vinylsId" element={<UpdateVinyl />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
