import React, { useContext, useState, Fragment, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

import profile from "./profile.jpg";
import ReactRoundedImage from "react-rounded-image";
import { IoIosTime } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import { API } from "../../backend";
import moment from "moment-timezone";
// import TimezonePicker from "react-bootstrap-timezone-picker";
import {
  Jumbotron,
  Button,
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Navbar,
  Nav,
} from "reactstrap";
import { DoctorContext } from "../../Context/DoctorContext";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
import { Redirect, useHistory } from "react-router-dom";
// import TimePicker from "react-time-picker";
// import fetchSlot from "./backend/backend";
// const arr = [
//   {
//     date: new Date(),
//     slo1: "",
//     slot2: "",
//     slot3: "",
//     slot4: "bb",
//     slot5: "",
//     slot6: "",
//     slot7: "",
//   },
// ];
const doctors = [
  {
    id: 1,
    name: "Dr. Atal Patra",
    email: "atal@test.com",
    password: "atal12345",
    speciality: "General Physician",
    website: "https://test.com",
  },
];
const Screen3 = () => {
  const context = useContext(UserContext);
  // console.log(context);
  const doctorcontext = useContext(DoctorContext);
  const [date, setDate] = useState(new Date());
  const [dateClicked, setDateClicked] = useState();
  // const [buttonClicked, setButtonClicked] = useState(false);
  const [time, setTime] = useState(null);
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [addGuest, setAddGuest] = useState(false);
  const [id, setId] = useState(0);
  const [slot1, setSlot1] = useState(0);
  const [slot2, setSlot2] = useState(0);
  const [slot3, setSlot3] = useState(0);
  const [slot4, setSlot4] = useState(0);
  const [slot5, setSlot5] = useState(0);
  const [slot6, setSlot6] = useState(0);
  const [slot7, setSlot7] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [guests, setGuests] = useState("");
  const [finalClick, setFinalClick] = useState(false);
  const [datesDisable, setDatesDisable] = useState([]);
  const [datesDisableSaturday, setDatesDisableSaturday] = useState([]);
  const [logout, setLogout] = useState(false);
  // console.log(context);
  // const userid = useState(context.user.id);
  let history = useHistory();
  const handleback = () => {
    history.push("/Screen2");
    // return <Redirect to="/screen2" />;
  };

  useEffect(() => {
    axios
      .get(`${API}/getfullslots`)
      .then((response) => {
        console.log("responsdeeee", response.data);
        // console.log(moment(response.data[0].date).day());
        let arr = [];
        response.data.forEach((element) => {
          console.log(element.date);
          // setDatesDisable([...datesDisable, element.date]);
          arr.push(element.date);
        });
        setDatesDisable([...arr]);
      })
      .catch((error) => {
        console.log("dis error", error);
      });
    axios
      .get(`${API}/getfullslotssaturday`)
      .then((response) => {
        // console.log("SAT", response.data);
        // console.log(moment(response.data[0].date).day());
        let arr1 = [];
        response.data.forEach((element) => {
          if (moment(element.date).day() === 6)
            // console.log("SAT", element.date);
            // setDatesDisable([...datesDisable, element.date]);
            arr1.push(element.date);
        });
        setDatesDisableSaturday([...arr1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("use", date);
    axios
      .get(`${API}/getid`, {
        params: {
          date: moment
            .tz(date.toISOString(), "Asia/Kolkata")
            .format()
            .slice(0, 19),
        },
      })
      .then(function (response) {
        if (response.data[0]) {
          console.log("IDDDDD", response.data[0].id);
          setId(response.data[0].id);
        } else {
          setId(0);
          // console.log("id after setting 0", id);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [date]);
  useEffect(() => {
    console.log("id changed to -", id);
    if (id !== 0) {
      axios
        .get(`${API}/getDates/slot1/${id}`)
        .then((response) => {
          var firstKey = Object.keys(response.data[0])[0];
          console.log(response.data[0][firstKey].data[0]);
          setSlot1(response.data[0][firstKey].data[0]);
        })
        .catch((error) => console.log(error));
      axios
        .get(`${API}/getDates/slot2/${id}`)
        .then((response) => {
          var firstKey = Object.keys(response.data[0])[0];
          console.log(response.data[0][firstKey].data[0]);
          setSlot2(response.data[0][firstKey].data[0]);
        })
        .catch((error) => console.log(error));
      axios
        .get(`${API}/getDates/slot3/${id}`)
        .then((response) => {
          var firstKey = Object.keys(response.data[0])[0];
          console.log(response.data[0][firstKey].data[0]);
          setSlot3(response.data[0][firstKey].data[0]);
        })
        .catch((error) => console.log(error));
      axios
        .get(`${API}/getDates/slot4/${id}`)
        .then((response) => {
          var firstKey = Object.keys(response.data[0])[0];
          console.log(response.data[0][firstKey].data[0]);
          setSlot4(response.data[0][firstKey].data[0]);
        })
        .catch((error) => console.log(error));
      axios
        .get(`${API}/getDates/slot5/${id}`)
        .then((response) => {
          var firstKey = Object.keys(response.data[0])[0];
          console.log(response.data[0][firstKey].data[0]);
          setSlot5(response.data[0][firstKey].data[0]);
        })
        .catch((error) => console.log(error));
      axios
        .get(`${API}/getDates/slot6/${id}`)
        .then((response) => {
          var firstKey = Object.keys(response.data[0])[0];
          console.log(response.data[0][firstKey].data[0]);
          setSlot6(response.data[0][firstKey].data[0]);
        })
        .catch((error) => console.log(error));
      axios
        .get(`${API}/getDates/slot7/${id}`)
        .then((response) => {
          var firstKey = Object.keys(response.data[0])[0];
          console.log(response.data[0][firstKey].data[0]);
          setSlot7(response.data[0][firstKey].data[0]);
        })
        .catch((error) => console.log(error));
    } else if (id === 0) {
      setSlot1(0);
      setSlot2(0);
      setSlot3(0);
      setSlot4(0);
      setSlot5(0);
      setSlot6(0);
      setSlot7(0);
    }
  }, [id]);
  const handleChange = (date1) => {
    // arr[1] = { ...arr[0], date: date, slot1: "asss" };
    setDate(date1);
    // console.log("Date --", date);

    setDateClicked(date);
    // console.log("local", localStorage.userid);
  };
  // if (!context) {
  //   return <Redirect to="/screen2" />;
  // }

  const onConfirmClick = () => {
    setIsConfirmClicked(true);
    setDateClicked(null);
  };
  const onAddGuestClicked = (e) => {
    e.preventDefault();
    setAddGuest(true);
  };
  const isAMorPM = (s) => {
    if (s < 12) return "AM";
    else return "PM";
  };
  const handleBooking = (e) => {
    e.preventDefault();
    if (name === "") return alert("name cannot be blank");
    if (email === "") return alert("email cannot be blank");
    console.log(
      "BOOKING",
      name,
      date.toISOString().slice(0, 10).replace("T", " "),
      email,
      guests,
      details,
      slot1,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
      slot7
    );
    console.log("id in final", id);
    if (id === 0) {
      axios
        .post(`${API}/postData`, {
          date: date.toISOString().slice(0, 19).replace("T", " "),
          //patient_name: name,
          //patient_email: email,
          // guests,
          // details,
          slot1,
          slot2,
          slot3,
          slot4,
          slot5,
          slot6,
          slot7,
        })
        .then(function (response) {
          console.log("RESPONSE OF POST", response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (id !== 0) {
      console.log("inside id", slot1, slot2, slot3, slot4, slot5, slot6, slot7);
      axios
        .put(`${API}/updateslot/${id}`, {
          slot1,
          slot2,
          slot3,
          slot4,
          slot5,
          slot6,
          slot7,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    axios
      .post(`${API}/postDataBookingDetails`, {
        date: date.toISOString().slice(0, 19).replace("T", " "),
        patient_name: name,
        patient_email: email,
        guests,
        details,
        patient_id: localStorage.userid,
        doctor_id: doctors[0].id,
        start_time: time,
      })
      .then(function (response) {
        console.log("RESPONSE OF POST booking details", response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(time);
    // console.log("patient id", context.user.id);
    // console.log("doctor id", doctorcontext.doctor.id);
    setName("");
    setEmail("");
    setGuests("");
    setDetails("");
    setFinalClick(true);
  };
  let h = useHistory();
  // const handleLogout = () => {
  //   localStorage.removeItem("userid");
  //   console.log("before", context);
  //   context.setUser(null);
  //   // console.log("after", context);

  //   // h.push("/usersignin");
  //   // history.push("/usersignin");
  //   // return <Redirect to="/usersignin" />;
  //   // console.log(context);
  //   // if (!localStorage.getItem("userid")) h.push("/usersignin");
  //   setLogout(true);
  // };
  // useEffect(() => {
  //   if (localStorage.getItem("userid")) {
  //     console.log("log out");
  //   }
  // });
  if (!context.user) {
    h.push("/usersignin");
  }
  // console.log("kk", context);

  return (
    <div>
      {/* <h1>Screen 3 {context.user?.name}</h1> */}
      {/* <Navbar color="dark" className="flex">
        <Nav className="ml-auto">
          <Button className="float-right" color="info" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar> */}
      <Jumbotron
        className=" flex mx-auto shadow-lg   bg-white rounded my-5 hh"
        style={{ width: "150vh" }}
      >
        <Container fluid>
          {finalClick === false ? (
            <Fragment>
              <Row>
                <Col
                  style={{ width: "40vh", height: "70vh", overflowY: "auto" }}
                >
                  <Card className="border-0">
                    <ReactRoundedImage
                      image={profile}
                      // roundedColor="#66A5CC"
                      imageWidth="120"
                      imageHeight="120"
                      roundedSize="0"
                      className="ml-4"
                    />
                    <CardBody>
                      <CardTitle className="font-weight-bold text-muted">
                        {doctors[0].name}
                      </CardTitle>
                      <CardSubtitle>
                        <h3>{doctors[0].speciality}</h3>
                      </CardSubtitle>
                      <CardText className="small">
                        {doctors[0].website}
                      </CardText>
                      <CardText className="text-muted font-weight-bold">
                        <IoIosTime className="mr-1" size={20} /> 1 hr
                      </CardText>
                      <CardText className="text-muted font-weight-bold">
                        <FaVideo className="mr-1" size={20} /> Web conferencing
                        details provided upon confirmation.
                      </CardText>
                      {isConfirmClicked === false ? (
                        <Fragment>
                          <CardText>Hello, There!</CardText>
                          <CardText>Greetings!</CardText>
                          <CardText>
                            Please choose a <b>1-hour time-slot</b> as per your
                            availability.
                          </CardText>
                          <CardSubtitle>Thanks & Regards</CardSubtitle>
                          <CardSubtitle>{doctors[0].name}</CardSubtitle>
                          <CardSubtitle>{doctors[0].website}</CardSubtitle>
                        </Fragment>
                      ) : (
                        //TEXT AFTER CONFIRM CLICKED
                        <Fragment>
                          {/* TEXT after confirm button clicked */}
                          <CardText className="text-success font-weight-bold">
                            <AiTwotoneCalendar className="mr-1" size={24} />
                            {
                              (parseInt(
                                date.toString().split(" ")[4].substring(0, 2)
                              ) > 12
                                ? (
                                    parseInt(
                                      date
                                        .toString()
                                        .split(" ")[4]
                                        .substring(0, 2)
                                    ) - 12
                                  ).toString()
                                : date
                                    .toString()
                                    .split(" ")[4]
                                    .substring(0, 2)) +
                                " " +
                                isAMorPM(
                                  date.toString().split(" ")[4].substring(0, 2)
                                ) +
                                "-" +
                                (parseInt(
                                  date.toString().split(" ")[4].substring(0, 2)
                                ) < 12
                                  ? parseInt(
                                      date
                                        .toString()
                                        .split(" ")[4]
                                        .substring(0, 2)
                                    ) + 1
                                  : parseInt(
                                      date
                                        .toString()
                                        .split(" ")[4]
                                        .substring(0, 2)
                                    ) +
                                    1 -
                                    12) +
                                " " +
                                isAMorPM(
                                  parseInt(
                                    date
                                      .toString()
                                      .split(" ")[4]
                                      .substring(0, 2)
                                  ) + 1
                                ) +
                                ", " +
                                date.toString().split(" ")[0] +
                                ", " +
                                date.toString().split(" ")[1] +
                                " " +
                                date.toString().split(" ")[2] +
                                ", " +
                                date.toString().split(" ")[3]
                              // .substring(0, date.toString().indexOf("("))}
                            }
                          </CardText>
                          <CardText className="text-muted font-weight-bold">
                            <BiWorld className="mr-1 ml-0" size={24} />
                            {date
                              .toString()
                              .substring(
                                date.toString().indexOf("(") + 1,
                                date.toString().length - 1
                              )}
                          </CardText>
                        </Fragment>
                      )}
                    </CardBody>
                  </Card>
                </Col>
                {isConfirmClicked === false ? (
                  <Col
                    style={{
                      width: "60vh",
                      height: "70vh",
                      display: "inline-block",
                    }}
                  >
                    <h4>Select Date & Time</h4>
                    <Calendar
                      onChange={handleChange}
                      value={date}
                      tileDisabled={({ date }) =>
                        date.getDay() === 0 ||
                        (date.getDate() !== new Date().getDate() &&
                          date < new Date()) ||
                        datesDisable.includes(date.toISOString()) ||
                        datesDisableSaturday.includes(date.toISOString())
                      }
                    />
                    {/* <TimezonePicker
                  absolute={false}
                  defaultValue="Europe/Moscow"
                  placeholder="Select timezone..."
                  onChange={this.handleChange}
                /> */}
                  </Col>
                ) : (
                  <Col>
                    <h4>Enter Details</h4>
                    <Form onSubmit={handleBooking}>
                      <FormGroup>
                        <Label for="Name">
                          Name <sup>*</sup>
                        </Label>

                        <Input
                          type="text"
                          name="Name"
                          id="Name"
                          placeholder="Enter your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">
                          Email <sup>*</sup>
                        </Label>

                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                      {addGuest === false ? (
                        <Button
                          color="outline-primary mb-2"
                          onClick={(e) => onAddGuestClicked(e)}
                        >
                          Add Guests
                        </Button>
                      ) : (
                        <FormGroup>
                          <Label for="addGuests">
                            Add Guest Details (maximum 10)
                          </Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="addGuests"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                          />
                        </FormGroup>
                      )}
                      <FormGroup>
                        <Label for="TextArea">
                          Please share anything that will help prepare for our
                          meeting.
                        </Label>
                        <Input
                          type="textarea"
                          name="text"
                          id="TextArea"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                        />
                      </FormGroup>
                      <Button color="primary">
                        <b>Schedule Appointment</b>
                      </Button>
                    </Form>
                  </Col>
                )}

                {dateClicked ? (
                  <Col sm={3} className="text-muted font-weight-bold">
                    <Row className="mb-2">
                      <span>
                        {date.toString().split(" ")[0] +
                          ", " +
                          date.toString().split(" ")[1] +
                          " " +
                          date.toString().split(" ")[2]}
                      </span>
                    </Row>
                    <Row>
                      <span className="text-info mb-2">
                        Available Time Slots:
                      </span>
                    </Row>
                    <Container fluid />
                    <Row>
                      <Col>
                        <Row>
                          {slot1 === 0 ? (
                            <Button
                              className="mx-5 my-2 font-weight-bold"
                              color="outline-primary"
                              block
                              onClick={() => {
                                setSlot1(1);
                                setTime("9:00:00");
                                date.setHours("9");
                              }}
                            >
                              9 AM
                            </Button>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row>
                          {slot2 === 0 ? (
                            <Button
                              className="mx-5 my-2 p-2 font-weight-bold"
                              color="outline-primary"
                              block
                              onClick={() => {
                                setSlot2(1);
                                setTime("10:00:00");
                                date.setHours("10");
                              }}
                            >
                              10 AM
                            </Button>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row>
                          {slot3 === 0 ? (
                            <Button
                              className="mx-5 my-2 p-2 font-weight-bold"
                              color="outline-primary"
                              block
                              onClick={() => {
                                setSlot3(1);
                                setTime("11:00:00");
                                date.setHours("11");
                              }}
                            >
                              11 AM
                            </Button>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row>
                          {slot4 === 0 ? (
                            <Button
                              className="mx-5 my-2 p-2 font-weight-bold"
                              color="outline-primary"
                              block
                              onClick={() => {
                                setSlot4(1);
                                setTime("12:00:00");
                                date.setHours("12");
                              }}
                            >
                              12 PM
                            </Button>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row>
                          {date.getDay() !== 6 && slot5 === 0 ? (
                            <Button
                              className="mx-5 my-2 font-weight-bold"
                              color="outline-primary"
                              block
                              onClick={() => {
                                setSlot5(1);
                                setTime("14:00:00");
                                date.setHours("14");
                              }}
                            >
                              2 PM
                            </Button>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row>
                          {date.getDay() !== 6 && slot6 === 0 ? (
                            <Button
                              className="mx-5 my-2 font-weight-bold"
                              color="outline-primary"
                              block
                              onClick={() => {
                                setSlot6(1);
                                setTime("15:00:00");
                                date.setHours("15");
                              }}
                            >
                              3 PM
                            </Button>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row>
                          {date.getDay() !== 6 && slot7 === 0 ? (
                            <Button
                              className="mx-5 my-2 font-weight-bold"
                              color="outline-primary"
                              block
                              onClick={() => {
                                setSlot7(1);
                                setTime("16:00:00");
                                date.setHours("16");
                              }}
                            >
                              4 PM
                            </Button>
                          ) : (
                            ""
                          )}
                        </Row>
                      </Col>
                      {time ? (
                        <Col>
                          <Row>
                            <Button
                              className="mx-5 mt-3"
                              color="primary"
                              block
                              onClick={onConfirmClick}
                            >
                              Confirm
                            </Button>
                          </Row>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </Fragment>
          ) : (
            <Fragment>
              <Container fluid>
                <Row>
                  <Col sm="15" md={{ size: 6, offset: 3 }}>
                    <h3 className="text-success font-weight-bold ml-5 offset-lg-6 ">
                      Thank You!
                    </h3>
                    <h6 className="text-muted font-weight-bold">
                      {" "}
                      Your Appointment has been scheduled Successfully
                    </h6>
                    <Button color="outline-success" onClick={handleback}>
                      Back
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Fragment>
          )}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Screen3;
