import { useEffect, useState } from 'react';
import Prodact from './Prodact';

function Prodactlist() {
  const api_ur = "https://fakestoreapi.com/products";
  const [prods, setPred] = useState([]);
  const [categories, setcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // État pour suivre la catégorie sélectionnée

  const getProduct = () => {
    fetch(api_ur)
      .then((res) => res.json())
      .then((data) => setPred(data));
  };

  const getCategories = () => {
    fetch(`${api_ur}/categories`)
      .then((res) => res.json())
      .then((data) => setcategories(data));
  };

  const getProductIncategory = (catName) => {
    console.log(catName);
    const url = catName ? `${api_ur}/category/${catName}` : api_ur;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPred(data));
  };

  useEffect(() => {
    getProduct(); // Charge tous les produits par défaut au montage du composant
    getCategories();
  }, []);

  // Met à jour la catégorie sélectionnée et récupère les produits correspondants
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getProductIncategory(category);
  };

  return (
    <div>
      <h2 className='texte-center p-4'>Our Product</h2>
      <div className='container'>
        <button
          onClick={() => {
            handleCategoryClick(''); // Réinitialise la catégorie sélectionnée pour afficher tous les produits
          }}
          className={`btn btn-info ${selectedCategory === '' ? 'active' : ''}`} // Ajoute la classe 'active' si 'All' est sélectionné
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`btn btn-info ${selectedCategory === cat ? 'active' : ''}`} // Ajoute la classe 'active' si cette catégorie est sélectionnée
          >
            {cat}
          </button>
        ))}
        <div className='row'>
          {prods.map((propst) => (
            <div className='col-3' key={propst.id}>
              <Prodact propst={propst} showbutton={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Prodactlist;
