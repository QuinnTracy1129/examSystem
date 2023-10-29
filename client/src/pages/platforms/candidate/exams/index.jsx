import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIND, RESET } from "../../../../services/redux/slices/exams";
import { useToasts } from "react-toast-notifications";
import DataTable from "../../../../components/dataTable";
import { globalSearch } from "../../../../services/utilities";
import Kiosk from "../../../../components/kiosk";

export default function Exams() {
  const [exams, setExams] = useState([]),
    [selected, setSelected] = useState({}),
    { token } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ exams }) => exams
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  //Initial Browse
  useEffect(() => {
    if (token) dispatch(FIND({ token }));

    return () => dispatch(RESET());
  }, [token, dispatch]);

  //Set fetched data for mapping
  useEffect(() => {
    setExams(collections);
  }, [collections]);

  //Toast for errors or success
  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }

    return () => dispatch(RESET());
  }, [isSuccess, message, addToast, dispatch]);

  //Search function
  const handleSearch = async (willSearch, key) => {
    if (willSearch) return setExams(globalSearch(collections, key));

    setExams(collections);
  };

  return selected._id ? (
    <Kiosk exam={selected} />
  ) : (
    <DataTable
      isLoading={isLoading}
      title="Exams"
      array={exams}
      actions={[
        {
          _icon: "chalkboard-teacher",
          _title: "Take Exam",
          _function: setSelected,
          _haveSelect: true,
          _allowMultiple: false,
          _shouldReset: true,
        },
      ]}
      tableHeads={[
        {
          _text: "Title",
        },
        {
          _text: "Passing Score",
        },
        {
          _text: "Perfect Score",
        },
        {
          _text: "Items",
        },
        {
          _text: "Attempts",
        },
      ]}
      tableBodies={[
        {
          _key: "title",
        },
        {
          _key: "passingScore",
        },
        {
          _key: "totalScore",
        },
        {
          _key: "bank",
          _format: data => data.length,
        },
        {
          _key: "attempts",
        },
      ]}
      handleSearch={handleSearch}
    />
  );
}
