import React, { useState } from "react";
import { DateTime } from "luxon";


const FoiaList = (props) => {
  const filterData = {};
  const [filters, setFilters] = useState({});

  function applyFilter(item) {
    if (!Object.getOwnPropertyNames(filters).length) return true;
    let isVisible = [];
    for (let key in filters) {
      if (filters[key] === "") {
        isVisible.push(0);
      }
      else if (item.foiaReq.datetime_done && key === "turnaroundTime") {
        isVisible.push(
          DateTime.fromISO(item.foiaReq.datetime_done).toMillis() > DateTime.fromISO(filters[key]).toMillis() ? 0 : 1
        );
      }
      else {
        const filter = key === "price" ? parseFloat(filters[key]) : filters[key];
        const request = key === "price" ? parseFloat(item.foiaReq[key]) : item.foiaReq[key];
        isVisible.push(request === filter ? 0 : 1);
      }
    };
    return isVisible.reduce((acc, val) => acc + val) === 0;
  }

  const uniqueStatuses = new Set();
  const uniquePrices = new Set();
  props.data.foiaList.forEach(item => {
    uniqueStatuses.add(item.foiaReq.status);
    uniquePrices.add(parseFloat(item.foiaReq.price));
  });
  filterData.prices = Array.from(uniquePrices).sort((a, b) => a - b);
  filterData.statuses = Array.from(uniqueStatuses);

  const dt = DateTime.local();
  filterData.turnaroundTimes = [
    {
      label: "Over a month",
      value: dt.minus({days: 30}).toISO(),
    },
    {
      label: "Over three months",
      value: dt.minus({days: 90}).toISO(),
    },
    {
      label: "Over five months",
      value: dt.minus({days: 150}).toISO(),
    },
    {
      label: "Over eight months",
      value: dt.minus({days: 210}).toISO(),
    }
  ];

  return (
    <div className="foia-list">
      <h2 className="foia-list__headline">FOIA list</h2>
      <div className="foia-list__filters">
        <form className="foia-list__filters-form">
          <label htmlFor="foia-list-statuses">
            Status:
            <select id="foia-list-statuses" onChange={event => setFilters({...filters, status: event.target.value})}>
              <option value="" key="no-status">Select a status</option>
              {filterData.statuses.map(status => (
                <option value={status} key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label htmlFor="foia-list-prices">
            Price:
            <select id="foia-list-prices" onChange={event => setFilters({...filters, price: event.target.value})}>
              <option value="" key="no-price">Select a price</option>
              {filterData.prices.map(price => (
                <option value={price} key={price}>{new Intl.NumberFormat(navigator.language, {style: "currency", currency: "USD"}).format(price)}</option>
              ))}
            </select>
          </label>
          <label htmlFor="foia-list-turnaround">
            Turnaround time:
            <select id="foia-list-turnaround" onChange={event => setFilters({...filters, turnaroundTime: event.target.value})}>
              <option value="" key="no-date">Select a date…</option>
              {filterData.turnaroundTimes.map(time => (
                <option value={time.value} key={time.label}>{time.label}</option>
              ))}
            </select>
          </label>
        </form>
      </div>
      <div className="foia-list__results">
        {props.data.foiaList.filter(applyFilter).map(item => (
          <div key={item.agency.id + item.foiaReq.id + item.jurisdiction.id} className="foia-list__item">
            <h3 className="foia-list__item-headline">
              <a href={item.foiaReq.absolute_url}>{item.agency.agencyName}</a>
            </h3>
            <table className="foia-list__item-table">
              <thead>
                <tr>
                  <th>Submitted</th>
                  <th>Completed</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><time dateTime={item.foiaReq.datetime_submitted}>{item.foiaReq.datetime_submitted}</time></td>
                  <td><time dateTime={item.foiaReq.datetime_done}>{item.foiaReq.datetime_done}</time></td>
                  <td>{item.foiaReq.status}</td>
                  <td>{new Intl.NumberFormat(navigator.language, {style: "currency", currency: "USD"}).format(item.foiaReq.price)}</td>
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
