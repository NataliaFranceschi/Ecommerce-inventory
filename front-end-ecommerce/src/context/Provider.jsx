import React, {useState} from 'react'
import ecommerceContext from './ecommerceContext';
import ecommerceFetch from '../axios/config';

function Provider ({children}) {
    const [products, setProducts] = useState([]);
    const [createEdit, setCreateEdit] = useState(false);
    const [productId, setProductId] = useState('');
    const [update, setUpdate] = useState(true);

    const getProducts = async () => {
      var token = localStorage.getItem('token');
      try {
        const response = await ecommerceFetch.get('/product', 
        {headers: { Authorization: `Bearer ${token}`}});
        const { data } = response;
        setProducts(data); 
      } catch (error) {
        console.log(error);
      }
    };

    const contextValue = {
        products,
        getProducts,
        setProducts,
        setCreateEdit,
        createEdit,
        productId,
        setProductId,
        update,
        setUpdate
    };

    return (
        <ecommerceContext.Provider value={ contextValue }>
          {children}
        </ecommerceContext.Provider>
      );
}

export default Provider;