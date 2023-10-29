import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIND, RESET } from "../../../../services/redux/slices/results";
import { useToasts } from "react-toast-notifications";
import DataTable from "../../../../components/dataTable";
import { globalSearch } from "../../../../services/utilities";
import { MDBBadge } from "mdbreact";

export default function Results() {
  const [results, setResults] = useState([]),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ results }) => results
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  //Initial Browse
  useEffect(() => {
    if (token)
      dispatch(
        FIND({
          token,
          key: {
            user: auth._id,
          },
          endpoint: "find",
        })
      );

    return () => dispatch(RESET());
  }, [token, auth, dispatch]);

  //Set fetched data for mapping
  useEffect(() => {
    setResults(collections);
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
    if (willSearch) return setResults(globalSearch(collections, key));

    setResults(collections);
  };

  return (
    <DataTable
      disableSelect
      isLoading={isLoading}
      title="Results"
      array={results}
      tableHeads={[
        {
          _text: "Exam",
        },
        {
          _text: "Status",
        },
        {
          _text: "Score",
        },
        {
          _text: "Time",
        },
      ]}
      tableBodies={[
        {
          _key: "exam",
          _format: data => data.title,
        },
        {
          _key: "status",
          _format: data => {
            let color = "success";

            if (data === "timed out") color = "warning";
            if (data === "disqualified") color = "danger";

            return <MDBBadge color={color}>{data.toUpperCase()}</MDBBadge>;
          },
        },
        {
          _key: "score",
        },
        {
          _key: "minutes",
          _format: data => {
            const hours = Math.floor(data / 60),
              minutes = Math.floor(data % 60),
              seconds = Math.round((data % 1) * 60);

            return `${String(hours).padStart(2, "0")}:${String(
              minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
          },
        },
      ]}
      handleSearch={handleSearch}
    />
  );
}
