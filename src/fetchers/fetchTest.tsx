import axios from 'axios';

export const fetchTest = async () => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/');
    console.log('this is the resulting data', data);
  } catch (err) {}
};
