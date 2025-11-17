import React, { useEffect, useState } from "react";
import VariablesManager from "./components/VariablesManager";
import FormulasList from "./components/FormulasList";
import { getVariables, getFormulas } from "./api/api";

function App() {
  const [variables, setVariables] = useState([]);
  const [formulas, setFormulas] = useState([]);

  const fetchAll = async () => {
    const [v, f] = await Promise.all([getVariables(), getFormulas()]);
    setVariables(v);
    setFormulas(f);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">Formula Builder</h1>
      <div className="row">
        <div className="col-md-6">
          <VariablesManager variables={variables} onChange={fetchAll} />
        </div>
        <div className="col-md-6">
          <FormulasList
            formulas={formulas}
            variables={variables}
            onChange={fetchAll}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
