import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Prodact from './Prodact';

function ProductDetails() {
  const arry = "https://fakestoreapi.com/products";
  const [product, setProduct] = useState({})
  const params = useParams();
  console.log(params);
  useEffect(() => {
    fetch(`${arry}/${params.productId}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, []);
  return (
    <Prodact propst={product}  showbutton={false}/>  
  )
}

export default ProductDetails