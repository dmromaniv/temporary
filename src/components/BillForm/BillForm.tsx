import { useFormik } from "formik";

import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  FormHelperText,
  Grid,
  ListItemText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Account } from "../../types/Account";
import { Bill } from "../../types/Bill";
import { Payee } from "../../types/Payee";

import validationSchema from "./validation/billValidation";

import styles from "./BillForm.module.css";

type BillFormProps = {
  saveBill: (bill: Bill) => void;
  initialBill: Bill;
  accounts: Account[];
  payee: Payee[];
};

const BillForm = (props: BillFormProps) => {
  const { saveBill, initialBill, accounts, payee } = props;

  const formik = useFormik({
    initialValues: initialBill,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleBlurEvent = async (e: React.FocusEvent) => {
    formik.handleBlur(e);

    await trySaveBill();
  };

  const trySaveBill = async () => {
    const validation = await formik.validateForm();
    if (JSON.stringify(validation) === "{}") {
      saveBill(formik.values as Bill);
    }
  };

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} sx={{ mb: "2rem" }}>
          <FormControl
            fullWidth
            error={formik.touched.amount && formik.errors.amount ? true : false}
          >
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <Input
              fullWidth
              id="amount"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={handleBlurEvent}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            <FormHelperText>
              {formik.touched.amount && Boolean(formik.errors.amount) ? formik.errors.amount : ""}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            id="sender"
            name="sender"
            label="From account"
            value={formik.values.sender}
            onChange={formik.handleChange}
            onBlur={handleBlurEvent}
            error={formik.touched.sender && Boolean(formik.errors.sender)}
            helperText={formik.touched.sender && formik.errors.sender}
          >
            {accounts.map((option) => (
              <MenuItem className={styles.accountsInfo} key={option.id} value={option.name}>
                <ListItemText primary={option.name} />
                <ListItemText primary={option.sum} />
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            id="payee"
            name="payee"
            label="Payee"
            value={formik.values.payee}
            onChange={formik.handleChange}
            onBlur={handleBlurEvent}
            error={formik.touched.payee && Boolean(formik.errors.payee)}
            helperText={formik.touched.payee && formik.errors.payee}
          >
            {payee.map((option) => (
              <MenuItem key={option.id} value={option.firstName}>
                {`${(option.firstName, option.lastName)}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              onChange={(date) => {
                formik.setFieldValue("date", date, true);
              }}
              onClose={() => {
                formik.setFieldTouched("date", true, true);

                // Hack to wait for new value to be applied
                // Pending https://github.com/jaredpalmer/formik/issues/529
                setTimeout(trySaveBill, 1);
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  error: formik.touched.date && Boolean(formik.errors.date),
                  helperText: formik.touched.date && formik.errors.date,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            select
            fullWidth
            id="repeat"
            name="repeat"
            label="Repeat"
            value={formik.values.repeat}
            onChange={formik.handleChange}
            onBlur={handleBlurEvent}
            error={formik.touched.repeat && Boolean(formik.errors.repeat)}
            helperText={formik.touched.repeat && formik.errors.repeat}
          >
            {accounts.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="note"
            name="note"
            label="Note"
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={handleBlurEvent}
            error={formik.touched.note && Boolean(formik.errors.note)}
            inputProps={{
              maxLength: 31,
            }}
            helperText={
              (formik.touched.note && formik.errors.note) || (
                <span className={styles.helperText}>{formik.values.note.length} / 31 </span>
              )
            }
            variant="outlined"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default BillForm;
