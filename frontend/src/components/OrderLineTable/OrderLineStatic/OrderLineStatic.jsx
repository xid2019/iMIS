import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const OrderLineStatic = ({ data, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{data.order_id}</TableCell>
      <TableCell>{data.customer_id}</TableCell>
      <TableCell>{data.customer_PO}</TableCell>
      <TableCell>{data.order_date}</TableCell>
      <TableCell>{data.orderline_id}</TableCell>
      <TableCell>{data.line_number}</TableCell>
      <TableCell>{data.part_number}</TableCell>
      <TableCell>{data.quantity}</TableCell>
      <TableCell>{data.ship_via}</TableCell>
      <TableCell>{data.required_date}</TableCell>
      <TableCell>{data.status}</TableCell>
      <TableCell>
        <Button onClick={onEdit} variant="text">Edit</Button>
      </TableCell>
    </TableRow>
  );
};


OrderLineStatic.propTypes = {
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
  onEdit: PropTypes.func.isRequired,
};

export default OrderLineStatic;
