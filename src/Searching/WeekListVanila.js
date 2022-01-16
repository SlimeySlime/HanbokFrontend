import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from './WeekList.module.css';

const WeekList = () => {
    
    const searchPath = process.env.NODE_ENV == 'production' ? '/search' : 'http://localhost:3000/search'

    return(
        <div>
            testing ground
            {/* <ModalOveray>
            testing modal
            </ModalOveray> */}
        </div>
        

    )
}

// const ModalOveray = styled.div `
//     box-sizing: border-box;
// `

export default WeekList;