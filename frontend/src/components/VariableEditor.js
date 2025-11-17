import React, { useState, useEffect } from "react";
import { updateVariable } from "../api/api";

function VariableEditor({ variable, onClose, onSaved }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("CONSTANT");
  const [expression, setExpression] = useState("");

  useEffect(() => {
    if (variable) {
      setName(variable.name);
      setType(variable.type);
      setExpression(variable.expression);
    }
  }, [variable]);

  const save = async () => {
    try {
      await updateVariable(variable._id, {
        name: name.toUpperCase(),
        type,
        expression,
      });
      onSaved();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  if (!variable) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit: {variable.name}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <label>Name</label>
            <input
              className="form-control mb-2"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />

            <label>Type</label>
            <select
              className="form-select mb-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="CONSTANT">CONSTANT</option>
              <option value="DYNAMIC">DYNAMIC</option>
            </select>

            <label>Expression</label>
            <input
              className="form-control mb-2"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VariableEditor;
