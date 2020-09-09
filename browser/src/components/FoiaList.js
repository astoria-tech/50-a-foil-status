import React, { useState, useEffect } from "react";

const FoiaList = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/v1/latest")
      .then((data) => data.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return data ? (
    <div className="foia-list">
      {data.foiaList.map(item => (
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
                <td>Cost</td>
                <td>${item.foiaReq.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  ) : (
    <p>No data.</p>
  );
};

export default FoiaList;
