import React, { useEffect, useContext } from 'react'
import ecommerceContext from '../context/ecommerceContext';
import '../style/productCard.scss'
import cardImage from '../cardImage.png'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton'

function ProductCard() {
    const { products, getProducts, update } = useContext(ecommerceContext)

    useEffect(() => {
        getProducts();
    }, [update]);

  return (
    <div className='productCard'>
    {products.map((product, index) => {
      return (
        <div
          className='product' 
          key={index}>
            {(product.image !== "")
              ?<img src={ product.image } alt='product'/>
              :<img src={ cardImage } alt='product'/>}
            <p className='price'>{`R$ ${product.price}`}</p>
            <p className='name'>{product.name}</p>
            <p className='description'>{product.description}</p>
            <p className='quantity'>Quant. {product.quantity}</p>
            <div className='buttons'>
              <span></span>
              <EditButton id={product.id} />
              <DeleteButton id={product.id}/>
            </div>   
        </div>
      )
    })}
  </div>
  );
}

export default ProductCard;
