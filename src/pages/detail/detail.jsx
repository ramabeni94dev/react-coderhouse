import React, { useEffect, useState } from "react";
import { getProductById } from "../../Productos";
import { getRate } from "../../utils/getRate";
import { ReactComponent as LeftIcon } from "../../icons/left.svg";
import { useParams, Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getProductById(Number(id))
      .then((product) => {
        setProduct(product);
      })
      .catch((err) => console.log({ err }))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  return (
    <div className="container my-5">
      <Link to="/products" className="btn btn-link">
        <LeftIcon />
        Go Back
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product?.image}
            alt={product?.title}
            className="img-fluid w-100 h-auto"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{product?.title}</h1>
          <p className="text-muted">{product?.description}</p>
          <div className="d-flex align-items-center">
            <span className="badge bg-primary me-2">{product?.category}</span>
            <span className="text-warning">
              {getRate(product?.rating?.rate)}
            </span>{" "}
            / {product?.rating?.count} reviews
          </div>
          <h2 className="display-5 mt-4">${product?.price}</h2>
          <button className="btn btn-primary btn-lg mt-4">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
