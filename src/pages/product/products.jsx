import React, { useEffect, useState } from "react";
import { getRate } from "../../utils/getRate";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./products.css";
import { db } from "../../services/firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const { category } = useParams(); // Get the category parameter from the URL

  useEffect(() => {
    setLoading(true);

    // Realiza la consulta a Firestore para obtener todos los documentos de la colección "products"
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productData = [];

        // Recorre los documentos y agrega sus datos al array productData
        querySnapshot.forEach((doc) => {
          productData.push(doc.data());
        });

        // Filtra los productos basados en la categoría si se proporciona
        let filteredProducts = category
          ? productData.filter((product) => product.category === category)
          : productData;

        // Filtra los productos por título si hay un término de búsqueda
        if (searchTerm) {
          filteredProducts = filteredProducts.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    // Llama a la función para obtener los productos cuando el componente se monta
    fetchProducts();
  }, [category, searchTerm]);

  if (loading)
    return (
      <p className="text-2xl max-w-5xl m-auto font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-[#a64aff] text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>{" "}
      </p>
    );

  return (
    <section className="container">
      {/* Agrega un campo de entrada de texto para buscar por título */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(({ id, title, price, category, rating, image }) => (
          <div key={id} className="col">
            <div className="card h-100">
              <div style={{ height: "200px" }}>
                <img
                  src={image}
                  alt={title}
                  className="card-img-top img-fluid"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{title}</h3>
                <span className="badge bg-indigo text-white mb-2">
                  {category}
                </span>
                <p>
                  <span className="text-yellow-600">
                    {getRate(rating.rate)}
                  </span>{" "}
                  / {rating.count} reviews
                </p>
                <strong>${price}</strong>
                <Link
                  to={`/detail/${id}`}
                  className="mt-auto btn btn-custom btn-sm"
                >
                  <span>View more ...</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
