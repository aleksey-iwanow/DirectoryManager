import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Navigate replace to="/blob/" />}></Route>
          <Route path="/blob/*" element={<Home></Home>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
