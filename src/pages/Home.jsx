import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ItemService } from "../api/api";
import Modal from "react-bootstrap/Modal";
import Example from "./EditModal";

function Home() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [shouldFetch, setShouldFetch] = useState(true);

  const handleShow = (item) => {
    setItem(item);
    setShow(true);
  };

  const getData = async () => {
    try {
      const response = await ItemService.getAllItems();
      setItems(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      getData();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const handleDelete = async (id) => {
    try {
      const response = await ItemService.deleteItem(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getData();
  };
  const logOut = () => {
    alert("Are you sure you want to log out?");
    window.location.href = "./";
    localStorage.clear();
  };
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-secondary">
      <div className="container-fluid bg-white p-3 rounded">
        <button
          className="btn btn-danger btn-lg  m-3 position-absolute top-0 end-0 "
          onClick={logOut}
        >
          Log Out
        </button>
        <Link to="/create" className="btn btn-primary m-3 btn-lg mx-auto">
          Add Item
        </Link>
        <table className="table  table-info table-striped-columns mx-auto text-center fs-4">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Available Stocks</th>
              <th scope="col">Price</th>
              <th scope="col">Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.item}</td>
                    <td>{item.stocks}</td>
                    <td>{item.price}</td>
                    <td>{item.price * item.stocks}</td>
                    <td>
                      <button
                        className="btn btn-success btn-lg gap-3 mx-2"
                        onClick={() => handleShow(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-lg"
                        style={{ marginLeft: "5px" }}
                        onClick={() => handleDelete(item._id)}
                        
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Example itemData={item} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Home;
