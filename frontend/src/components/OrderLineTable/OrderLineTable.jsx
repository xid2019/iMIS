import { useEffect, useState } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OrderLineStatic from './OrderLineStatic/OrderLineStatic';
import OrderLineEditting from './OrderLineEditting/OrderLineEditting';


const OrderLineTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:8000/orders/'; 

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []); 
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Customer PO</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Orderline ID</TableCell>
            <TableCell>Line Number</TableCell>
            <TableCell>Part Number</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Ship Via</TableCell>
            <TableCell>Required Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <>
              <OrderLineStatic key={row.orderline_id || row.order_id} data={row} />
              <OrderLineEditting key={row.orderline_id || row.order_id} data={row} />
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderLineTable;