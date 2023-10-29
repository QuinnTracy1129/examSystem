import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBMask,
  MDBView,
  MDBNavLink,
} from "mdbreact";
import "./index.css";
import Register from "./register";
import Login from "./login";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: "",
      show: false,
    };
  }

  toggle = () => this.setState({ show: !this.state.show });

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  render() {
    return (
      <div id="landing">
        <MDBNavbar dark expand="md" fixed="top" scrolling transparent>
          <MDBContainer>
            <MDBNavbarBrand>
              <strong className="white-text">Exam System</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
            <MDBCollapse
              id="navbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink onClick={this.toggle} to="#">
                    Login
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        <section id="home">
          <Login show={this.state.show} toggle={this.toggle} />
          <MDBView>
            <MDBMask
              className="d-flex justify-content-center align-items-center"
              overlay="gradient"
            >
              <MDBContainer className="h-100 d-flex justify-content-center align-items-center">
                <Register />
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </section>
      </div>
    );
  }
}
