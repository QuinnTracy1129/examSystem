import React, { useEffect, useState } from "react";
import BodySwitcher from "./bodySwitcher";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";
import CountdownTimer from "./timer";
import { QuestionTypes } from "../../services/fakeDb";
import { useDispatch, useSelector } from "react-redux";
import { SAVE } from "../../services/redux/slices/results";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router";

const QuestionCard = ({
  questionnaire,
  handleNext,
  index,
  handleChange,
  result,
  total,
}) => {
  const { _id, type, question } = questionnaire;

  return (
    <MDBCard key={_id}>
      <MDBCardBody>
        <MDBCardTitle>
          #{index + 1}. {question}
        </MDBCardTitle>
        <div style={{ minHeight: "200px" }}>
          <BodySwitcher
            type={type}
            handleChange={handleChange}
            result={result}
            index={index}
          />
        </div>
      </MDBCardBody>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <i className="text-info">{QuestionTypes.getInstructions(type)}</i>
        <MDBBtn
          onClick={() => handleNext(index)}
          size="sm"
          color={index === total ? "success" : "primary"}
        >
          {index === total ? "Submit" : "Next"}
        </MDBBtn>
      </div>
    </MDBCard>
  );
};

export default function Kiosk({ exam }) {
  const [index, setIndex] = useState(0),
    [result, setResult] = useState({}),
    [questionnaires, setQuestionnaires] = useState([]),
    [seconds, setSeconds] = useState(0),
    [didSubmit, setDidSubmit] = useState(false),
    { auth, token } = useSelector(({ auth }) => auth),
    { addToast } = useToasts(),
    history = useHistory(),
    dispatch = useDispatch();

  useEffect(() => {
    if (exam._id && auth._id) {
      const { _id, minutes, bank } = exam;
      localStorage.setItem(
        "exam",
        JSON.stringify({
          user: auth._id,
          exam: _id,
          minutes,
          score: 0,
        })
      );
      if (!!bank.length) {
        const shuffle = array => [...array].sort(() => Math.random() - 0.5);

        const _bank = shuffle(bank);

        setQuestionnaires(_bank);

        setResult({
          bank: _bank.map(
            ({ _id, type, answer, choices, question, difficulty }) => {
              const processEnum = () => ({
                answer: new Array(answer.length).fill(""),
              });

              const processMatch = () => ({
                answer: shuffle(answer.filter(({ value }) => value)),
                choices: shuffle(choices.filter(({ value }) => value)),
              });

              const processMC = () => ({
                answer: "",
                choices: shuffle(choices),
              });

              const processDefault = () => ({
                answer: "",
              });

              const processingFunctions = {
                enum: processEnum,
                match: processMatch,
                mc: processMC,
              };

              return {
                ...(processingFunctions[type] || processDefault)(),
                reference: _id,
                question,
                difficulty,
                correctAnswer: type !== "match" ? answer : undefined,
              };
            }
          ),
          score: 0,
        });
      }
    }
  }, [exam, auth]);

  // useEffect(() => {
  //   const disqualify = () => {
  //     console.log("disqualified");
  //   };

  //   window.addEventListener("blur", disqualify);

  //   return () => {
  //     console.log("you left");
  //     window.removeEventListener("blur", disqualify);
  //   };
  // }, []);

  const handleChange = (key, value, index) => {
    const _bank = [...result.bank];
    _bank[index] = { ..._bank[index], [key]: value };
    setResult({ ...result, bank: _bank });
  };

  const handleSubmit = (status, result) => {
    if (didSubmit) return;
    setDidSubmit(true);

    dispatch(
      SAVE({
        token,
        data: {
          ...result,
          exam: exam._id,
          user: auth._id,
          minutes:
            status === "timed out"
              ? exam.minutes
              : Number((exam.minutes - seconds / 60).toFixed(2)),
          status,
        },
      })
    );

    addToast("Results Saved Successfully", {
      appearance: "success",
    });
    localStorage.removeItem("exam");
    history.push("/exams");
  };

  const handleNext = index => {
    const { answer: correctAnswer, difficulty, type } = questionnaires[index],
      _result = { ...result },
      { bank } = _result,
      _bank = [...bank],
      { answer, choices = undefined } = _bank[index];

    if ((type === "qna" || type === "mc") && correctAnswer === answer) {
      _result.score += difficulty;
    }

    if (type === "enum") {
      for (const _answer of answer) {
        if (correctAnswer.includes(_answer)) {
          _result.score += difficulty / correctAnswer.length;
        }
      }
    }

    if (type === "match") {
      for (let index = 0; index < answer.length; index++) {
        const left = answer[index],
          right = choices[index];

        if (left.id === right.id) {
          _result.score += difficulty / answer.length;
        }
      }
    }

    _bank[index] = { ..._bank[index], answer, choices };
    _result.bank = _bank;
    setResult(_result);

    if (index === questionnaires.length - 1)
      return handleSubmit("completed", _result);

    setIndex(index + 1);
  };

  const { title, minutes } = exam;

  return (
    <>
      <h5
        style={{ fontWeight: "bold" }}
        className="d-flex justify-content-between"
      >
        {title}
        <CountdownTimer
          minutes={minutes}
          timerOut={() => handleSubmit("timed out", result)}
          setRemaining={setSeconds}
        />
      </h5>
      {!!questionnaires.length && (
        <QuestionCard
          index={index}
          total={questionnaires.length - 1}
          questionnaire={questionnaires[index]}
          result={result.bank[index]}
          handleNext={handleNext}
          handleChange={handleChange}
        />
      )}
    </>
  );
}
