import { useSelector } from 'react-redux/es/exports'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Home from './pages/Home/Home'
import LandingPage from './pages/LandingPage/LandingPage'

function App() {
  const authSlice = useSelector((state: any) => state.auth);
  return (
    <div className="App">
      <Header />
      <Routes>
        {authSlice === null ?
          <Route path='*' element={<LandingPage />}></Route>
          :
          <Route path='*' element={<Home />}></Route>
        }
      </Routes>
    </div>
  )
}

export default App;
