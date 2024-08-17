import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';

const OrderLineStatic = ({ data }) => {
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
    </TableRow>
  );
};


OrderLineStatic.propTypes = {
  data: PropTypes.shape({
    order_id: PropTypes.number.isRequired,
    customer_id: PropTypes.string.isRequired,
    customer_PO: PropTypes.string.isRequired,
    order_date: PropTypes.string.isRequired, // Assuming date is in string format
    orderline_id: PropTypes.number,
    line_number: PropTypes.string,
    part_number: PropTypes.string,
    quantity: PropTypes.number,
    ship_via: PropTypes.string,
    required_date: PropTypes.string, // Assuming date is in string format
    status: PropTypes.string
  }).isRequired,
};

export default OrderLineStatic;
