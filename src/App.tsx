import './App.css';
import { RootRoutes } from "./routing/routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <RootRoutes />
    </Router>
  );
}

export default App;
