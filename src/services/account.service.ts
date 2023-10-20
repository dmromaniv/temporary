import { Account } from "../types/Account";

const getAvailableAccounts = (): Account[] => {
  return [
    {
      name: "User",
      sum: 20000,
      id: 1,
    },
    {
      name: "User2",
      sum: 30000,
      id: 2,
    },
    {
      name: "User3",
      sum: 50000,
      id: 3,
    },
  ];
};

export default getAvailableAccounts;
