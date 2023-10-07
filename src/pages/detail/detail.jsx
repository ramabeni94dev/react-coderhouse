import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Counter from "../../componentes/itemcount/itemcount";
import { useCart } from "../../context/CartContext"; // Importa el hook useCart
import { ReactComponent as LeftIcon } from "../../icons/left.svg";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { getRate } from "../../utils/getRate";

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const { addToCart, addItemToCart } = useCart(); // Usa el hook useCart para acceder al contexto del carrito

  // Manejar la adición de un producto al carrito
  const handleAddToCart = (count) => {
    if (product) {
      // Crear un objeto del producto con las propiedades necesarias
      const productToAdd = {
        category: product.category,
        description: product.description,
        id: product.id,
        image: product.image,
        price: product.price,
        quantity: count, // Usar la cantidad seleccionada
        rating: product.rating,
        title: product.title,
      };

      // Agregar el producto al carrito con las propiedades seleccionadas
      console.log("Producto agregado al carrito:", productToAdd);
      addItemToCart(productToAdd);

      // Actualizar la cantidad total en el contador del carrito
      addToCart(count);
    }
  };

  useEffect(() => {
    setLoading(true);

    // Realiza la consulta a Firebase Firestore para obtener el producto por su ID
    const fetchProductById = async () => {
      try {
        const productQuery = query(
          collection(db, "products"),
          where("id", "==", Number(id))
        );
        const querySnapshot = await getDocs(productQuery);

        if (querySnapshot.docs.length === 1) {
          // Si se encuentra un solo documento, establece el producto
          const productData = querySnapshot.docs[0].data();
          setProduct(productData);
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    // Llama a la función para obtener el producto cuando el componente se monta
    fetchProductById();
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

          {/* Pasa la función handleAddToCart como prop addToCart */}
          <Counter addToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
