import React, { useState } from "react";
import {
  createVariable,
  deleteVariable
} from "../api/api";

import VariableEditor from "./VariableEditor";

function VariablesManager({ variables, onChange }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("CONSTANT");
  const [expression, setExpression] = useState("");
  const [editVar, setEditVar] = useState(null);

  const add = async () => {
    try {
      await createVariable({ name, type, expression });
      setName("");
      setExpression("");
      setType("CONSTANT");
      onChange();
    } catch (e) {
      alert(e.response?.data?.error || e.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete variable?")) return;
    await deleteVariable(id);
    onChange();
  };

  return (
    <div>
      <h4>Variables</h4>
      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="NAME"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />

        <select
          className="form-select mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="CONSTANT">CONSTANT</option>
          <option value="DYNAMIC">DYNAMIC</option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Value / Expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />

        <button className="btn btn-primary" onClick={add}>
          Add Variable
        </button>
      </div>

      <table className="table table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expression</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {variables.map((v) => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>
                <code>{v.expression}</code>
              </td>
              <td>
                <span
                  className={`badge ${
                    v.type === "CONSTANT" ? "bg-success" : "bg-info"
                  }`}
                >
                  {v.type}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditVar(v)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => remove(v._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editVar && (
        <VariableEditor
          variable={editVar}
          onClose={() => setEditVar(null)}
          onSaved={() => {
            setEditVar(null);
            onChange();
          }}
        />
      )}
    </div>
  );
}

export default VariablesManager;
