import './App.css'
import HeaderPanel from './Sheared/headerPanel'
import { Routes, Route } from 'react-router-dom';
import Listing from './Pages/ListingComp/listing'
import AddEdit from './Pages/AddEditComp/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <ToastContainer />
   <HeaderPanel/>
   <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/add/:id?" element={<AddEdit />} />
        <Route path="*" element={<Listing />} />
      </Routes>
    </>
  )
}

export default App
