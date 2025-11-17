function extractPlaceholders(expr) {
  const re = /{{#([a-zA-Z0-9_]+)}}/g;
  const out = [];
  let m;
  while ((m = re.exec(expr)) !== null) out.push(m[1]);
  return out;
}

function isValidFinalExpression(expr) {
  return /^[0-9+\-*/().\s]+$/.test(expr);
}

function buildVariableMap(vars) {
  const map = {};
  vars.forEach((v) => {
    map[v.name] = { type: v.type, expr: v.expression };
  });
  return map;
}

function resolveVariable(name, map, path = []) {
  name = name.toUpperCase();

  if (!map[name]) throw new Error(`Undefined variable ${name}`);
  if (path.includes(name))
    throw new Error(`Circular dependency: ${[...path, name].join(" -> ")}`);

  const item = map[name];

  if (item.type === "CONSTANT") {
    if (!/^\d+(\.\d+)?$/.test(item.expr.trim()))
      throw new Error(`Invalid constant value for ${name}`);
    return Number(item.expr.trim());
  }

  // DYNAMIC variable
  let expr = item.expr;
  const tokens = expr.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];

  for (const tok of tokens) {
    const up = tok.toUpperCase();
    const val = resolveVariable(up, map, [...path, name]);
    expr = expr.replace(new RegExp(`\\b${tok}\\b`, "g"), `(${val})`);
  }

  if (!isValidFinalExpression(expr))
    throw new Error(`Invalid expression for variable ${name}`);

  const value = Function(`return (${expr});`)();
  if (typeof value !== "number" || !isFinite(value))
    throw new Error(`Evaluation failed for variable ${name}`);

  return value;
}

exports.evaluateFormula = (expr, variables, runtime = {}) => {
  // 1. substitute runtime placeholders
  let finalExpr = expr;
  const placeholders = extractPlaceholders(expr);

  for (const p of placeholders) {
    if (!(p in runtime))
      throw new Error(`Missing runtime value for ${p}`);
    const val = Number(runtime[p]);
    if (isNaN(val))
      throw new Error(`Invalid runtime input for ${p}`);

    finalExpr = finalExpr.replace(
      new RegExp(`{{#${p}}}`, "g"),
      `(${val})`
    );
  }

  // 2. variable map
  const map = buildVariableMap(variables);

  // 3. resolve variables in formula
  const tokens = finalExpr.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
  const unique = [...new Set(tokens)];

  for (const tok of unique) {
    const up = tok.toUpperCase();
    if (!map[up])
      throw new Error(`Undefined variable in formula: ${tok}`);

    const v = resolveVariable(up, map, []);
    finalExpr = finalExpr.replace(new RegExp(`\\b${tok}\\b`, "g"), `(${v})`);
  }

  if (!isValidFinalExpression(finalExpr))
    throw new Error("Final expression invalid");

  const output = Function(`return (${finalExpr});`)();

  if (typeof output !== "number" || !isFinite(output))
    throw new Error("Formula evaluation failed");

  return output;
};
