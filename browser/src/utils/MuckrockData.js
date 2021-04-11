const getMuckrockData = async () => {
  // When in production, the API is at the same domain as the frontend
  let latest;
  if (process.env.REACT_APP_DEPLOYMENT_MODE === "production") {
    latest = "/v1/latest";
  } else {
    latest = "http://localhost:3001/v1/latest";
  }

  return await fetch(latest)
    .then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json());
};

module.exports = { getMuckrockData };