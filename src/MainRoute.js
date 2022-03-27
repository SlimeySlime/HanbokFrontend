import React, {useState, useEffect} from 'react';
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
import HanbokUpload from './Upload/HanbokUpload'

import axios from 'axios';

const MainRoute = () => {

    const [goodsData, setGoodsData] = useState([]);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'

    // useEffect(() => {
    //     const goods = {}
    //     axios.get(searchPath + '/hanbok')
    //     .then((result) => {
    //         const goods = {}
    //         result.data.filter((item) => {
    //             return goods[item.gs_name] = item
    //         })
    //         setGoodsData(goods)
    //     })
    // },[])

    return(
        <React.StrictMode>
            <BrowserRouter>
            {/* <Title /> */}
            <App />
            <Routes>
                <Route path='/' element={ <Search /> }></Route>
                <Route path='/Search' element={ <Search /> }></Route>
                <Route path='/Hanbok' element= { <Hanbok /> }></Route>
                <Route path='/WeekList' element= { <WeekList /> }></Route>
                {/* <Route path='/WeekList2' element= { <WeekList2 /> }></Route> */}
                <Route path='/WeekList2' element= { <WeekList2 goods={goodsData}/> }></Route>
                <Route path='/Native' element= { <Native /> }></Route>
                <Route path='/Payment' element={<Payment />}></Route>
                <Route path='/PaymentSetting' element={<PaymentSetting />}></Route>
                <Route path='/Hanbok2' element={<Search2 />}></Route>
                <Route path='/RentalSearch' element={<RentalSearch />}></Route>
                <Route path='/Rental' element={<Rental />}></Route>
                <Route path='/HanbokUpload' element={<HanbokUpload/>}></Route>
            </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default MainRoute;