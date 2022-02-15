export const formatCurrency = (n, currency) => {
  if (n === undefined) {
    return "";
  }
  return (
    n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    }) +
    " " +
    currency
  );
};
