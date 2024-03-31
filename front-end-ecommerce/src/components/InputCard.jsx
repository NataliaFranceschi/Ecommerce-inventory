import React, { useEffect, useContext, useState } from 'react'
import ecommerceContext from '../context/ecommerceContext';
import '../style/productCard.scss'
import '../style/inputCard.scss'
import cardImage from '../cardImage.png'
import ecommerceFetch from '../axios/config';

function InputCard() {
  const emptyProduct = {
    name:"", 
    description:"",
    image: "",
    quantity: "",
    price: "",
  };
    const { productId, setProductId, update, setUpdate } = useContext(ecommerceContext)
    const [product, setProduct] = useState(emptyProduct)
    const [errorMesage, setErrorMessage] = useState("")

    const getProduct = async () => {
      if(productId !== ""){
        try {
          var token = localStorage.getItem('token');
          setProduct(emptyProduct)
          const response = await ecommerceFetch.get(`/product/${productId}`,
          {headers: { Authorization: `Bearer ${token}`}});
          const { data } = response;
          setProduct({
                name:data.name, 
                description:data.description,
                image: data.image,
                quantity: data.quantity,
                price: data.price
          }); 
        } catch (error) {
          console.log(error);
        }
      } else {
        setProduct(emptyProduct);
      }
    };

    const createProduct = async (token) => {
      try {
        await ecommerceFetch.post('/product', product,
        {headers: { Authorization: `Bearer ${token}`}});
        setProduct(emptyProduct);
        setUpdate(!update);
        } catch (error) {
          console.log(error);
        }
    }

    const editProduct = async (token) => {
      try {
        await ecommerceFetch.put('/product', {...product, id:productId},
        {headers: { Authorization: `Bearer ${token}`}});
        setProductId("");
        setProduct(emptyProduct);
        setUpdate(!update);
        } catch (error) {
          console.log(error);
        }
    }

    const concludProduct = async () => {
      var token = localStorage.getItem('token');
      if ((product.name == "") || (product.price == "") || (product.quantity == ""))
      {
        setErrorMessage("Campo obrigatório não preenchido.")
      }
      else if (productId == ""){
        createProduct(token);
        setErrorMessage("");
      } else {
        editProduct(token);
        setErrorMessage("");
      }
    }

    useEffect(() => {
      getProduct();
      setErrorMessage("");
    }, [productId]);

  return (
    <div className='inputCard'>
        <div className='card'>
        {(product.image == "" || product.image == null)
              ?<img src={ cardImage } alt='product'/>
              :<img src={ product.image } alt='product'/>}
        <label htmlFor="image-input">
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={ ({target}) => setProduct({...product, image: target.value}) }
              placeholder="Imagem (opcional)"
            />
            </label>
            <label htmlFor="name-input">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={ ({target}) => setProduct({...product, name: target.value}) }
              placeholder="Nome"
            />
            </label>
            <label htmlFor="description-input">
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={ ({target}) => setProduct({...product, description: target.value}) }
              placeholder="Descrição (opcional)"
            />
            </label>
            <label htmlFor="quantity-input">
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={ ({target}) => setProduct({...product, quantity: target.value}) }
              placeholder="Quantidade"
            />
            </label>
            <label htmlFor="price-input">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={ ({target}) => setProduct({...product, price: target.value}) }
              placeholder="Preço"
            />
            </label>
            <span>{errorMesage}</span>
        </div>
        <button type="button"
        onClick={() => concludProduct()}
        >Concluir</button>
    </div>
  );
}

export default InputCard;
