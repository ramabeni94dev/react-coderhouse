import "./App.css";
import CollapsibleExample from "./componentes/navbar/navbar";
import UncontrolledExample from "./componentes/carrusel/carrusel";
import ItemListContaienr from "./componentes/itemlistcontainer/itemlistcontainer";
import Footer from "./componentes/footer/footer";

function App() {
  return (
    <div className="App">
      <CollapsibleExample />
      <ItemListContaienr greeting={"Bienvenidos"} />
      <div className="container">
        <UncontrolledExample />
      </div>
      <Footer />
    </div>
  );
}

export default App;
