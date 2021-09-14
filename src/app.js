'use strict'
import React , {useState, useEffect} from 'react';
import './app.scss';
import axios from 'axios'
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App(props){

  const [state, setState] = useState({data: '', requestParams:{}});
  const [history,setHistory]=useState([]);
 
  // setPeople([...people, name]);
 async function callApi(requestParams) {
   setState({requestParams})
   setHistory([...history,requestParams.url,requestParams.method])
   try
   { 
    const dataurl = await axios.get(requestParams.url);
   console.log('dataurl',dataurl);
    const data = {
      headers: [dataurl.headers],
      results: [dataurl.data.results],
    };
    setState({data}); 
  }
  catch(e){
    console.log('error');
  }
  }
  useEffect(()=> {
    console.log("%c I RUN ON EVERY RE-RENDER", 'background:#ccc; color:red');
});
// This will run only when the name changes
useEffect(()=> {
    console.log(`%c I RUN ON HISTORY CHANGE: ${history}` , 'background:#000; color:purple');
}, [history]);

// when name or people are changed 
useEffect(()=> {
    console.log("I RUN ON STATE, HISTORY CHANGE: ", state);
}, [state, history]);

// run once on initial rendering 
// can be a good case to do a GET request form an API
useEffect(()=> {
    console.log("Initial loading ", state);
}, []);

//UNMOUNT
useEffect(()=> {
    return (()=> {
        console.log("%c Component unmounted !!", "background:yellow; color:black")
    })
});
console.log('----------',state.data);
  return (
    <React.Fragment>
      <Header />
 
             {
                history.map((item, idx)=> {
                   return <div key={idx}>{item}</div>
                })
                
            }
      <Form handleApiCall={callApi} />
      {/* <div>Request Method: {state.requestParams.method}</div> */}
      {/* <div>URL: {state.requestParams.url}</div> */}
      <Results data={state.data} />
      
      <Footer />
    </React.Fragment>
  );
}

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       requestParams: {},
//     };
//   }

//   callApi = (requestParams) => {
//     // mock output
//     const data = {
//       count: 2,
//       results: [
//         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
//         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
//       ],
//     };
//     this.setState({data, requestParams});
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div>Request Method: {this.state.requestParams.method}</div>
//         <div>URL: {this.state.requestParams.url}</div>
//         <Form handleApiCall={this.callApi} />
//         <Results data={this.state.data} />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

export default App;
