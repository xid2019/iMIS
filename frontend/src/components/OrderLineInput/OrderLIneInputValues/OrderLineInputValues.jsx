import { useState } from 'react';
import { 
  TextField, 
  Grid, 
  Paper, 
  Button, 
  Typography, 
  Divider,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';

const OrderLineInputValues = ({ initialData, handleCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    customer_id: '',
    customer_po: '',
    buyer: '',
    line_number: '',
    part_number: '',
    print_number: '',
    revision: '',
    quantity: '',
    description: '',
    price: '',
    cost: '',
    unit: '',
    pay_terms: '',
    required_date: '',
    due_date: '',
    material: '',
    weight: '',
    schd_days: '',
    factory: '',
    ship_via: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };

    if (name === 'due_date' || name === 'schd_days') {
      const { due_date, schd_days } = updatedFormData;

      if (due_date && schd_days) {
        const requiredDate = dayjs(due_date).subtract(schd_days, 'day').format('YYYY-MM-DD');
        updatedFormData.required_date = requiredDate;
      }
    }

    setFormData(updatedFormData);
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
        <Grid container spacing={2}>

          {/* Title for First Row */}
          <Grid item xs={12}>
            <Typography variant="h6">Basic Information</Typography>
            <Divider />
          </Grid>
          {/* First Row */}
          <Grid container item spacing={2}>
            <Grid item xs={1}>
              <TextField
                name="customer_id"
                label="Customer ID"
                value={formData.customer_id}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                name="customer_po"
                label="Customer PO"
                value={formData.customer_PO}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                name="buyer"
                label="Buyer"
                value={formData.buyer}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                name="pay_terms"
                label="Pay Terms"
                value={formData.pay_terms}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Title for Second Row */}
          <Grid item xs={12}>
            <Typography variant="h6">Part Details</Typography>
            <Divider />
          </Grid>
          {/* Second Row */}
          <Grid container item spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={1}>
                <TextField
                  name="part_number"
                  label="Part Number"
                  value={formData.part_number}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={1}>
                <TextField
                  name="price"
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  name="cost"
                  label="Cost"
                  type="number"
                  value={formData.cost}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  name="material"
                  label="Material"
                  value={formData.material}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  name="weight"
                  label="Weight(KG)"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  name="factory"
                  label="Factory"
                  value={formData.factory}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <TextField
                name="line_number"
                label="Line Number"
                value={formData.line_number}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                name="print_number"
                label="Print Number"
                value={formData.print_number}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                name="revision"
                label="Revision"
                value={formData.revision}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
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
            <Grid item xs={1}>
              <TextField
                name="unit"
                label="Unit"
                value={formData.unit}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Title for Third Row */}
          <Grid item xs={12}>
            <Typography variant="h6">Shipping Information</Typography>
            <Divider />
          </Grid>
          {/* Third Row */}
          <Grid container item spacing={2}>
            <Grid item xs={1}>
              <FormControl variant="outlined">
                <InputLabel id="ship-via-label">Ship Via</InputLabel>
                <Select
                  labelId="ship-via-label"
                  name="ship_via"
                  value={formData.ship_via || "Sea"}
                  onChange={handleChange}
                  label="Ship Via"
                >
                  <MenuItem value="Exp">Exp</MenuItem>
                  <MenuItem value="Air">Air</MenuItem>
                  <MenuItem value="Sea">Sea</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={2}>
                <TextField
                  name="due_date"
                  label="Due Date"
                  type="date"
                  value={formData.due_date}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  name="schd_days"
                  label="Sch'd Days"
                  type="number"
                  value={formData.schd_days}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}>
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
            </Grid>
          </Grid>

          {/* Submit Button Row */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" color="secondary" fullWidth onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
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
  }),
  handleCancel: PropTypes.func.isRequired,
};

export default OrderLineInputValues;