import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBInput,
} from "mdbreact";
import DataTable from "../../../../components/dataTable";
import { FIND, RESET } from "../../../../services/redux/slices/questionnaires";
import { UPDATE, SAVE } from "../../../../services/redux/slices/exams";
import { QuestionTypes } from "../../../../services/fakeDb";
import { globalSearch } from "../../../../services/utilities";
import Swal from "sweetalert2";

const _form = {
  title: "",
  minutes: 60,
  passingScore: 1,
  totalScore: 1,
  bank: [],
};

export default function Modal({ show, toggle, selected, willCreate }) {
  const [form, setForm] = useState(selected._id ? selected : _form),
    [questionnaires, setQuestionnaires] = useState([]),
    { collections, isLoading } = useSelector(
      ({ questionnaires }) => questionnaires
    ),
    { token, auth } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  useEffect(() => {
    if (token)
      dispatch(
        FIND({
          token,
        })
      );

    return () => dispatch(RESET());
  }, [token, dispatch]);

  useEffect(() => {
    setQuestionnaires(collections);
  }, [collections]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleUpdate = () => {
    toggle();

    dispatch(
      UPDATE({
        data: { ...form, _id: selected._id },
        token,
      })
    );

    setForm(_form);
  };

  const handleCreate = () => {
    dispatch(
      SAVE({
        data: { ...form, createdBy: auth._id },
        token,
      })
    );
    setForm(_form);
    toggle();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.bank.length)
      return Swal.fire({
        title: "Invalid Questionnaire",
        text: "Please choose a questionnaire",
        icon: "error",
      });

    if (willCreate) return handleCreate();

    handleUpdate();
  };

  const handleSearch = async (willSearch, key) => {
    if (willSearch) return setQuestionnaires(globalSearch(collections, key));

    setQuestionnaires(collections);
  };

  return (
    <MDBModal size="fluid" isOpen={show} toggle={toggle} backdrop>
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="book-open" className="mr-2" />
        {willCreate ? "Create" : "Update"} {selected.title || "an Exam"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <MDBRow>
          <MDBCol md="8">
            <DataTable
              liveInjector={selected.bank}
              liveSelector={bank => {
                setForm({
                  ...form,
                  bank,
                  totalScore: bank.reduce(
                    (total, q) => total + q.difficulty,
                    0
                  ),
                });
              }}
              isLoading={isLoading}
              title="Questionnaires"
              array={questionnaires}
              actions={[]}
              tableHeads={[
                {
                  _text: "Question",
                },
                {
                  _text: "Type",
                },
                {
                  _text: "Difficulty",
                },
                {
                  _text: "Created By",
                },
              ]}
              tableBodies={[
                {
                  _key: "question",
                },
                {
                  _key: "type",
                  _format: data => QuestionTypes.getLabel(data),
                },
                {
                  _key: "difficulty",
                  _format: data => QuestionTypes.getDifficulty(data),
                },
                {
                  _key: "createdBy",
                  _format: data => data.email,
                },
              ]}
              handleSearch={handleSearch}
            />
          </MDBCol>
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle className="d-flex justify-content-between">
                  Exam Details <span>QTY: {form.bank.length}</span>
                </MDBCardTitle>
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    type="text"
                    label="Title"
                    value={form.title}
                    onChange={e => handleChange("title", e.target.value)}
                    required
                  />
                  <MDBInput
                    type="number"
                    label={`Passing Score / ${form.totalScore}`}
                    value={form.passingScore}
                    max={form.totalScore}
                    onChange={e => handleChange("passingScore", e.target.value)}
                    required
                    disabled={!form.bank.length}
                  />
                  <MDBInput
                    type="number"
                    label="Timer (minutes)"
                    value={String(form.minutes)}
                    min="5"
                    onChange={e =>
                      handleChange("minutes", Number(e.target.value))
                    }
                    required
                    disabled={!form.bank.length}
                  />
                  <MDBBtn
                    type="submit"
                    className="w-100 mx-auto mt-3"
                    color="success"
                  >
                    submit
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBModalBody>
    </MDBModal>
  );
}
