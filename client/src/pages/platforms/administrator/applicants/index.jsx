import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FIND,
  RESET,
  UPDATE,
} from "../../../../services/redux/slices/employments";
import { useToasts } from "react-toast-notifications";
import DataTable from "../../../../components/dataTable";
import { globalSearch, swalConfirmation } from "../../../../services/utilities";
import Swal from "sweetalert2";
import { MDBBtn, MDBBtnGroup } from "mdbreact";

export default function Applicants({ title = "Principals" }) {
  const [applications, setApplications] = useState([]),
    { token, employment } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ employments }) => employments
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  //Initial Browse
  useEffect(() => {
    if (token) {
      var key = { role: "647dd2a5dced91b0b39444b4", status: "pending" };

      if (title === "Applicants") {
        delete key.role;
        key.branch = employment?.branch?._id;
      }

      dispatch(
        FIND({
          token,
          key,
        })
      );
    }

    return () => dispatch(RESET());
  }, [token, title, employment, dispatch]);

  //Set fetched data for mapping
  useEffect(() => {
    setApplications(collections);
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
    if (willSearch) return setApplications(globalSearch(collections, key));

    setApplications(collections);
  };

  const handleApprove = async selected => {
    if (await swalConfirmation()) {
      dispatch(
        UPDATE({
          data: {
            _id: selected._id,
            status: "approved",
          },
          token,
        })
      );
    }
  };

  const handleDeny = async selected => {
    const { value: remarks } = await Swal.fire({
      title: "Enter your reason.",
      input: "textarea",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (remarks) {
      dispatch(
        UPDATE({
          data: {
            _id: selected._id,
            remarks,
            status: "denied",
          },
          token,
        })
      );
    }
  };

  const handleDocuments = type => {
    window.open("https://www.google.com/", "_blank");
  };

  return (
    <DataTable
      isLoading={isLoading}
      title={`Aspiring ${title}`}
      array={applications}
      actions={[
        {
          _icon: "check",
          _title: "Approve",
          _function: handleApprove,
          _haveSelect: true,
          _allowMultiple: false,
          _shouldReset: true,
        },
        {
          _icon: "times",
          _title: "Deny",
          _function: handleDeny,
          _haveSelect: true,
          _allowMultiple: false,
          _shouldReset: true,
        },
      ]}
      tableHeads={[
        {
          _text: "Email",
        },
        {
          _text: "Role",
        },
        {
          _text: "Documents",
        },
        {
          _text: "School & Branch",
        },
      ]}
      tableBodies={[
        {
          _key: "user",
          _format: data => data.email,
        },
        {
          _key: "role",
          _format: data => data.title,
        },
        {
          _isEmpty: true,
          _className: "pt-2",
          _format: () => (
            <MDBBtnGroup>
              <MDBBtn
                onClick={() => handleDocuments("applicationLetter")}
                size="sm"
                color="primary"
                className="px-2"
              >
                application letter
              </MDBBtn>
              <MDBBtn
                onClick={() => handleDocuments("résumé")}
                size="sm"
                color="primary"
                className="px-2"
              >
                résumé
              </MDBBtn>
              <MDBBtn
                onClick={() => handleDocuments("dataSheet")}
                size="sm"
                color="primary"
                className="px-2"
              >
                personal data sheet
              </MDBBtn>
            </MDBBtnGroup>
          ),
        },
        {
          _key: "branch",
          _format: ({ name, school }) => `${school.name} - ${name}`,
        },
      ]}
      handleSearch={handleSearch}
    />
  );
}
