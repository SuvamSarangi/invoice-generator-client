export const formatInvoiceData = (invoiceData = {}) => {
  const {
    title = "",
    billing = {},
    shipping = {},
    invoice = {},
    account = {},
    company = {},
    tax = 0,
    notes = "",
    items = [],
    logo = "",
  } = invoiceData;

  const currencySymbol = "₹";
  const subtotal = (items || []).reduce(
    (acc, item) => acc + (Number(item?.qty) || 0) * (Number(item?.amount) || 0),
    0
  );
  const taxAmount = subtotal * (Number(tax) / 100);
  const total = subtotal + taxAmount;

  return {
    title: title || "Untitled Invoice",

    companyName: company?.name || "",
    companyAddress: company?.address || "",
    companyPhone: company?.phone || "",
    companyLogo: logo || "",

    invoiceNumber: invoice?.number || "",
    invoiceDate: invoice?.date || "",
    paymentDate: invoice?.dueDate || "",

    accountName: account?.name || "",
    accountNumber: account?.number || "",
    accountIfscCode: account?.ifscCode || "",

    billingName: billing?.name || "",
    billingAddress: billing?.address || "",
    billingPhone: billing?.phone || "",

    shippingName: shipping?.name || "",
    shippingAddress: shipping?.address || "",
    shippingPhone: shipping?.phone || "",

    currencySymbol,
    tax: Number(tax) || 0,
     items: (items || []).map(item => ({
      name: item?.name || "",
      qty: Number(item?.qty) || 0,
      amount: Number(item?.amount) || 0,
      description: item?.description || "",
    })),
    notes: notes || "",
    subtotal,
    taxAmount,
    total,
  };
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};