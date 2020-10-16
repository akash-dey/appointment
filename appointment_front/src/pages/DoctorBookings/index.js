import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import moment from "moment-timezone";
import { API } from "../../backend";
const DoctorBookings = () => {
  const [modal, setModal] = useState(false);
  const [modaltitle, setModalTitle] = useState();
  const [eventsArray, setEventsArray] = useState([]);
  const [modalbody, setModalbody] = useState();
  const [email, setEmail] = useState();
  const [guests, setGuests] = useState();
  const [details, setDetails] = useState();
  const [date, setDate] = useState();
  useEffect(() => {
    axios
      .get(`${API}/getDetails`)
      .then((response) => {
        let arr = response.data;
        // console.log("arr", arr);
        arr.forEach((element) => {
          let title = element.patient_name;
          let date = moment
            .tz(element.date, moment.tz.guess())
            .format()
            .slice(0, 10);
          let d = new Date(date).toString().substring(0, 15);
          // setDate(d.toString().substring(0, 15));
          // console.log(date);
          let start = element.start_time;
          // console.log(start);
          let end = parseInt(start.substring(0, 2)) + 1 + start.substring(2);
          // console.log(end);
          let email = element.patient_email;
          let guests = element.guests;
          let details = element.details;
          setEventsArray((eventsArray) => [
            ...eventsArray,
            {
              title,
              start: `${date}T${start}`,
              end: `${date}T${end}`,
              date_body: d,
              email,
              guests,
              details,
            },
          ]);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const toggle = () => setModal(!modal);

  const onEventClick = (e) => {
    toggle();
    setModalTitle(e.event._def.title);
    // console.log(eventsArray);
    // console.log(e.event._def.extendedProps);
    let startTime = "";
    if (e.event.start.getHours() === 12) startTime = "12 PM";
    else if (e.event.start.getHours() < 12)
      startTime = e.event.start.getHours() + " AM";
    else startTime = e.event.start.getHours() - 12 + " PM";

    let endTime = "";
    if (e.event.start.getHours() + 1 === 12) endTime = "12 PM";
    else if (e.event.start.getHours() + 1 < 12)
      endTime = e.event.start.getHours() + 1 + " AM";
    else endTime = e.event.start.getHours() + 1 - 12 + " PM";

    let str = startTime + "-" + endTime;
    setModalbody(str);
    setDate(e.event.extendedProps.date_body);
    setGuests(e.event.extendedProps.guests);
    setDetails(e.event.extendedProps.details);
    setEmail(e.event.extendedProps.email);

    // console.log(date);
  };
  const onMouseEnter = (e) => {
    e.el.style.backgroundColor = "rgba(55, 128, 6,0.7)";
    e.el.style.cursor = "pointer";
  };
  const onMouseLeave = (e) => {
    e.el.style.backgroundColor = "#378006";
  };
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventsArray}
        eventClick={(e) => onEventClick(e)}
        eventDisplay="block"
        eventColor="#378006"
        eventBorderColor="rgba(0,0,0,0.3)"
        eventMouseEnter={(e) => onMouseEnter(e)}
        eventMouseLeave={(e) => onMouseLeave(e)}
        // contentHeight="100vh"
        height="100vh"
      />
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="text-info" toggle={toggle}>
          <b>{modaltitle}</b>
        </ModalHeader>
        <ModalBody className="text-muted font-weight-bold">
          Scheduled Appointment :: {"\u00A0"}
          <span className="text-success">
            {modalbody}, {date}
          </span>
          <br />
          <span>Email ID ::</span>
          <span className="text-success"> {email}</span>
          <br />
          <span>Guests (if any) ::</span>
          <span className="text-success"> {guests}</span>
          <br />
          <span>Additional Details ::</span>
          <span className="text-success"> {details}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DoctorBookings;
