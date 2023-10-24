import { useState } from "react";

import { Button, IconButton } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddIcon from "@mui/icons-material/Add";

import { useBillList, useAccount, usePayee } from "../../hooks/customHooks";

import BillForm from "../BillForm/BillForm";
import { Bill } from "../../types/Bill";

import styles from "./BillFormList.module.css";

const BillFormList: React.FC = () => {
  const [billsInfo, setBillsInfo] = useState<Bill[]>([]);
  const [addButtonActive, setAddButtonActive] = useState(false);

  const { items, pushNewItem, saveItem, deleteItem } = useBillList();
  const { availableAccounts } = useAccount();
  const { availablePayee } = usePayee();

  const saveBill = (bill: Bill) => {
    setBillsInfo([...billsInfo, bill]);
    saveItem(bill);
    setAddButtonActive(true);
  };

  const handleAddButtonClick = (): void => {
    setAddButtonActive(false);

    pushNewItem();
  };

  const handleDelButtonClick = (): void => {
    deleteItem();

    setAddButtonActive(true);
  };

  return (
    <>
      <ul className={styles.list}>
        {items.length !== 0
          ? items.map((bill, index) => (
              <li className={styles.listItem} key={index}>
                <BillForm
                  saveBill={saveBill}
                  initialBill={bill}
                  accounts={availableAccounts}
                  payee={availablePayee}
                />
                {index !== 0 && index === items.length - 1 ? (
                  <IconButton
                    style={{ position: "absolute", top: "0", right: "0", color: "gray" }}
                    onClick={() => {
                      handleDelButtonClick();
                    }}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                ) : (
                  ""
                )}
              </li>
            ))
          : ""}
      </ul>

      {items.length < 5 ? (
        <Button
          variant="outlined"
          style={{ borderRadius: 50 }}
          className={styles.addBtn}
          disabled={!addButtonActive}
          onClick={handleAddButtonClick}
        >
          <AddIcon /> Add Another Bill
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default BillFormList;
