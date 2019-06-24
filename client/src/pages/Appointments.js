import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import moment from "moment";

class Books extends Component {
  state = {
    appointments: [],
    title: "",
    client: "",
    member: "",
    starttime: "",
    endtime: "",
  };

  componentDidMount() {
    this.loadAppointments();
  }

  loadAppointments = () => {
    API.getAppointments()
      .then(res =>
        this.setState({ appointments: res.data, title: "", client: "", member: "", starttime: "", endtime: "" })
      )
      .catch(err => console.log(err));
  };

  deleteAppointment = id => {
    API.deleteAppointment(id)
      .then(res => this.loadAppointments())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.client) {
      API.saveAppointment({
        title: this.state.title,
        client: this.state.client,
        member: this.state.member
      })
        .then(res => this.loadAppointments())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
          <Jumbotron>
              <h1>Schedule an Appointment</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Appointment (required)"
              />
              <Input
                value={this.state.client}
                onChange={this.handleInputChange}
                name="client"
                placeholder="Client (required)"
              />
              <TextArea
                value={this.state.member}
                onChange={this.handleInputChange}
                name="member"
                placeholder="Member (Optional)"
              />
              <FormBtn
                disabled={!(this.state.client && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Appointment
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Appointments On My List</h1>
            </Jumbotron>
            {this.state.appointments.length ? (
              <List>
                {this.state.appointments.map(appointments => (
                  <ListItem key={appointments._id}>
                    <Link to={"/appointments/" + appointments._id}>
                      <strong>
                      {appointments.title} by {appointments.client} at {moment(appointments.starttime).format("MMMM Do YYYY, h:mm:ss a").toString()}  - {moment(appointments.endtime).format("MMMM Do YYYY, h:mm:ss a").toString()}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteAppointment(appointments._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;