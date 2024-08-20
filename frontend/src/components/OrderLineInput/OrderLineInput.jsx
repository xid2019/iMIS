import OrderLineInputValues from "./OrderLIneInputValues/OrderLineInputValues";
import { useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const OrderLineInput = () => {
  const [showInputFields, setShowInputFields] = useState(false);

  const handleButtonClick = () => {
    setShowInputFields(true);
  };

  const handleCancel = () => {
    setShowInputFields(false)
  }

  return (
    <Grid>
      {!showInputFields && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleButtonClick}
        >
          Add Order Line
        </Button>
      )}
      
      {showInputFields && (
        <OrderLineInputValues
          handleCancel={handleCancel}
        />
      )}
    </Grid>
    
  );
}

export default OrderLineInput;