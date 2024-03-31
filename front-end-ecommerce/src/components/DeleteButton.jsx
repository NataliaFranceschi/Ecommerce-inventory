import React, {useContext} from 'react'
import ecommerceContext from '../context/ecommerceContext';
import ecommerceFetch from '../axios/config';
import { MdDelete } from "react-icons/md";

function EditButton({id}) {
    const { update, setUpdate } = useContext(ecommerceContext)

    const deleteProduct = async () => {
      var token = localStorage.getItem('token');
        try {
          await ecommerceFetch.delete(`/product/${id}`,
          {headers: { Authorization: `Bearer ${token}`}});
          setUpdate(!update);
          } catch (error) {
            console.log(error);
          }
      }

  return (
    <button type="button"
    className='deleteButton'
    onClick={() => deleteProduct()}
    >
        <MdDelete />
    </button>
  );
}

export default EditButton;