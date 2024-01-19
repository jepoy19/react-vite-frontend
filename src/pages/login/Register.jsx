import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemService } from "../../api/api";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if(validated){
      try {
        const result = await ItemService.register({ name, email, password });
        console.log(result);
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    }

  };
  return (
    <div
      className="d-flex vh-100 align-items-center justify-content-center "
      style={{ backgroundColor: "#092635" }}
    >
      <div
        className="p-3 rounded w-50 "
        style={{ backgroundColor: "#1B4242", color: "white" }}
      >
        <h2 className="text-align-center">Register</h2>
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label className="fs-4">First name</Form.Label>
              <Form.Control
                size="lg"
                required
                type="text"
                placeholder="First name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Name.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label className="fs-4">Email</Form.Label>
              <Form.Control
                size="lg"
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                size="lg"
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a Password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-info"
              type="submit"
              style={{ backgroundColor: "#5C8374", color: "white" }}
            >
              Register
            </button>
          </div>
        </Form>
        <div className="d-grid gap-2 col-6 mx-auto">
          <p className="m-1">Already have an account?</p>
          <Link to="/login" className="btn btn-light" type="submit">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
