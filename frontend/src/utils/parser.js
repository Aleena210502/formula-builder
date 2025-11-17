export function findPlaceholders(expr) {
  const re = /{{#([a-zA-Z0-9_]+)}}/g;
  const out = [];
  let m;
  while ((m = re.exec(expr)) !== null) out.push(m[1]);
  return [...new Set(out)];
}

export function extractVariableTokens(expr) {
  const tokens = expr.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
  return [...new Set(tokens)];
}

export function isSafeExpression(expr) {
  const cleaned = expr.replace(/{{#[A-Za-z0-9_]+}}/g, "0");
  return /^[0-9A-Za-z_+\-*/().\s]+$/.test(cleaned);
}
