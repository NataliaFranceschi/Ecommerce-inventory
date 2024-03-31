import React, {useContext} from 'react'
import ecommerceContext from '../context/ecommerceContext';

function EditButton({id}) {
  const { setProductId, setCreateEdit } = useContext(ecommerceContext)

  const Edit = async () => {
    setProductId(id);
    setCreateEdit(true);
  }

  return (
    <button type="button"
    onClick={() => Edit()}
    >Editar</button>
  );
}

export default EditButton;