import './styles/App.css'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotFound from "./pages/NotFound";
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import NewVinyl from './pages/CreateVinyl.jsx';
import VinylsPage from './pages/VinylsPage';
import VinylsDetailsPage from './pages/VinylsDetailsPage';
import { Route, Routes } from 'react-router-dom'
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <Navbar />
     <VinylsPage/>
     
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/newvinyl" element={<NewVinyl />} />
        <Route path="/vinyls" element={<VinylsPage />} />
        <Route path="/vinyls/:vinylsId" element={<VinylsDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
