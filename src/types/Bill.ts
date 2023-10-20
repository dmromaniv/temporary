export type Bill = {
  amount: string;
  sender: string;
  payee: string;
  date: Date | null;
  repeat: string;
  note: string;
};
