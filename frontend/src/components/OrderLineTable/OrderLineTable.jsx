import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderLineStatic from './OrderLineStatic/OrderLineStatic';
import OrderLineEditting from './OrderLineEditting/OrderLineEditting';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';
import './styles.css';


const OrderLineTable = () => {
  const [data, setData] = useState([]);
  const [staticArr, setStaticArr] = useState([]);
  const [filters, setFilters] = useState({
    customer_id: '',
    customer_po: '',
    order_date_after: '',
    order_date_before: '',
    required_date_after: '',
    required_date_before: '',
    status: '',
  });

  useEffect(() => {
    fetchData(filters);
  }, []);

  const fetchData = async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    console.log('aaaa', queryParams)
    const url = `http://localhost:8000/orders/?${queryParams}`;

    try {
      const response = await axios.get(url);
      setData(response.data);
      const newStaticArr = new Array(response.data.length).fill(true);
      setStaticArr(newStaticArr);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    fetchData(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      customer_id: '',
      customer_po: '',
      order_date_after: '',
      order_date_before: '',
      required_date_after: '',
      required_date_before: '',
      status: '',
    };
    setFilters(clearedFilters);
    fetchData(clearedFilters);
  };

  const handleEdit = (index) => {
    const newStaticArr = [...staticArr];
    newStaticArr[index] = false;
    setStaticArr(newStaticArr);
  }

  const handleSave = async (index, updatedData) => {
    try {
      // Make a PUT request to update the data on the server
      await axios.put(`http://localhost:8000/order_lines/update/${updatedData.orderline_id}/`, updatedData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
    const newData = [...data];
    newData[index] = updatedData;
    setData(newData);
    const newStaticArr = [...staticArr];
    newStaticArr[index] = true;
    setStaticArr(newStaticArr);
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Filter PO
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="customer_id"
          label="Customer ID"
          value={filters.customer_id}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="customer_po"
          label="Customer PO"
          value={filters.customer_po}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="order_date_after"
          label="Order Date After"
          type="date"
          value={filters.order_date_after}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="order_date_before"
          label="Order Date Before"
          type="date"
          value={filters.order_date_before}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="required_date_after"
          label="Required Date After"
          type="date"
          value={filters.required_date_after}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="required_date_before"
          label="Required Date Before"
          type="date"
          value={filters.required_date_before}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="status"
          label="Status"
          value={filters.status}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleFilterSubmit}>
            Apply Filters
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Grid>
    <TableContainer component={Paper} className="order-line-table">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Customer PO</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Line Number</TableCell>
            <TableCell>Part Number</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Ship Via</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Required Date</TableCell>
            <TableCell>Confirmed Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
              staticArr[index] ? (
                <OrderLineStatic 
                  key={index} 
                  data={row} 
                  onEdit={() => handleEdit(index)}
                />
              ) : (
                <OrderLineEditting 
                  key={index} 
                  data={row} 
                  onSave={(updatedData) => handleSave(index, updatedData)}
                />
              )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default OrderLineTable;