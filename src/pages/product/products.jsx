import { useEffect, useState } from "react";
import { getProducts } from "../../Productos";

import { getRate } from "../../utils/getRate";

import Spinner from "react-bootstrap/Spinner";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import "./products.css";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { category } = useParams(); // Get the category parameter from the URL

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((products) => {
        // Filter products based on the category parameter
        const filteredProducts = category
          ? products.filter((product) => product.category === category)
          : products;
        setProducts(filteredProducts);
      })
      .catch((err) => console.log({ err }))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading)
    return (
      <p className="text-2xl max-w-5xl m-auto font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-[#a64aff] text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loa ding...</span>
        </Spinner>{" "}
      </p>
    );

  return (
    <section className="container">
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
