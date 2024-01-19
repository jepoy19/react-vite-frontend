import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemService } from "../api/api";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function CreateItem() {
  const [item, setItem] = useState();
  const [stocks, setStocks] = useState();
  const [price, setPrice] = useState();
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const Submit = async(e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if(validated){
      try {
        const result = await ItemService.createItem({ item, stocks, price });
        console.log(result);
        navigate("/home")
      } catch (error) {
        console.log(error);
      }
    }

    // const addItems = async () => {
    //   try {
    //     const result = await ItemService.createItem({ item, stocks, price });
    //     return result.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // navigate("/home");
    // addItems();
  };
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center" style={{ backgroundColor: "#092635" }}>
      <div className="container-fluid w-50 p-3 rounded" style={{ backgroundColor: "#1B4242", color: "white" }}>
        <Form noValidate validated={validated} onSubmit={Submit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label className="fs-4">Item</Form.Label>
              <Form.Control
                size="lg"
                required
                type="text"
                onChange={(e) => setItem(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Item.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label className="fs-4">Stocks</Form.Label>
              <Form.Control
                size="lg"
                required
                type="number"
                onChange={(e) => setStocks(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Number.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Label className="fs-4">Price</Form.Label>
              <Form.Control
                size="lg"
                required
                type="number"
                
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a Number.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <button className="btn btn-success" >Submit</button>
          </Form>
      </div>
    </div>
  );
}
export default CreateItem;
