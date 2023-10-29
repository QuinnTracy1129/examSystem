import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdbreact";

export default function Dashboard() {
  return (
    <MDBContainer fluid>
      <div className="mb-5">
        <h4 className="text-left font-weight-bold dark-grey-text">
          Welcome to Exam System
        </h4>
        <p className="grey-text mt-3">
          As an Administrator, you can manage Questionnaires, Exams, Results and
          Users through the sidebar.
        </p>
        <hr />
      </div>
      <section className="mt-2">
        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="primary-color">
                <MDBIcon fixed icon="chalkboard" className="mr-3" />
                Questionnaires
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  The Questionnaires section allows you to create surveys and
                  data collection forms for a variety of purposes, such as
                  research, feedback gathering, or data analysis. Customize and
                  deploy questionnaires to collect valuable information from
                  your audience efficiently.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="warning-color">
                <MDBIcon fixed icon="book-open" className="mr-3" />
                Exams
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  With the Exams feature, you can efficiently manage educational
                  assessments, tests, and evaluations. This section helps
                  organize and evaluate your exams, making it a central hub for
                  academic assessment.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="info-color">
                <MDBIcon fixed icon="poll" className="mr-3" />
                Results
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  The Results section provides access to the outcomes of your
                  assessments, whether they are exams, surveys, or other data
                  collection forms. Analyze and interpret the collected data to
                  make informed decisions or track progress effectively.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader color="danger-color">
                <MDBIcon fixed icon="users" className="mr-3" />
                Users
              </MDBCardHeader>
              <MDBCardBody>
                <p className="font-small grey-text">
                  Users management is essential for controlling access and
                  permissions on your platform. In this section, you can
                  efficiently manage user accounts, roles, and permissions to
                  ensure a secure and organized user experience on your website.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}
