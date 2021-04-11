import React from "react";
import { useAsync } from "react-async";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sandbox from "./pages/Sandbox";
import getMuckrockData from "./utils/getMuckrockData";
import "normalize.css";
import "./astoria-tech-design.css";
import "./styles.css";


function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: getMuckrockData });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) return <p>No data</p>;

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path = "/sandbox">
            <Sandbox 
              data = {data}
            />
          </Route>
          <Route path = "/">
            <Home 
              data = {data}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
