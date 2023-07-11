import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
 import Home from './screens/Home';
import Download from './screens/Download';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path = "/" element = {<Home></Home>}></Route>
          <Route exact path = "/download" element = {<Download></Download>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
