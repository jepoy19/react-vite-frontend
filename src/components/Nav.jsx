import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav
      style={{ textAlign: "center", padding: "10px" }}
      className="bg-secondary fs-5 fw-semibold "
    >
      <Link
        to="/"
        style={{ padding: "10px", color: "white" }}
        className="text-decoration-none"
      >
        Login
      </Link>
      <Link
        to="/home"
        style={{ padding: "10px", color: "white" }}
        className="text-decoration-none"
      >
        Home
      </Link>
      <Link
        to="/register"
        style={{ padding: "10px", color: "white" }}
        className="text-decoration-none"
      >
        Register
      </Link>
    </nav>
  );
};
export default Nav;
