import React, { useContext, useState, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
const DoctorSignIn = () => {
  const context = useContext(DoctorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log("signed.in");
    console.log(context.doctor);

    // return <Redirect to="/Screen2" />;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const index = doctors.findIndex((item) => item.email === email);
    // console.log(index);

    if (index === -1) {
      return toast.error("Doctor does not exist!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // return alert("User Not Signed Up!");
    }

    if (doctors[index].password !== password) {
      //   return alert("Incorrect Password");
      return toast.error("Incorrect Password", {
        position: "top-center",
      });
    }
    context.setDoctor(doctors[index]);
    handleSignUp();
  };
  if (context.doctor?.id) {
    return <Redirect to="/doctorbookings" />;
  }
  return (
    <Container className="text-center">
      <ToastContainer />
      <Row>
        <Col lg={6} className="offset-lg-3 mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="success">Sign In</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" block color="primary">
                  Sign In
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorSignIn;
