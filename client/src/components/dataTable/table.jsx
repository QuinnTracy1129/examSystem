import React from "react";
import { MDBIcon, MDBTable } from "mdbreact";
import { handlePagination } from "../../services/utilities";
import { useSelector } from "react-redux";

export default function Table({
  getPage,
  disableSelect,
  isLoading,
  title,
  array,
  search,
  selectedAll,
  setSelectedAll,
  setSelected,
  tableHeads,
  page,
  tableBodies,
  selected,
  handleToggleSelect,
  liveSelector,
}) {
  const { maxPage } = useSelector(({ auth }) => auth);

  const _title = title.split(" ").join("-");

  return (
    <MDBTable responsive hover style={{ cursor: "default" }}>
      <thead>
        <tr>
          {!disableSelect && (
            <th className="pb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={_title}
                disabled={isLoading || array.length < 1}
                checked={selectedAll}
                onChange={e => {
                  setSelectedAll(e.target.checked);
                  const _array = e.target.checked ? array : [];
                  setSelected(_array);
                  if (liveSelector) liveSelector(_array);
                }}
              />
              <label
                htmlFor={_title}
                className="form-check-label label-table"
              />
            </th>
          )}
          {tableHeads?.map((_thead, index) => {
            const {
              _text = "",
              _style = {},
              _className = "",
              _condition,
            } = _thead;

            const element = (
              <th
                style={_style}
                key={`${_title}-thead-${index}`}
                className={`th-lg ${_className}`}
              >
                {_text}
              </th>
            );

            //check if a condition is declared and met
            if (_condition && !_condition()) {
              return null;
            }
            return element;
          })}
        </tr>
      </thead>

      <tbody>
        {!!array.length &&
          handlePagination(array, page, maxPage, getPage).map((item, index) => {
            const identifier = item._id ? "_id" : "id";

            const selectedIndex = selected.findIndex(
              e => e[identifier] === item[identifier]
            );
            const isSelected = selectedIndex > -1;

            return (
              <tr key={`${_title}-tbody-${index}`}>
                {!disableSelect && (
                  <th scope="row" className="pb-2">
                    <input
                      disabled={isLoading}
                      className="form-check-input"
                      type="checkbox"
                      id={`${item[identifier]}-${index}-${_title}`}
                      checked={isSelected}
                      onChange={() =>
                        handleToggleSelect(isSelected, selectedIndex, item)
                      }
                    />
                    <label
                      htmlFor={`${item[identifier]}-${index}-${_title}`}
                      className="label-table"
                    />
                  </th>
                )}
                {tableBodies?.map((_tbody, _index) => {
                  const {
                    _key = "",
                    _style = {},
                    _className = "",
                    _condition,
                    _format,
                    _isEmpty = false,
                  } = _tbody;

                  const validateKey = () => {
                    // check if key exists
                    if (!item.hasOwnProperty(_key) && !_isEmpty)
                      return <i>Key not found</i>;

                    const value = item[_key];

                    return _format ? _format(value, item, index) : value;
                  };

                  const element = (
                    <td
                      key={`${title}-tcard-${_index}`}
                      style={_style}
                      className={`${_className}`}
                    >
                      {validateKey()}
                    </td>
                  );

                  if (_condition && !_condition()) {
                    return null;
                  }
                  return element;
                })}
              </tr>
            );
          })}
        {!array.length && (
          <tr className="text-center">
            <td colSpan={tableBodies.length + 1}>
              {isLoading ? (
                <MDBIcon icon="spinner" pulse />
              ) : (
                <i>
                  No {search ? "matching" : "recent"} records&nbsp;
                  {getPage && `for page ${page}`}
                </i>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </MDBTable>
  );
}
