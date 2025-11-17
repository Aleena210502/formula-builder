import React, { useState } from "react";
import {
  createFormula,
  deleteFormula,
  executeFormula,
} from "../api/api";
import ExecuteModal from "./ExecuteModal";

function FormulasList({ formulas, variables, onChange }) {
  const [name, setName] = useState("");
  const [expr, setExpr] = useState("");

  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const add = async () => {
    try {
      await createFormula({ name, expression: expr });
      setName("");
      setExpr("");
      onChange();
    } catch (e) {
      alert(e.response?.data?.error || e.message);
    }
  };

  const run = (formula) => {
    setSelected(formula);
    setModalOpen(true);
  };

  const runExecute = async (formulaId, runtime) => {
    try {
      const { result } = await executeFormula(formulaId, runtime);
      alert("Result: " + result);
      setModalOpen(false);
    } catch (e) {
      alert(e.response?.data?.error || e.message);
    }
  };

  return (
    <div>
      <h4>Formulas</h4>
      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Formula NAME"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />

        <input
          className="form-control mb-2"
          placeholder="Expression"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
        />

        <button className="btn btn-primary" onClick={add}>
          Add Formula
        </button>
      </div>

      <div className="d-flex flex-column gap-2">
        {formulas.map((f) => (
          <div key={f._id} className="card p-2">
            <div className="d-flex justify-content-between">
              <div>
                <strong>{f.name}</strong>
                <div>
                  <code>{f.expression}</code>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => run(f)}
                >
                  Execute
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={async () => {
                    if (window.confirm("Delete formula?")) {
                      await deleteFormula(f._id);
                      onChange();
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <ExecuteModal
          formula={selected}
          variables={variables}
          onClose={() => setModalOpen(false)}
          onExecute={runExecute}
        />
      )}
    </div>
  );
}

export default FormulasList;
