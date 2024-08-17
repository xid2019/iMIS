import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const OrderLineEditting = ({ data }) => {
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
        <TextField value={data.orderline_id || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.line_number || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.part_number || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.quantity || ''} type="number" variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.ship_via || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.required_date || ''} variant="outlined" />
      </TableCell>
      <TableCell>
        <TextField value={data.status || ''} variant="outlined" />
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
    quantity: PropTypes.number,
    ship_via: PropTypes.string,
    required_date: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
};

export default OrderLineEditting;