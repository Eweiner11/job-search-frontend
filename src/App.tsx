
import * as React from 'react';
import { hot } from "react-hot-loader/root";
import Button from '@material-ui/core/Button';
import { fetchTest } from './fetchers/fetchTest';


interface Props {
  name:
  string
}

class App extends React.Component<Props> {

  

  componentDidMount(): void {
   fetchTest()
  }


  render() {
    const { name } = this.props;
    return (
      <>
        <h1>Job Search Front End</h1>
      </>
    );
  }
}

export default hot(App);
