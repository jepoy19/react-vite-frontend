import React from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import Modal from "react-bootstrap/Modal";

import { ItemService } from "../api/Item-Service";
import { AddModal } from "../components/AddModal";
import UpdateModal from "../components/UpadateModal";

export const Table = () => {
  const [edit , SetEdit] = useState([])
  const [item, setItem] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [show, setShow] = useState(false);
  const [showadd, setShowAdd] = useState(false)

  const [filters, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getData = async () => {
    try {
      const response = await ItemService.getAllItems();
      setItem(response);
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

  const formatCurrency = (value) => {
    return value.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
  };

  const numberTemplate = (item) => {
    return formatCurrency(item.price);
  };
  const deleteItem = (item) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="m-auto"
          style={{ marginRight: "5px" }}
          onClick={() => showEditModal(item)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDelete(item._id)}
          style={{ marginLeft: "10px" }}
        />
      </React.Fragment>
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await ItemService.deleteItem(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    getData();
  };

  const showAddModal = () => {
    setShowAdd(true)
  }
  const showEditModal = (item) => {
  console.log(item)
  SetEdit(item)
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const closeAdd = () => setShowAdd(false)

  const logOut = () => {
    window.location.href = "./";
    localStorage.clear();
  };

  return (
    <div>
      <Button
        icon="pi pi-plus"
        label="New item"
        style={{
          borderRadius: "5px",
          marginTop: "5px",
          position: "absolute",
          left: "10px",
          marginBottom: "5px",
        }}
        onClick={showAddModal}
      />
      <Button
        label="Log out"
        severity="danger"
        icon="pi pi-sign-out"
        style={{
          borderRadius: "5px",
          margin: "5px",
          position: "absolute",
          right: "0px",
          marginBottom: "5px",
        }}
        onClick={logOut}
      />
      <InputText
        icon="pi pi-search"
        onInput={(e) =>
          setFilter({
            global: {
              value: e.target.value,
              matchMode: FilterMatchMode.CONTAINS,
            },
          })
        }
        placeholder="Search..."
        style={{
          justifyContent: "center",
          margin: "auto",
          marginBottom: "20px",
          marginTop: "20px",
          display: "flex",
        }}
      />

      <DataTable
        value={item}
        filters={filters}
        paginator
        rows={5}
        rowsPerPageOptions={[1, 2, 3, 4, 5]}
        totalRecords={3}
      >
        <Column field="item" header="Item" sortable />
        <Column field="stocks" header="Available Stocks" sortable />
        <Column field="price" header="Price" sortable body={numberTemplate} />
        <Column
          field="totalPrice"
          header="Total Price"
          sortable
          body={numberTemplate}
        />
        <Column
          body={deleteItem}
          rounded
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Modal show={showadd} onHide={closeAdd}>
        <Modal.Header closeButton>
          <Modal.Title>New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddModal />
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateModal itemData={edit} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
