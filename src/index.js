import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Search from './Searching/Search'
import Hanbok from './Searching/Hanbok'
import WeekList from './Searching/WeekList';
import WeekListVanila from './Searching/WeekListVanila';
import Payment from './Searching/Payment/Payment';
import PaymentSetting from './Searching/Payment/PaymentSetting';
import Title from './Title'
import Search2 from './Searching/Search2';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Title />
      <App />
      <Routes>
        <Route path='/' element={ <Search /> }></Route>
        <Route path='/Search' element={ <Search /> }></Route>
        <Route path='/Hanbok' element= { <Hanbok /> }></Route>
        <Route path='/WeekList' element= { <WeekList /> }></Route>
        <Route path='/WeekListVanila' element= { <WeekListVanila /> }></Route>
        <Route path='/Payment' element={<Payment />}></Route>
        <Route path='/PaymentSetting' element={<PaymentSetting />}></Route>
        <Route path='/Hanbok2' element={<Search2 />}></Route>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
