import React, {useContext} from 'react'
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import InputCard from '../components/InputCard';
import '../style/inventory.scss'
import ecommerceContext from '../context/ecommerceContext';

function Home() {
  const { createEdit } = useContext(ecommerceContext)

  return (
    <div>
      <Header />
      <div className='inventory'>
      {( createEdit === true)&&<InputCard />}
        <ProductCard />
      </div>
    </div>
  );
}

export default Home;
