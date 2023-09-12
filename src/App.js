import "./App.css";
import CollapsibleExample from "./componentes/navbar/navbar";

import Footer from "./componentes/footer/footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/index";

import Products from "./pages/product/products";
import Detail from "./pages/detail/detail";

import SignIn from "./pages/login/login";
import ProtectedRoute from "./Protectroute/protectroute";
import MyAccount from "./pages/MyAccount/myaccount";

import { useState } from "react";

import { CartProvider } from "./context/CartContext";

function App() {
  const [session, setSession] = useState(null);

  const handleSetSession = (user) => {
    setSession(user);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <CollapsibleExample />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={<SignIn onLogin={handleSetSession} />}
              />
              <Route path="/products" element={<Products />}>
                <Route index element={<Products />} />
                <Route path=":category" element={<Products />} />
              </Route>

              <Route path="/detail/:id" element={<Detail />} />
              <Route
                path="/my-account"
                element={
                  <ProtectedRoute session={session}>
                    <MyAccount onLogout={handleSetSession} user={session} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
