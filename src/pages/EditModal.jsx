/* eslint-disable react/prop-types */
import { useState } from "react";

import { ItemService } from "../api/Item-Service";

function UpdateItem({ itemData }) {
  const [item, setItem] = useState(itemData.item);
  const [stocks, setStocks] = useState(itemData.stocks);
  const [price, setPrice] = useState(itemData.price);

  const payload = { id: itemData._id, item, stocks, price };
  const Update = async () => {
    try {
      const response = await ItemService.updateItem(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={Update}>
      <div className="mb-3 fs-3">
        <label htmlFor="" className="form-label">
          Item
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
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
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
          required
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-success" type="submit">
        Update
      </button>
    </form>
  );
}
export default UpdateItem;
