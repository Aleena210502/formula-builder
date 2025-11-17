import React, { useState } from "react";

function findPlaceholders(expr) {
  const re = /{{#([a-zA-Z0-9_]+)}}/g;
  const out = [];
  let m;
  while ((m = re.exec(expr)) !== null) out.push(m[1]);
  return [...new Set(out)];
}

function ExecuteModal({ formula, onClose, onExecute }) {
  const placeholders = findPlaceholders(formula.expression);
  const [values, setValues] = useState(
    placeholders.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );

  const submit = () => {
    const runtime = {};
    try {
      placeholders.forEach((p) => {
        if (values[p] === "") throw new Error(`Enter value for ${p}`);
        runtime[p] = Number(values[p]);
      });

      onExecute(formula._id, runtime);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Execute: {formula.name}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>
              <code>{formula.expression}</code>
            </p>

            {placeholders.length === 0 && (
              <p>No runtime inputs required.</p>
            )}

            {placeholders.map((p) => (
              <div className="mb-2" key={p}>
                <label className="form-label">{p}</label>
                <input
                  className="form-control"
                  value={values[p]}
                  onChange={(e) =>
                    setValues({ ...values, [p]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={submit}>
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecuteModal;
