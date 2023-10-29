import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIND, RESET, UPDATE } from "../../../../services/redux/slices/users";
import { useToasts } from "react-toast-notifications";
// import Modal from "./modal";
import DataTable from "../../../../components/dataTable";
import { globalSearch } from "../../../../services/utilities";
import Swal from "sweetalert2";

export default function Users({ title, hide, action, inactive = false }) {
  const [users, setUsers] = useState([]),
    { token } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ users }) => users
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
            isActive: title !== "Deactivated Users",
            role: JSON.stringify({ $nin: ["647dd2a5dced91b0b39444b3", hide] }),
          },
        })
      );

    return () => dispatch(RESET());
  }, [token, hide, title, dispatch]);

  //Set fetched data for mapping
  useEffect(() => {
    setUsers(collections);
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
    if (willSearch) return setUsers(globalSearch(collections, key));

    setUsers(collections);
  };

  const handleAction = (selected, willDestroy) => {
    let form = {
      role: hide,
    };

    if (willDestroy) {
      delete form.role;
      form.isActive = inactive;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        willDestroy ? (inactive ? "Reactivate" : "Deactivate") : action
      } ${selected.length} users`,
      icon: "question",
      confirmButtonText: "Proceed",
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed)
        dispatch(
          UPDATE({
            data: selected.map(({ _id }) => ({ _id, ...form })),
            token,
          })
        );
    });
  };

  return (
    <DataTable
      isLoading={isLoading}
      title={title}
      array={users}
      actions={[
        {
          _icon: "user-secret",
          _title: action,
          _function: s => handleAction(s, false),
          _haveSelect: true,
          _shouldReset: true,
          _className: title === "Deactivated Users" && "d-none",
        },
        {
          _icon: `user-${title === "Deactivated Users" ? "shield" : "times"}`,
          _title: "Deactivate",
          _function: s => handleAction(s, true),
          _haveSelect: true,
          _shouldReset: true,
        },
      ]}
      tableHeads={[
        {
          _text: "Email",
        },
        {
          _text: "Created At",
        },
      ]}
      tableBodies={[
        {
          _key: "email",
        },
        {
          _key: "createdAt",
          _format: data => new Date(data).toLocaleString(),
        },
      ]}
      handleSearch={handleSearch}
    />
  );
}
