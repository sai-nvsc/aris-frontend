import { Alert, AlertTitle } from "@mui/material";

import { useSelector } from "react-redux";

const InventoryAlert = () => {
  const { stock_alert, expiration_alert } = useSelector(
    (state) => state.inventory
  );

  return (
    <>
      {stock_alert.length > 0 && (
        <Alert severity="warning">
          <AlertTitle>Vaccine low on stock</AlertTitle>
          {stock_alert[0].brand_name}{" "}
          {stock_alert.length > 1
            ? `and ${stock_alert.length - 1} other/s are low in stock`
            : "is low on stock"}
        </Alert>
      )}
      {expiration_alert.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Vaccine Expiring</AlertTitle>
          {expiration_alert[0].brand_name}{" "}
          {expiration_alert.length > 1
            ? `and ${expiration_alert.length - 1} other/s are expiring`
            : "is expiring"}
        </Alert>
      )}
    </>
  );
};

export default InventoryAlert;
