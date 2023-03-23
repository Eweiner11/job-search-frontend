
import React, { useEffect } from 'react';
import { hot } from "react-hot-loader/root";
import Button from '@material-ui/core/Button';
import { fetchTest } from './fetchers/fetchTest';


const App = () => {

  useEffect(() => {
    fetchTest()
  }, [])

  return (
    <>
      <h1>Job Search Front End</h1>
    </>
  );
}

export default hot(App);