import React, { useContext } from "react";
import { Navbar, Nav, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { DoctorContext } from "../Context/DoctorContext";
import { UserContext } from "../Context/UserContext";
const NavBar = () => {
  const doctorcontext = useContext(DoctorContext);
  const usercontext = useContext(UserContext);
  let history = useHistory();
  const handleHome = () => {
    console.log(doctorcontext);
    history.push("/");
  };
  const handleDoctorLogout = () => {
    doctorcontext.setDoctor(null);
    console.log(doctorcontext);
    history.push("/");
  };
  const handleUserLogout = () => {
    localStorage.removeItem("userid");
    console.log("before", usercontext);
    usercontext.setUser(null);
    // console.log("after", context);

    // h.push("/usersignin");
    // history.push("/usersignin");
    // return <Redirect to="/usersignin" />;
    // console.log(context);
    // if (!localStorage.getItem("userid")) h.push("/usersignin");
    // setLogout(true);
  };
  return (
    <div>
      <Navbar
        className="mb-2"
        style={{ background: "rgba(63, 140, 191, 0.2)" }}
      >
        <Nav className="ml-auto">
          <Button className="m-3" onClick={handleHome} color="info">
            Home
          </Button>
          {doctorcontext.doctor && (
            <Button className="m-3" onClick={handleDoctorLogout} color="info">
              Logout
            </Button>
          )}
          {usercontext.user && (
            <Button className="m-3" onClick={handleUserLogout} color="info">
              Logout
            </Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
