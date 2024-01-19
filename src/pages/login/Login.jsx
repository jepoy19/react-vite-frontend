/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemService } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const token = "token"
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("token",token)
    try {
      const result = await ItemService.logIn({ email, password });
      if (result) {
        navigate("/home");
      } else {
        alert("Email or Password is incorrect");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center " style={{backgroundColor:"#092635"}}>
      <div className="p-3 rounded w-25" style={{backgroundColor:"#1B4242", color:"white"}}>
        <h2 className="text-align-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              name="email"
              placeholder="Enter Email"
              className="form-label"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label name="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="on"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-info" type="submit" style={{backgroundColor:"#5C8374", color:"white"}}>
              Login
            </button>
          </div>
        </form>
        <div className="d-grid gap-2 col-6 mx-auto">
          <p className="m-1">Create an account</p>
          <Link to="/register" className="btn btn-light" type="submit">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
