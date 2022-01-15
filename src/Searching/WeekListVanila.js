import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import style from './WeekList.module.css';
import Flickity from 'react-flickity-component'

const WeekList = () => {
    

    const searchPath = process.env.NODE_ENV == 'production' ? '/search' : 'http://localhost:3000/search'


    return(
        <div className='container-fluid'>
            testing ground
                                
        </div>

    )
}

export default WeekList;