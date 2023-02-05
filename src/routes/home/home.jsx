import { Route,Routes,Link} from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/signup";
const Home = () => {

    return (
    <div className="homepage">
    <div className="login-page-effect">
     <h1 className="top-half">analitical laboratory</h1>
     <h1 className="bottom-half">analitical laboratory</h1>
    </div>
    <nav className="login-navbar">
    <div className="login-navbar-container">
    <Link className="login-link" to="login">login</Link>
    <Link className="signup-link" to="signup">signup</Link>
    </div>
    </nav>
    <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  </Routes>
  </div>
  );
};

export default Home;