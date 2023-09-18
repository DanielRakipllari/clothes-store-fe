import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import routes from "./Config/route-config";
import configureValidations from "./Config/Validations";
import { useState } from "react";
import { claim } from "./Auth/auth.models";
import AuthenticationContext from "./Auth/AuthenticationContext";
import './Uitls/App.css';
import AppFooter from "./Components/Home/AppFooter";
configureValidations();
function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "Admin"
      ) > -1
    );
  }
  return (
    <>
      <Router>
        <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
          <Navbar />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isAdmin && !isAdmin() ? (
                    <>You are not aothorized to see this page!</>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </AuthenticationContext.Provider>
      </Router>
      <AppFooter/>

    </>
  );
}

export default App;
