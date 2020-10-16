import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../Context/UserContext";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import profile from "./profile.jpg";
import {
  Jumbotron,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
  Navbar,
  Nav,
} from "reactstrap";
import { FaChevronRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { DoctorContext } from "../../Context/DoctorContext";
// const doctors = [
//   {
//     name: "Dr. Atal Patra",
//     speciality: "General Physician",
//     website: "https://test.com",
//   },
// ];

const Screen2 = () => {
  const context = useContext(UserContext);
  const doctorcontext = useContext(DoctorContext);
  const history = useHistory();
  console.log("doctor", doctorcontext);
  const [logoutClicked, setLogoutClicked] = useState(false);
  useEffect(() => {
    if (context.user) localStorage.setItem("userid", context.user.id);
  }, [context]);

  let h = useHistory();
  // const handleLogout = () => {
  //   // localStorage.removeItem("userid");
  //   context.setUser(null);
  //   // h.push("/usersignin");
  //   // setLogoutClicked(true);
  //   // history.push("/us");
  //   // if (!localStorage.getItem("userid")) h.push("/usersignin");
  // };
  if (!context.user?.id) {
    // return <Redirect to="/usersignin" />;
    // history.replace("/");
    history.push("/usersignin");
  }

  return (
    <div>
      {/* <h1>Screen 2</h1> */}
      {/* <h4>{context.user?.name}</h4> */}
      {/* <Navbar color="dark" className="flex">
        <Nav className="ml-auto">
          <Button className="float-right" color="info" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar> */}
      <Jumbotron
        className="mx-auto shadow-lg   bg-white rounded m-5"
        style={{ width: "100vh" }}
      >
        <Card
          className="flex text-center border-0"
          style={{ alignItems: "center" }}
        >
          <ReactRoundedImage
            image={profile}
            // roundedColor="#66A5CC"
            imageWidth="120"
            imageHeight="120"
            roundedSize="0"
            className="ml-5"
          />

          <CardBody>
            <CardTitle className="font-weight-bold text-muted">
              {doctorcontext.doctor?.name}
            </CardTitle>
            <CardSubtitle>{doctorcontext.doctor?.speciality}</CardSubtitle>
            <CardText className="small">
              {doctorcontext.doctor?.website}
            </CardText>
          </CardBody>
        </Card>
        <div
          onClick={() => {
            history.push("/Screen3");
          }}
          // className="text-decoration-none "
          id="carddiv"
          style={{ width: "40vh" }}
        >
          {/* TODO: */}
          <div className="flex p-4">
            <span className="mr-5">GeekyAnts</span>
            <FaChevronRight className="float-right mt-1 ml-5" />
          </div>
          <div className="p-4">
            Book a <b>1 hour</b> slot
          </div>
        </div>
      </Jumbotron>
    </div>
  );
};

export default Screen2;
