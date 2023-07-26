import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { act } from "../../slice";
import EditForm from "../EditForm";
import "./list.css";

const List = ({ data }) => {
  const [editRow, setEditRow] = useState(null);
  const dispatch = useDispatch();

  const handleEdit = (value) => {
    // console.log("first", value);
    setEditRow(value?.id);
  };

  const handleCancelEdit = () => {
    setEditRow(null);
  };

  const handleSave = (Id, updatedData) => {
    // console.log("", updatedData, id);
    dispatch(act.Edit({ id: Id, updatedData: updatedData }));
    setEditRow(null);
    // console.log("first", updatedData, id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th id="id">
            Id
            <button
              className="up"
              onClick={() => dispatch(act.Sort({ id: "id", direction: "asc" }))}
            >
              ▲
            </button>
            <button
              className="down"
              onClick={() =>
                dispatch(act.Sort({ id: "id", direction: "desc" }))
              }
            >
              ▼
            </button>
          </th>

          <th id="Name">
            Name
            <button
              className="up"
              onClick={() =>
                dispatch(act.Sort({ id: "Name", direction: "asc" }))
              }
            >
              ▲
            </button>
            <button
              className="down"
              onClick={() =>
                dispatch(act.Sort({ id: "Name", direction: "desc" }))
              }
            >
              ▼
            </button>
          </th>

          <th id="Age">
            Age
            <button
              className="up"
              onClick={() =>
                dispatch(act.Sort({ id: "age", direction: "asc" }))
              }
            >
              ▲
            </button>
            <button
              className="down"
              onClick={() =>
                dispatch(act.Sort({ id: "age", direction: "desc" }))
              }
            >
              ▼
            </button>
          </th>

          <th id="dob">
            Date of Birth
            <button
              className="up"
              onClick={() =>
                dispatch(act.Sort({ id: "dob", direction: "asc" }))
              }
            >
              ▲
            </button>
            <button
              className="down"
              onClick={() =>
                dispatch(act.Sort({ id: "dob", direction: "desc" }))
              }
            >
              ▼
            </button>
          </th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((value, index) => (
          <tr key={value?.id}>
            <td>{value?.id}</td>
            <td>
              {editRow === value?.id ? (
                <EditForm
                  Type="text"
                  value={value?.Name || " "}
                  onSave={(updatedName) =>
                    handleSave(value?.id, { Name: updatedName })
                  }
                  onCancel={handleCancelEdit}
                />
              ) : (
                value?.Name
              )}
            </td>
            <td>
              {editRow === value?.id ? (
                <EditForm
                  Type="number"
                  value={value?.age || " "}
                  onSave={(updatedAge) =>
                    handleSave(value?.id, { age: updatedAge })
                  }
                  onCancel={handleCancelEdit}
                />
              ) : (
                value?.age
              )}
            </td>
            <td>
              {editRow === value?.id ? (
                <EditForm
                  Type="date"
                  value={value?.dob || " "}
                  onSave={(updatedDob) =>
                    handleSave(value?.id, { dob: updatedDob })
                  }
                  onCancel={handleCancelEdit}
                />
              ) : (
                value?.dob
              )}
            </td>
            <td>
              {editRow === value?.id ? (
                <button className="edit" onClick={handleCancelEdit}>
                  <i className="fa fa-close"></i>
                </button>
              ) : (
                <button className="edit" onClick={() => handleEdit(value)}>
                  <i className="fa fa-edit"></i>
                </button>
              )}
            </td>

            <td>
              <button
                className="delete"
                onClick={() => dispatch(act.Delete(value.id))}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
