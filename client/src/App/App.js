import { Outlet } from "react-router-dom";
import './App.scss'

function App() {
  return (
    <div className="App">
      <h1>Parasite</h1> is king <Outlet />{" "}
    </div>
  );
}

export default App;
