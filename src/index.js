import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Search from './Searching/Search'
import Hanbok from './Searching/Hanbok'
import WeekList from './Searching/WeekList';
import WeekList2 from './Searching/WeekList/WeekList2';
import Payment from './Searching/Payment/Payment';
import PaymentSetting from './Searching/Payment/PaymentSetting';
import Title from './Title'
import Search2 from './Searching/Search2';
import Native from './Searching/Native';
import RentalSearch from './Searching/Rental/RentalSearch';
import Rental from './Searching/Rental/Rental';

import axios from 'axios'
import MainRoute from './MainRoute';

ReactDOM.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     {/* <Title /> */}
  //     <App />
  //     <Routes>
  //       <Route path='/' element={ <Search /> }></Route>
  //       <Route path='/Search' element={ <Search /> }></Route>
  //       <Route path='/Hanbok' element= { <Hanbok /> }></Route>
  //       <Route path='/WeekList' element= { <WeekList /> }></Route>
  //       <Route path='/WeekList2' element= { <WeekList2 /> }></Route>
  //       <Route path='/Native' element= { <Native /> }></Route>
  //       <Route path='/Payment' element={<Payment />}></Route>
  //       <Route path='/PaymentSetting' element={<PaymentSetting />}></Route>
  //       <Route path='/Hanbok2' element={<Search2 />}></Route>
  //       <Route path='/RentalSearch' element={<RentalSearch />}></Route>
  //       <Route path='/Rental' element={<Rental />}></Route>
  //     </Routes>
  //   </BrowserRouter>
  // </React.StrictMode>,
  <MainRoute />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
