import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIND, RESET } from "../../../../services/redux/slices/results";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import DataTable from "../../../../components/dataTable";
import { globalSearch } from "../../../../services/utilities";

export default function Results() {
  const [results, setResults] = useState([]),
    [selected, setSelected] = useState({}),
    [showModal, setShowModal] = useState(false),
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
            createdBy: auth._id,
          },
          endpoint: "statistics",
        })
      );

    return () => dispatch(RESET());
  }, [token, auth, dispatch]);

  //Set fetched data for mapping
  useEffect(() => {
    setResults(collections);
  }, [collections]);

  //Modal toggle
  const toggleModal = () => setShowModal(!showModal);

  const handleView = selected => {
    setSelected(selected);
    setShowModal(true);
  };

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
    <>
      <DataTable
        isLoading={isLoading}
        title="Results"
        array={results}
        actions={[
          {
            _icon: "eye",
            _title: "View Results",
            _function: handleView,
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
            _text: "Results",
          },
        ]}
        tableBodies={[
          {
            _key: "title",
          },
          {
            _key: "results",
            _format: data => data.length,
          },
        ]}
        handleSearch={handleSearch}
      />
      <Modal
        key={selected?._id || "results"}
        selected={selected}
        show={showModal}
        toggle={toggleModal}
      />
    </>
  );
}
