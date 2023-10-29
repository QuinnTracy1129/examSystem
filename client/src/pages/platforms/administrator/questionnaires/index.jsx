import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DESTROY,
  FIND,
  RESET,
} from "../../../../services/redux/slices/questionnaires";
import { useToasts } from "react-toast-notifications";
import DataTable from "../../../../components/dataTable";
import { globalSearch, swalConfirmation } from "../../../../services/utilities";
import Modal from "./modal";
import { QuestionTypes } from "../../../../services/fakeDb";

export default function Questionnaires() {
  const [questionnaires, setQuestionnaires] = useState([]),
    [selected, setSelected] = useState({}),
    [showModal, setShowModal] = useState(false),
    [willCreate, setWillCreate] = useState(true),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ questionnaires }) => questionnaires
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
  }, [token, auth, dispatch]);

  //Set fetched data for mapping
  useEffect(() => {
    setQuestionnaires(collections);
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
    if (willSearch) return setQuestionnaires(globalSearch(collections, key));

    setQuestionnaires(collections);
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
        title="Questionnaires"
        array={questionnaires}
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
            _text: "Question",
          },
          {
            _text: "Type",
          },
          {
            _text: "Difficulty",
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
