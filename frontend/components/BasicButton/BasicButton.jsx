import Button from '@mui/material/Button';
import axios from 'axios';
import './styles.css';

export default function BasicButton() {
  const sendRequest = async() => {
    const response = await axios.get('http://localhost:8000/orders/');
    console.log(response.data);
  }
  return (
      <Button variant="contained" onClick={sendRequest} className="custom-button">Hello</Button>
  );
}