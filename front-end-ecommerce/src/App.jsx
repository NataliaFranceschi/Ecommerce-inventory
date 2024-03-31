import { Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css'

function App() {

  return (
    <Provider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/inventory" element={ <Home /> } />
      </Routes>
    </Provider>
  )
}

export default App
