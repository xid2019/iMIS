import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const OrderLineEditting = ({ data, onSave }) => {
  return (
    <TableRow>
      <TableCell>
        <TextField value={data.order_id} variant="outlined" InputProps={{ readOnly: true }} />
      </TableCell>
      <TableCell>
        <TextField value={data.customer_id} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.customer_PO} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.order_date} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.orderline_id} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.line_number} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.part_number} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.description} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.quantity || ''} type="number" variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.ship_via || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.balance || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.required_date || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.original_confirm_date || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.updated_confirm_date || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.status || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <Button onClick={onSave} variant="text">Save</Button>
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