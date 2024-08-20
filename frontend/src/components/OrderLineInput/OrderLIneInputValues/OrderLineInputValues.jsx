import { useState } from 'react';
import { TextField, Grid, Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

const OrderLineInputValues = ({ initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    customer_id: '',
    customer_PO: '',
    order_date: '',
    line_number: '',
    part_number: '',
    description: '',
    quantity: '',
    ship_via: '',
    balance: '',
    required_date: '',
    original_confirm_date: '',
    updated_confirm_date: '',
    factory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/order_lines/create/', formData);

      console.log('Success:', response.data);

      // Optionally, handle success, e.g., show a message or reset the form
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle errors, e.g., show an error message
    }
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        <Grid container >
          <Grid item>
            <TextField
              name="customer_id"
              label="Customer ID"
              value={formData.customer_id}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="customer_PO"
              label="Customer PO"
              value={formData.customer_PO}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="order_date"
              label="Order Date"
              type="date"
              value={formData.order_date}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="line_number"
              label="Line Number"
              value={formData.line_number}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="part_number"
              label="Part Number"
              value={formData.part_number}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="ship_via"
              label="Ship Via"
              value={formData.ship_via}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="balance"
              label="Balance"
              value={formData.balance}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="required_date"
              label="Required Date"
              type="date"
              value={formData.required_date}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="original_confirm_date"
              label="Orig CFM Date"
              type="date"
              value={formData.original_confirm_date}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="updated_confirm_date"
              label="Updated CFM Date"
              type="date"
              value={formData.updated_confirm_date}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="factory"
              label="Factory"
              value={formData.factory}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

OrderLineInputValues.propTypes = {
  initialData: PropTypes.shape({
    order_id: PropTypes.string,
    customer_id: PropTypes.string,
    customer_PO: PropTypes.string,
    order_date: PropTypes.string,
    orderline_id: PropTypes.string,
    line_number: PropTypes.string,
    part_number: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ship_via: PropTypes.string,
    balance: PropTypes.string,
    required_date: PropTypes.string,
    original_confirm_date: PropTypes.string,
    updated_confirm_date: PropTypes.string,
    status: PropTypes.string,
  })
};

export default OrderLineInputValues;