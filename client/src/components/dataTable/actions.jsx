import React from "react";
import { MDBView, MDBBtn, MDBIcon } from "mdbreact";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import { capitalize } from "../../services/utilities";

export default function Actions({
  getPage,
  extraActions,
  isLoading,
  search,
  title,
  actions,
  handleSelectReset,
  selected,
  handleSearch,
  setSearch,
  setSelected,
  arrayLength,
  disableSearch,
  selectedAll,
  setSelectedAll,
}) {
  const { addToast } = useToasts();

  const handleActions = (action, index, key = "actions") => {
    const {
      _icon = "",
      _title = "",
      _style = {},
      _className = "",
      _condition,
      _function = () => {},
      _shouldReset = false,
      _haveSelect = false,
      _allowMultiple = true,
      _disabledOnSearch = false,
      _selected = false,
    } = action;

    const element = (
      <MDBBtn
        title={capitalize(_title || _icon)}
        key={`${title}-${key}-${index}`}
        style={_style}
        onClick={() => {
          if (_haveSelect) {
            if (selected.length > 0) {
              if (_allowMultiple) {
                _function(selected);
              } else {
                if (selected.length === 1) {
                  _function(selected[0]);
                } else {
                  addToast("Please select only one item.", {
                    appearance: "info",
                  });
                }
              }
            } else {
              addToast("Please select an item first.", {
                appearance: "info",
              });
            }
          } else {
            _function();
          }

          if (_shouldReset) {
            handleSelectReset();
          }
        }}
        disabled={isLoading || (_disabledOnSearch && search ? true : false)}
        outline={!_selected}
        color="white"
        rounded
        size="sm"
        className={`px-2 ${_className}`}
      >
        <MDBIcon icon={_icon} className="mt-0" />
      </MDBBtn>
    );

    if (_condition && !_condition()) {
      return null;
    }
    return element;
  };

  return (
    <MDBView
      cascade
      className="gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
    >
      <span className="white-text text-left mx-3">
        {!getPage && `${arrayLength} `}
        {search ? "Matching" : title}
        {search && (
          <>
            &nbsp;item(s) with <b>{search}</b>
          </>
        )}
      </span>
      {!!extraActions.length && (
        <div>
          {extraActions.map((action, index) =>
            handleActions(action, index, "extraActions")
          )}
        </div>
      )}
      <div className="text-right">
        {actions?.map((action, index) => handleActions(action, index))}
        {!disableSearch && (
          <MDBBtn
            title="Search"
            disabled={isLoading}
            onClick={async () => {
              if (search) {
                setSearch("");
                handleSearch(false);
                if (selectedAll) setSelectedAll(false);
              } else {
                if (!arrayLength)
                  return addToast("Records are empty.", {
                    appearance: "info",
                  });

                const { value: _search } = await Swal.fire({
                  title: "What are you looking for?",
                  text: "Provide a keyword and we will find it for you.",
                  icon: "question",
                  input: "text",
                  confirmButtonText: "Search",
                  inputValidator: value => {
                    if (!value) {
                      return "You need to write something!";
                    }
                  },
                });

                if (_search) {
                  const _key = _search.toUpperCase();

                  setSearch(_key);
                  setSelected([]);

                  handleSearch(true, _key);
                }
              }
            }}
            outline
            color="white"
            rounded
            size="sm"
            className="px-2"
          >
            <MDBIcon
              pulse={isLoading}
              icon={isLoading ? "spinner" : search ? "times" : "search"}
              className="mt-0"
            />
          </MDBBtn>
        )}
      </div>
    </MDBView>
  );
}
