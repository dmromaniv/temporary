import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  sender: Yup.string().required("From Account is required"),
  payee: Yup.string().required("Payee is required"),
  date: Yup.date().required("Date is required"),
  repeat: Yup.string().required("Repeat is required"),
  note: Yup.string()
    .max(31, "Note must be no more than 31 characters long")
    .required("Note is required"),
});

export default validationSchema;
