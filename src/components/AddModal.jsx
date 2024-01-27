import { ItemService } from "../api/Item-Service";
import { useState  } from "react";


export const AddModal = () => {
  const [item, setItem] = useState();
  const [stocks, setStocks] = useState();
  const [price, setPrice] = useState();

  const Submit = async() => {
    try {
        const res = await ItemService.createItem({item, stocks, price})
        alert("Product " + res.item + " added.")
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <form onSubmit={Submit}>
      <div className="mb-3 fs-3">
        <label htmlFor="" className="form-label">
          Item
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          required
          onChange={(e) => setItem(e.target.value)}
        />
      </div>
      <div className="mb-3 fs-3">
        <label htmlFor="" className="form-label">
          Available Stocks
        </label>
        <input
          type="number"
          className="form-control"
          id="formGroupExampleInput2"
          required
          onChange={(e) => setStocks(e.target.value)}
        />
      </div>
      <div className="mb-3 fs-3">
        <label htmlFor="" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="formGroupExampleInput"
          required
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Add Item
      </button>
    </form>
  );
};
