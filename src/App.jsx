import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Account from './components/Account'
import Layout from './components/Layout'
import Home from './pages/Home'
import WavesBackground from './components/WavesBackground'

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Layout />}>
    //       <Route index element={<Home/>} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <Home />
    // <WavesBackground />
  )
}

export default App
