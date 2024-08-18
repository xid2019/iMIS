import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const OrderLineEditting = ({ data, onSave }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(formData); // Pass the updated data to the parent component
  };
  return (
    <TableRow>
      <TableCell>
        <TextField 
          value={formData.order_id} 
          name="order_id"
          variant="outlined" 
          InputProps={{ readOnly: true }} 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.customer_id} 
          name="customer_id"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.customer_PO} 
          name="customer_PO"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.order_date} 
          name="order_date"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.orderline_id} 
          name="orderline_id"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.line_number} 
          name="line_number"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.part_number} 
          name="part_number"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.description} 
          name="description"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.quantity || ''} 
          name="quantity"
          type="number" 
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.ship_via || ''} 
          name="ship_via"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.balance || ''} 
          name="balance"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.required_date || ''} 
          name="required_date"
          variant="outlined"
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.original_confirm_date || ''} 
          name="original_confirm_date"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.updated_confirm_date || ''} 
          name="updated_confirm_date"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <TextField 
          value={formData.status || ''} 
          name="status"
          variant="outlined" 
          onChange={handleChange} 
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleSave} variant="text">Save</Button>
      </TableCell>
    </TableRow>
  );
};

OrderLineEditting.propTypes = {
  data: PropTypes.shape({
    order_id: PropTypes.number.isRequired,
    customer_id: PropTypes.string.isRequired,
    customer_PO: PropTypes.string.isRequired,
    order_date: PropTypes.string.isRequired,
    orderline_id: PropTypes.number,
    line_number: PropTypes.string,
    part_number: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    ship_via: PropTypes.string,
    balance: PropTypes.number,
    required_date: PropTypes.string,
    original_confirm_date: PropTypes.string,
    updated_confirm_date: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default OrderLineEditting;