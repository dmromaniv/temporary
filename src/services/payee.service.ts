import { Payee } from "../types/Payee";

const getAvailablePayee = (): Payee[] => {
  return [
    {
      firstName: "User1",
      lastName: "Test1",
      id: 1,
    },
    {
      firstName: "User2",
      lastName: "Test2",
      id: 2,
    },
  ];
};

export default getAvailablePayee;
