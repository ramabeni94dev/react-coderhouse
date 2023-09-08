import "./App.css";
import CollapsibleExample from "./componentes/navbar/navbar";

import Footer from "./componentes/footer/footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/index";
import Login from "./pages/login/login";
import Products from "./pages/product/products";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CollapsibleExample />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
