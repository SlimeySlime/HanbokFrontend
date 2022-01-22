import './App.css';
// import './bootstrap/bootstrap.css'
import React, { Component } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'


class App extends Component {

  render(){
    
    return (
      <div>
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


