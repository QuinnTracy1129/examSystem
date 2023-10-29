import React, { useState, useEffect } from "react";
import {
  MDBAnimation,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { CUSTOMALERT, SAVE } from "../../../services/redux/slices/users";

const _form = {
  email: "",
  password: "",
  cPassword: "",
};

export default function Register() {
  const [isLocked, setIsLocked] = useState({
      password: true,
      confirmPassword: true,
    }),
    [form, setForm] = useState(_form),
    { message, isLoading, isSuccess } = useSelector(({ users }) => users),
    dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password, cPassword } = form;

    if (password !== cPassword)
      return dispatch(CUSTOMALERT("Passwords does not match."));

    dispatch(
      SAVE({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setForm(_form);
      document.getElementById("registration-form").reset();
    }
  }, [isSuccess]);

  return (
    <MDBRow className="flex-center pt-5 mt-3">
      <MDBCol md="6" className="text-center text-md-left mb-5">
        <MDBAnimation type="fadeInLeft">
          <div className="white-text">
            <h1 className="h1-responsive font-weight-bold">
              Join us right now!
            </h1>
            <hr className="hr-light" />
            <h6>
              Welcome to your gateway to stress-free online examinations.
              Discover a user-friendly platform that provides a wide variety of
              exams and assessments. Whether you're a student, professional, or
              an organization, we've got your examination needs covered. Join us
              and experience a new era of convenient and efficient online
              testing.
            </h6>
          </div>
        </MDBAnimation>
      </MDBCol>
      <MDBCol md="6" className="col-xl-5 offset-xl-1">
        <MDBAnimation type="fadeInRight">
          <form
            onSubmit={handleSubmit}
            id="registration-form"
            autoComplete="off"
          >
            <MDBCard>
              <MDBCardBody>
                <div className="text-center">
                  <h3 className="white-text">
                    <MDBIcon icon="user" className="white-text" /> Register
                  </h3>
                  <hr className="hr-light" />
                </div>

                <MDBInput
                  label="E-mail Address"
                  icon="envelope"
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  value={form.email}
                  type="email"
                  labelClass="white-text"
                  iconClass="white-text"
                  name="email"
                  required
                />
                <MDBInput
                  label="Password"
                  minLength={8}
                  icon={isLocked.password ? "lock" : "unlock"}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  value={form.password}
                  onIconMouseEnter={() =>
                    setIsLocked({ ...isLocked, password: false })
                  }
                  onIconMouseLeave={() =>
                    setIsLocked({ ...isLocked, password: true })
                  }
                  type={isLocked.password ? "password" : "text"}
                  labelClass="white-text"
                  iconClass="white-text"
                  name="password"
                  required
                />
                <MDBInput
                  label="Confirm your password"
                  minLength={8}
                  icon={isLocked.confirmPassword ? "lock" : "unlock"}
                  onChange={e =>
                    setForm({ ...form, cPassword: e.target.value })
                  }
                  value={form.cPassword}
                  onIconMouseEnter={() =>
                    setIsLocked({ ...isLocked, confirmPassword: false })
                  }
                  onIconMouseLeave={() =>
                    setIsLocked({ ...isLocked, confirmPassword: true })
                  }
                  type={isLocked.confirmPassword ? "password" : "text"}
                  labelClass="white-text"
                  iconClass="white-text"
                  name="confirmPassword"
                  required
                />

                <MDBInput
                  label="I read and agree with the Terms and Conditions"
                  labelClass="white-text"
                  type="checkbox"
                  id="agreement"
                  required
                />

                {message && (
                  <div
                    className={`alert alert-${
                      isSuccess ? "success" : "warning"
                    } text-center mt-3`}
                  >
                    {message}
                  </div>
                )}

                <div className="text-center mt-4">
                  <MDBBtn
                    disabled={isLoading}
                    type="submit"
                    color="light-blue"
                    rounded
                  >
                    {isLoading ? <MDBIcon icon="spinner" spin /> : "Sign up"}
                  </MDBBtn>
                  <hr className="hr-light mb-3 mt-4" />

                  {/* <div className="inline-ul text-center d-flex justify-content-center">
                  <MDBIcon
                    fab
                    icon="google"
                    size="lg"
                    className="white-text p-2 m-2 cursor-pointer"
                  />
                  <MDBIcon
                    fab
                    icon="facebook"
                    size="lg"
                    className="white-text p-2 m-2 cursor-pointer"
                  />
                  <MDBIcon
                    fab
                    icon="yahoo"
                    size="lg"
                    className="white-text p-2 m-2 cursor-pointer"
                  />
                </div> */}
                </div>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBAnimation>
      </MDBCol>
    </MDBRow>
  );
}
