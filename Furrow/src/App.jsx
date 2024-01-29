import './styles/App.css'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotFound from "./pages/NotFound";
import Navbar from './components/Navbar'
import NewVinyl from './pages/CreateVinyl.jsx';
import VinylsPage from './pages/VinylsPage';
import VinylsDetailsPage from './pages/VinylsDetailsPage';
import { Route, Routes } from 'react-router-dom'
import '@mantine/core/styles.css';
import UpdateVinyl from './pages/UpdateVinyl.jsx';

function App() {
  return (
    <>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<VinylsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/newvinyl" element={<NewVinyl />} />
        <Route path="/vinyls/:vinylsId" element={<VinylsDetailsPage />} />
        <Route path="/vinyl/:vinylsId" element={<UpdateVinyl />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
