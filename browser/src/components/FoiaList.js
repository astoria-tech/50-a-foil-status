import React, { useState } from "react";

const FoiaList = (props) => { const [status, setStatus] = useState();
  const [price, setPrice] = useState();
  const filterData = {};

  function applyFilter(item) {
    let visible = true;
    if (status && item.foiaReq.status !== status) visible = false;
    if (price && parseFloat(item.foiaReq.price) !== parseFloat(price)) visible = false;
    return visible;
  }

  const uniqueStatuses = new Set();
  const uniquePrices = new Set();
  props.data.foiaList.forEach(item => {
    uniqueStatuses.add(item.foiaReq.status);
    uniquePrices.add(parseFloat(item.foiaReq.price));
  });
  filterData.prices = Array.from(uniquePrices).sort((a, b) => a - b);
  filterData.statuses = Array.from(uniqueStatuses);

  return (
    <div className="foia-list">
      <div className="foia-list__filters">
        <p className="foia-list__filters-heading">Refine results</p>
        <form className="foia-list__filters-form">
          <label htmlFor="foia-list-statuses">Status: </label>
          <select id="foia-list-statuses" onChange={event => setStatus(event.target.value)}>
            <option value="" key="no-status">Select a status</option>
            {filterData.statuses.map(status => (
              <option value={status} key={status}>{status}</option>
            ))}
          </select>
          <label htmlFor="foia-list-prices">Price: </label>
          <select id="foia-list-prices" onChange={event => setPrice(parseFloat(event.target.value))}>
            <option value="-0.1" key="no-price">Select a price</option>
            {filterData.prices.map(price => (
              <option value={price} key={price}>{new Intl.NumberFormat(navigator.language, {style: 'currency', currency: 'USD'}).format(price)}</option>
            ))}
          </select>
        </form>
      </div>
      <div className="foia-list__results">
        {props.data.foiaList.filter(applyFilter).map(item => (
          <div key={item.agency.id + item.foiaReq.id + item.jurisdiction.id} className="foia-list__item">
            <h2><a href={item.foiaReq.absolute_url}>{item.agency.agencyName}</a></h2>
            <table>
              <tbody>
                <tr>
                  <td>Submitted</td>
                  <td><time dateTime={item.foiaReq.datetime_submitted}>{item.foiaReq.datetime_submitted}</time></td>
                </tr>
                <tr>
                  <td>Completed</td>
                  <td><time dateTime={item.foiaReq.datetime_done}>{item.foiaReq.datetime_done}</time></td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{item.foiaReq.status}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{new Intl.NumberFormat(navigator.language, {style: 'currency', currency: 'USD'}).format(item.foiaReq.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoiaList;
