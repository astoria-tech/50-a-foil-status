import React, { useState } from "react";
import { DateTime } from "luxon";
import { FoiaStatus } from "../../utils/FoiaStatus";
import { FeeRange } from "../../utils/FeeRange";


const FoiaList = (props) => {
  const filterData = {};
  const [filters, setFilters] = useState({});

  function applyFilter(item) {
    if (!Object.getOwnPropertyNames(filters).length) return true;
    let isVisible = [0];
    for (let key in filters) {
      if (item.foiaReq.datetime_done && key === "turnaroundTime") {
        isVisible.push(
          DateTime.fromISO(item.foiaReq.datetime_done).toMillis() > DateTime.fromISO(filters[key]).toMillis() ? 0 : 1
        );
      }
      else if (key === "price" && filters[key]) {
        isVisible.push(FeeRange.parse(item.foiaReq.price).value === filters[key].value ? 0 : 1);
      }
      else if (key === "status" && filters[key] && filters[key].value) {
        isVisible.push(filters[key].value === item.foiaReq.status ? 0 : 1);
      }
    };
    return isVisible.reduce((acc, val) => acc + val) === 0;
  }
  
  filterData.statuses = FoiaStatus.all;
  filterData.prices = FeeRange.all;

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
            <select id="foia-list-statuses" onChange={event => setFilters({...filters, status: filterData.statuses.find(status => status.value === event.target.value)})}>
              <option value="" key="no-status">Select a status</option>
              {filterData.statuses.map(status => (
                <option value={status.value} key={status.label}>{status.label}</option>
              ))}
            </select>
          </label>
          <label htmlFor="foia-list-prices">
            Price:
            <select id="foia-list-prices" onChange={event => setFilters({...filters, price: filterData.prices.find(price => price.value === event.target.value)})}>
              <option value="" key="no-price">Select a price</option>
              {filterData.prices.map(price => (
                <option value={price.value} key={price.value}>{price.label}</option>
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
                  <td><time dateTime={DateTime.fromISO(item.foiaReq.datetime_submitted)}>{DateTime.fromISO(item.foiaReq.datetime_submitted).toLocaleString()}</time></td>
                  <td>{item.foiaReq.datetime_done && (
                    <time dateTime={DateTime.fromISO(item.foiaReq.datetime_done)}>{DateTime.fromISO(item.foiaReq.datetime_done).toLocaleString()}</time>
                  )}</td>
                  <td>{FoiaStatus.parse(item.foiaReq.status).label}</td>
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
