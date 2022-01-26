import './App.css';
// import './bootstrap/bootstrap.css'
import React, { Component } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'


class App extends Component {

  render(){
    
    return (
      <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">비단본가</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample03">
            <ul class="navbar-nav me-auto mb-2 mb-sm-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                <ul class="dropdown-menu" aria-labelledby="dropdown03">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            {/* <form>
              <input class="form-control" type="text" placeholder="Search" aria-label="Search" />
            </form> */}
          </div>
        </div>
      </nav>
        <nav className='HeaderContainer' style={
            {
              borderBottom:'solid 1px',
              paddingBottom: '1rem'
            }
        }>
          {/* <Link className='HeaderContainer-Link' to='/Table'>Table</Link> */}
          <Link className='HeaderContainer-Link' to='/Search'>Search</Link>
          <Link className='HeaderContainer-Link' to='/Hanbok'>Hanbok</Link>
          <Link className='HeaderContainer-Link' to='/Hanbok2'>Hanbok2</Link>
          <Link className='HeaderContainer-Link' to='/WeekList'>WeekList</Link>
          <Link className='HeaderContainer-Link' to='/WeekListVanila'>WeekList2</Link>
          <Link className='HeaderContainer-Link' to='/Native'>Native</Link>
          {/* <Link className='HeaderContainer-Link' to='/Payment'>Payment</Link> */}
          <a className='dropdown inline'>
            <button className='btn btn-secondary dropdown-toggle' type='button' 
              id='dropdwonMenuLink' data-bs-toggle='dropdown' aria-expanded="false">
              금전출납
            </button>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <Link className='HeaderContainer-Link dropdown-item' to='/PaymentSetting'>지출분류관리</Link>
              <Link className='HeaderContainer-Link dropdown-item' to='/Payment'>경비조회</Link>
              {/* <a className='dropdown-item' href='/Payment'>경비조회</a> */}
            </div>
          </a>
        </nav>
      </div>
    )
  }

  
}

export default App;


