import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
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
const patients = [
  {
    id: 1,
    name: "Akash Dey",
    email: "akash@test.com",
    password: "a@12345",
  },
  { id: 2, name: "Kabir Thapar", email: "kabir@test.com", password: "k@12345" },
  { id: 3, name: "Naina Talwar", email: "naina@test.com", password: "n@12345" },
];
const SignIn = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log("signed.in");
    console.log(context.user);

    // return <Redirect to="/Screen2" />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = patients.findIndex((item) => item.email === email);
    // console.log(index);

    if (index === -1) {
      return toast.error("User Not Signed Up!", {
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

    if (patients[index].password !== password) {
      //   return alert("Incorrect Password");
      return toast.error("Incorrect Password", {
        position: "top-center",
      });
    }
    context.setUser(patients[index]);
    handleSignUp();
  };

  if (context.user?.id) {
    return <Redirect to="/Screen2" />;
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

export default SignIn;
