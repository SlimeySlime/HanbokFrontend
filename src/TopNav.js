import './App.css';
import logo from './bdan.svg';
import React, { Component } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import AllSearch from './Searching/MainSearch/AllSearch'

class App extends Component {

  render(){
    
    return (
      <div>
        
        <nav style={{padding : '1.5rem'}} class="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
          <div className='col'>
            <img src={logo} width={'50px'} alt='비단본가'/>
          </div>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">비단본가</a>
          {/* 모바일 드롭다운 메뉴 */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03"
           aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample03">
            {/* <ul class="navbar-nav me-auto mb-2 mb-sm-0"> */}
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link className='HeaderContainer-Link nav-link active' to='/Search'>전체 검색</Link>
              </li>
              <li class="nav-item">
                <Link className='HeaderContainer-Link nav-link active' to='/Hanbok'>한복 검색</Link>
              </li>
              <li class="nav-item">
                <Link className='HeaderContainer-Link nav-link active' to='/WeekList2'>WeekList</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">대여관리</a>
                <ul class="dropdown-menu" aria-labelledby="dropdown03">
                  <Link className='HeaderContainer-Link dropdown-item' to='/RentalSearch'>대여조회</Link>
                  <Link className='HeaderContainer-Link dropdown-item' to='/Rental'>대여관리</Link>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">금전출납</a>
                <ul class="dropdown-menu" aria-labelledby="dropdown03">
                  <Link className='HeaderContainer-Link dropdown-item' to='/Payment'>경비조회</Link>
                  <Link className='HeaderContainer-Link dropdown-item' to='/PaymentSetting'>지출분류관리</Link>
                </ul>
              </li>
            </ul>

            <AllSearch />

          </div>
        </div>
      </nav>
      </div>
    )
  }
}

export default App;


