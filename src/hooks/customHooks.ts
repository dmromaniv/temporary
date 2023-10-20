import { useEffect, useState } from "react";

import getAvailableAccounts from "../services/account.service";

import { Bill } from "../types/Bill";
import { Account } from "../types/Account";
import { Payee } from "../types/Payee";
import getAvailablePayee from "../services/payee.service";

export const useBillList = () => {
  const initialValue = {
    amount: "0.00",
    sender: "",
    payee: "",
    date: null,
    repeat: "",
    note: "",
  };

  const [items, setItems] = useState<Bill[]>([initialValue]);

  const pushNewItem = () => {
    if (items.length <= 5) {
      setItems([...items, initialValue]);
    }
  };

  const deleteItem = () => {
    if (items.length > 1) {
      const updatedListItems = [...items];
      updatedListItems.pop();

      setItems(updatedListItems);
    }
  };

  const saveItem = (bill: Bill) => {
    const updatedListItems = [...items];
    updatedListItems[updatedListItems.length - 1] = bill;

    setItems(updatedListItems);
  };

  return { items, pushNewItem, saveItem, deleteItem };
};

export const useAccount = () => {
  const [availableAccounts, setAvailableAccounts] = useState<Account[]>([]);

  useEffect(() => {
    setAvailableAccounts(getAvailableAccounts());
  }, []);

  return { availableAccounts };
};

export const usePayee = () => {
  const [availablePayee, setAvailablePayee] = useState<Payee[]>([]);

  useEffect(() => {
    setAvailablePayee(getAvailablePayee());
  }, []);

  return { availablePayee };
};
