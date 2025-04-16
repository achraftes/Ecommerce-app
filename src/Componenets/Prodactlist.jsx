import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Prodact from './Prodact';

function Prodactlist() {
  const api_url = "https://fakestoreapi.com/products";
  const [prods, setPred] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation(); // Pour accéder aux paramètres d'URL

  const getProduct = () => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setPred(data);
        setFilteredProducts(data); // Initialiser les produits filtrés avec tous les produits
        // Après avoir chargé les produits, appliquer le filtre de recherche s'il existe
        applySearchFilter(data);
      });
  };

  const getCategories = () => {
    fetch(`${api_url}/categories`)
      .then((res) => res.json())
      .then((data) => setcategories(data));
  };

  const getProductIncategory = (catName) => {
    console.log(catName);
    const url = catName ? `${api_url}/category/${catName}` : api_url;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPred(data);
        // Après avoir changé de catégorie, appliquer également le filtre de recherche
        applySearchFilter(data);
      });
  };

  // Fonction pour appliquer le filtre de recherche à partir de l'URL
  const applySearchFilter = (productsToFilter) => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    
    if (searchTerm && searchTerm.trim() !== '') {
      const filtered = productsToFilter.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productsToFilter);
    }
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  // Effet qui se déclenche quand l'URL change (pour la recherche)
  useEffect(() => {
    // Si nous avons déjà des produits, appliquer le filtre de recherche
    if (prods.length > 0) {
      applySearchFilter(prods);
    }
  }, [location.search]);

  // Met à jour la catégorie sélectionnée et récupère les produits correspondants
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getProductIncategory(category);
  };

  return (
    <div>
      <h2 className='text-center p-4'>Our Products</h2>
      
      <div className='container'>
        <div className='mb-4'>
          <button
            onClick={() => {
              handleCategoryClick('');
            }}
            className={`btn btn-info me-2 ${selectedCategory === '' ? 'active' : ''}`}
          >
            All
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`btn btn-info me-2 ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Affichage d'un message si aucun produit trouvé */}
        {filteredProducts.length === 0 ? (
          <div className="alert alert-info">
            Aucun produit ne correspond à votre recherche.
          </div>
        ) : (
          <div className='row'>
            {filteredProducts.map((propst) => (
              <div className='col-md-3 mb-4' key={propst.id}>
                <Prodact propst={propst} showbutton={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Prodactlist;