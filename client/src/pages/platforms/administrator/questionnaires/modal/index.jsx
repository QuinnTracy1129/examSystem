import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdbreact";
import {
  SAVE,
  UPDATE,
} from "../../../../../services/redux/slices/questionnaires";
import CustomSelect from "../../../../../components/customSelect";
import { QuestionTypes } from "../../../../../services/fakeDb";
import BodySwitcher from "./bodySwitcher";
import Swal from "sweetalert2";

// declare your expected items
const _form = {
  question: "",
  difficulty: 1,
  answer: "",
};

export default function Modal({ show, toggle, selected, willCreate }) {
  const [type, setType] = useState(selected.type || "qna"),
    { isLoading } = useSelector(({ questionnaires }) => questionnaires),
    { token, auth } = useSelector(({ auth }) => auth),
    [form, setForm] = useState(selected._id ? selected : _form),
    dispatch = useDispatch();

  const handleUpdate = () => {
    toggle();

    let _data = { ...form, _id: selected._id };

    if (type === "enum") _data.answer = form.answer.filter(Boolean);

    if (type === "match") {
      _data.choices = form.choices.filter(c => c.value);
      _data.answer = form.answer.filter(a =>
        _data.choices.find(c => c.id === a.id)
      );
      _data.choices = _data.choices.map(({ value }, index) => ({
        id: index + 1,
        value,
      }));
      _data.answer = _data.answer.map(({ value }, index) => ({
        id: index + 1,
        value,
      }));
    }

    dispatch(
      UPDATE({
        data: _data,
        token,
      })
    );

    setForm(_form);
  };

  const handleCreate = () => {
    let _data = { ...form, createdBy: auth._id, type };

    if (type === "mc" && typeof form.answer === "number")
      _data.answer = form.choices[form.answer];

    if (type === "enum") _data.answer = form.answer.filter(Boolean);

    if (type === "match") {
      _data.choices = form.choices.filter(c => c.value);
      _data.answer = form.answer.filter(a =>
        _data.choices.find(c => c.id === a.id)
      );
      _data.choices = _data.choices.map(({ value }, index) => ({
        id: index + 1,
        value,
      }));
      _data.answer = _data.answer.map(({ value }, index) => ({
        id: index + 1,
        value,
      }));
    }

    dispatch(
      SAVE({
        data: _data,
        token,
      })
    );

    setType("qna");
    setForm(_form);
    toggle();
  };

  const handleError = (title, text) =>
    Swal.fire({
      title,
      text,
      icon: "error",
    });

  const handleSubmit = e => {
    e.preventDefault();

    const { answer, choices } = form;

    if (!type) return handleError("Invalid type", "Choose a question type");

    // I used if instead of switch because switch does not skip guard clauses
    if (type === "qna" && !answer)
      return handleError("Invalid answer", "Specify an answer");

    if (
      type === "mc" &&
      (choices.includes("") || [...new Set(choices)].length < 4)
    )
      return handleError(
        "Invalid choices",
        choices.includes("")
          ? "Complete all the choices."
          : "Choices must be unique to each other."
      );

    if (type === "enum" && answer.filter(Boolean).length < 2)
      return handleError("Invalid choices", "Create at least 2 answer.");

    if (type === "match" && typeof answer === "undefined")
      return handleError("Invalid pairs", "Create at least 1 pair of answer.");

    if (willCreate) {
      return handleCreate();
    }

    handleUpdate();
  };

  const handleChange = (key, value) =>
    setForm(prevForm => ({ ...prevForm, [key]: value }));

  const { question, difficulty } = form;

  return (
    <MDBModal size="lg" isOpen={show} toggle={toggle} backdrop>
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="chalkboard" className="mr-2" />
        {willCreate ? "Create" : "Update"} {selected.name || "a Questionnaire"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBRow>
            <MDBCol>
              <CustomSelect
                choices={QuestionTypes.collections}
                preValue={type}
                label="Type"
                values="name"
                texts="label"
                onChange={e => {
                  if (!willCreate && selected._id) return;
                  setForm({ ...form, ...QuestionTypes.getStructure(e) });
                  setType(e);
                }}
                disabledAllExceptSelected={!willCreate}
              />
            </MDBCol>
            <MDBCol>
              <CustomSelect
                choices={[
                  { id: 1, label: "Easy" },
                  { id: 2, label: "Medium" },
                  { id: 3, label: "Hard" },
                ]}
                preValue={difficulty}
                label="Difficulty"
                values="id"
                texts="label"
                onChange={e => handleChange("difficulty", Number(e))}
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            type="text"
            label={type === "match" ? "Instructions" : "Question"}
            value={question}
            onChange={e => handleChange("question", e.target.value)}
            required
          />

          <BodySwitcher
            type={type}
            handleChange={handleChange}
            form={form}
            setForm={setForm}
          />

          <div className="text-center mb-1-half">
            <MDBBtn
              type="submit"
              disabled={isLoading}
              color="info"
              className="mb-2"
              rounded
            >
              {willCreate ? "submit" : "update"}
            </MDBBtn>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
