import React, { useState, useContext } from 'react';
import ecommerceFetch from '../axios/config'
import ecommerceContext from '../context/ecommerceContext';
import { IoSearchSharp } from "react-icons/io5";
import '../style/searchbar.scss'

function SearchBar () {
  const { setProducts, getProducts } = useContext(ecommerceContext)
  const [search, SetSearch] = useState("");

    const getSearch = async () => {
      if (search == ""){
        getProducts();
      } else{
        try {
            var token = localStorage.getItem('token');
            const response = await ecommerceFetch.get(`/product/search/${search}`,
            {headers: { Authorization: `Bearer ${token}`}});
            const { data } = response;
            setProducts(data);
  
          } catch (error){
            console.log(error);
          }
        }
    };

  return (
    <div className="search-bar">
        <label htmlFor="search-bar">
            <input
              type="text"
              name="search-bar"
              value={search}
              onChange={ ({target}) => SetSearch(target.value) }
            />
        </label>
        <button 
        type='button' onClick={() => getSearch()} >
            <IoSearchSharp />
        </button>
    </div>
  )
}

export default SearchBar;