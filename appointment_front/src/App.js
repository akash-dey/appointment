import React, { useState, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Screen2 from "./pages/Screen2";
import Screen3 from "./pages/Screen3";
import Home from "./pages/Home";
import { UserContext } from "./Context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { DoctorContext } from "./Context/DoctorContext";
import DoctorSignIn from "./pages/DoctorSignIn";
import DoctorBookings from "./pages/DoctorBookings";
import NavBar from "./components/Navbar";
function App() {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  return (
    <Fragment>
      <UserContext.Provider value={{ user, setUser }}>
        <DoctorContext.Provider value={{ doctor, setDoctor }}>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/doctorsignin" component={DoctorSignIn} />
              <Route exact path="/usersignin" component={SignIn} />
              <Route exact path="/doctorbookings" component={DoctorBookings} />
              <Route exact path="/Screen2" component={Screen2} />
              <Route exact path="/Screen3" component={Screen3} />
            </Switch>
          </Router>
        </DoctorContext.Provider>
      </UserContext.Provider>
    </Fragment>
  );
}

export default App;
