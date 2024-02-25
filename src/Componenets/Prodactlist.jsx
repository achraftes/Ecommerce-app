import { useEffect, useState } from 'react'
import Prodact from './Prodact'

function Prodactlist() {
  const api_ur = "https://fakestoreapi.com/products";
  const [prods, setPred] = useState([]);
  const [categories, setcategories] = useState([]);
  const getProduct = () => {
    fetch(api_ur)
      .then((res) => res.json())
      .then((data) => setPred(data));
  }
  const getCategories = () => {
    fetch(`${api_ur}/categories`)
      .then((res) => res.json())
      .then((data) => setcategories(data));
  }
  const getProductIncategory = (catName) => {
    console.log(catName);
    fetch(`${api_ur}/category/${catName}`)
      .then((res) => res.json())
      .then((data) => setPred(data));
  }
  useEffect(() => {
    getProduct();
    getCategories();
    getProductIncategory();
  }, []);
  return (
    <div>
      <h2 className='texte-center p-4'>Our Product</h2>
      <div className='container'>
            <button  onClick={() => {
               getProduct();
            }} className='btn btn-info'> All
            </button>

        {
          categories.map((cat) => {
            return (
            <button key={cat} onClick={() => {
              getProductIncategory(cat);
            }} className='btn btn-info'> {cat}
            </button>
            )
          })
        }
        <div className='row'>
          {prods.map((propst) => {
            return (
              <div className='col-3' key={propst.id}>
                <Prodact propst={propst} showbutton={true} />
              </div>
            );
          })}


        </div>
      </div>
    </div>
  )
}

export default Prodactlist