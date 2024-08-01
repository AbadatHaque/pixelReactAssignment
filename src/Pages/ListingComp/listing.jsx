import { useSelector,useDispatch } from 'react-redux'
import {deleteData} from '../../Reducer/userReducer'
import { useNavigate } from 'react-router-dom';
import './listingStyle.css'
import {  toast } from 'react-toastify';


const Listing = () => {
    const availableData = useSelector(state => state.userData.availableData)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handelEdit=(id)=>{
        navigate(`/add/${id}`)
    }
    const handelDelete=(id)=>{
        dispatch(deleteData(id))
        toast.success("Use has been deleted successfully")
    }
    const handelClick=()=>{
        navigate('/add')
    }
    return (
        <div className="container">
      <h1>USER Details</h1>
      <button className='addBtn' type='button' onClick={handelClick}>Add User</button>
      {console.log(availableData, 'availableData')}
     {!!availableData.length && <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>PAN Number</th>
            <th>Mob. Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availableData.map((item, ind) => (
            <tr key={ind}>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.panNum}</td>
              <td>{item.number}</td>
              <td>Total address: {item.allAddress.length}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handelEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handelDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
      <p className="notFound"> No data could be located.</p>
      </div>
    );
}

export default Listing;
