import React, { useEffect, useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBBadge,
} from "mdbreact";
import DataTable from "../../../../components/dataTable";
import { globalSearch } from "../../../../services/utilities";

export default function Modal({ show, toggle, selected }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(selected.results);
  }, [selected]);

  const handleSearch = async (willSearch, key) => {
    if (willSearch) return setResults(globalSearch(selected.results, key));

    setResults(selected.results);
  };

  return (
    <MDBModal size="xl" isOpen={show} toggle={toggle} backdrop>
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="poll" className="mr-2" />
        {selected.title}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <DataTable
          disableSelect
          isLoading={false}
          title="Results"
          array={results}
          tableHeads={[
            {
              _text: "User",
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
              _key: "user",
              _format: data => data.email,
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
      </MDBModalBody>
    </MDBModal>
  );
}
