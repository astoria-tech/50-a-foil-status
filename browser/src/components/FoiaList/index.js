import React, { useState } from "react";
import { DateTime } from "luxon";
import { FoiaStatus } from "../../utils/FoiaStatus";
import { FeeRange } from "../../utils/FeeRange";
import { TurnaroundTime } from "../../utils/TurnaroundTime";


const FoiaList = (props) => {
  const filterData = {};
  const [filters, setFilters] = useState({});

  function applyFilter(item) {
    if (!Object.getOwnPropertyNames(filters).length) return true;
    let isVisible = [0];
    for (let key in filters) {
      if (key === "turnaroundTime" && filters[key]) {
        console.log(TurnaroundTime.parse(item.foiaReq.datetime_submitted, item.foiaReq.datetime_done))
        console.log(filters[key])
        isVisible.push(
          TurnaroundTime.parse(item.foiaReq.datetime_submitted, item.foiaReq.datetime_done) === filters[key] ? 0 : 1
        );
      }
      else if (key === "price" && filters[key]) {
        isVisible.push(FeeRange.parse(item.foiaReq.price) === filters[key] ? 0 : 1);
      }
      else if (key === "status" && filters[key] && filters[key].value) {
        isVisible.push(filters[key].value === item.foiaReq.status ? 0 : 1);
      }
    };
    return isVisible.reduce((acc, val) => acc + val) === 0;
  }
  
  filterData.statuses = FoiaStatus.all;
  filterData.prices = FeeRange.all;
  filterData.turnaroundTimes = TurnaroundTime.all;

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
            <select id="foia-list-turnaround" onChange={event => setFilters({...filters, turnaroundTime: filterData.turnaroundTimes.find(time => time.value === event.target.value)})}>
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
