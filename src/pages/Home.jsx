import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";


import { ItemService } from "../api/api";
import Example from "./EditModal";

function Home() {
  const [getitems, setGetItems] = useState([]);
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [shouldFetch, setShouldFetch] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = getitems.slice(firstIndex, lastIndex);
  const npage = Math.ceil(getitems.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)
  

  const handleShow = (item) => {
    setItem(item);
    setShow(true);
  };

  const getData = async () => {
    try {
      const response = await ItemService.getAllItems();
      setGetItems(response);
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
      // eslint-disable-next-line no-unused-vars
      const response = await ItemService.deleteItem(id);
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
  const prevPage = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage -1)
    }
  }
  const changeCurrPage = (id) => {
    setCurrentPage(id)
  }
  const nextPage = () => {
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }
  }
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
            {records.map((item) => {
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
        <nav className="d-flex align-items-center justify-content-center">
          <ul className="pagination">
            <li className="page-item">
                <a href="#" className="page-link" onClick={prevPage}>Previous</a>
            </li>
            {
              numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active': ''}`} key={i}>
                  <a href="#" className="page-link" onClick={()=>changeCurrPage(n)}>{n}</a>
                </li>
              ))
            }
            <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
          </ul>
        </nav>
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
