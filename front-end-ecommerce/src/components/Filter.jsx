import React, {useContext, useEffect, useState} from 'react'
import ecommerceContext from '../context/ecommerceContext';

function Filter() {
  const { products, setProducts, setUpdate, update } = useContext(ecommerceContext);
  const [option, setOption] = useState("");

  const sort = async () => {
    let sortedProducts = [...products];
    if (option === "maior quantidade") {
      sortedProducts.sort((a, b) => b.quantity - a.quantity);
    } else if (option === "menor quantidade") {
      sortedProducts.sort((a, b) => a.quantity - b.quantity);
    } else {
        setUpdate(!update);
    }
    setProducts(sortedProducts);
  };

  useEffect(() => {
    sort();
  }, [option]);

  return (
    <label htmlFor='select-filter'>
      <select 
        name='filter' 
        onChange={({ target }) => setOption(target.value)}> 
        <option name='filter' value="">sem filtro</option>
        <option name='filter' value="maior quantidade">maior quantidade</option>
        <option name='filter' value="menor quantidade">menor quantidade</option>
      </select>
    </label>
  );
}

export default Filter;