import React, { useEffect } from "react";
import { Button, Jumbotron, Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  const handlePatientClick = () => {
    history.push("/usersignin");
  };
  const handleDoctorClick = () => {
    history.push("/doctorsignin");
  };
  useEffect(() => {
    if (localStorage) localStorage.clear();
  });
  return (
    <div>
      <Jumbotron
        className="mx-auto shadow-lg bg-white rounded mt-5"
        style={{ width: "50vh" }}
      >
        <Card
          className="flex text-center border-0"
          style={{ alignItems: "center" }}
        >
          <CardBody>
            <h3 className="text-success font-weight-bold">Welcome!</h3>
            <Button
              color="outline-info m-5 "
              onClick={handlePatientClick}
              className="font-weight-bold"
            >
              Patient
            </Button>
            <Button
              color="outline-success"
              onClick={handleDoctorClick}
              className="font-weight-bold"
            >
              Doctor
            </Button>
          </CardBody>
        </Card>
      </Jumbotron>
    </div>
  );
};

export default Home;
