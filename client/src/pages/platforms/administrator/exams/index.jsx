import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY, FIND, RESET } from "../../../../services/redux/slices/exams";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import DataTable from "../../../../components/dataTable";
import { globalSearch, swalConfirmation } from "../../../../services/utilities";

export default function Exams() {
  const [exams, setExams] = useState([]),
    [selected, setSelected] = useState({}),
    [showModal, setShowModal] = useState(false),
    [willCreate, setWillCreate] = useState(true),
    { token, employment, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ exams }) => exams
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
        })
      );

    return () => dispatch(RESET());
  }, [token, employment, auth, dispatch]);

  //Set fetched data for mapping
  useEffect(() => {
    setExams(collections);
  }, [collections]);

  //Modal toggle
  const toggleModal = () => setShowModal(!showModal);

  //Trigger for update
  const handleUpdate = selected => {
    setSelected(selected);
    if (willCreate) {
      setWillCreate(false);
    }
    setShowModal(true);
  };

  //Trigger for create
  const handleCreate = () => {
    if (!willCreate) {
      setWillCreate(true);
    }
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
    if (willSearch) return setExams(globalSearch(collections, key));

    setExams(collections);
  };

  const handleDelete = async selected => {
    if (await swalConfirmation()) {
      dispatch(
        DESTROY({
          token,
          data: selected.length > 1 ? selected : selected[0],
        })
      );
    }
  };

  return (
    <>
      <DataTable
        isLoading={isLoading}
        title="Exams"
        array={exams}
        actions={[
          {
            _icon: "plus",
            _function: handleCreate,
            _disabledOnSearch: true,
          },
          {
            _icon: "pencil-alt",
            _function: handleUpdate,
            _haveSelect: true,
            _allowMultiple: false,
            _shouldReset: true,
          },
          {
            _icon: "trash-alt",
            _function: handleDelete,
            _haveSelect: true,
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
        ]}
        tableBodies={[
          {
            _key: "title",
          },
          {
            _key: "passingScore",
            _format: (data, { totalScore }) => `${data} / ${totalScore}`,
          },
        ]}
        handleSearch={handleSearch}
      />
      <Modal
        key={showModal}
        selected={selected}
        willCreate={willCreate}
        show={showModal}
        toggle={toggleModal}
      />
    </>
  );
}
