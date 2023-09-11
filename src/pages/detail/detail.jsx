import { useEffect, useState } from "react";
import { getProductById } from "../../Productos";
import { getRate } from "../../utils/getRate";
import { ReactComponent as LeftIcon } from "../../icons/left.svg";
import { useParams, Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  //const params = useParams() = {productId: ??}
  //params.productId
  const { id } = useParams(); // {productId: ??}

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
      <p className="text-2xl max-w-5xl m-auto font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-[#a64aff] text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </p>
    );

  return (
    <section className="container">
      <div className="card" style={{ maxWidth: "100rem" }}>
        <div className="card-header">
          <Link to="/products" className="btn btn-indigo btn-sm">
            <LeftIcon />
            Go Back
          </Link>
        </div>
        <div className="card-body">
          <picture className="w-100 m-auto">
            <img
              src={product?.image}
              alt={product?.title}
              className="img-fluid"
            />
          </picture>
          <div className="d-flex flex-column gap-2 mt-3">
            <h3 className="font-weight-bold text-3xl">{product?.title}</h3>
            <p>{product?.description}</p>
            <span className="badge bg-indigo-700 text-white small">
              {product?.category}
            </span>
            <p>
              <span className="text-yellow-600">
                {getRate(product?.rating?.rate)}
              </span>{" "}
              / {product?.rating?.count} reviews
            </p>
            <strong>${product?.price}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
