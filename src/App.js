import './App.css';
// import './bootstrap/bootstrap.css'
import React, { Component } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'


class App extends Component {
  state = {
    characters : [
      // {name: 'Charlie', job: 'Backend'} , ...
    ]
  }

  render(){
    const characters = this.state.characters  // this.state 로도 가능한듯?
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
          <Link className='HeaderContainer-Link' to='/WeekList'>WeekList</Link>
        </nav>
      </div>
    )
  }

  
}

export default App;

