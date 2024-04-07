function formatCurrency(number) {
  const formater = new Intl.NumberFormat("vi-Vn");
  const result = formater.format(number);
  return result + "đ";
}
export default formatCurrency;
