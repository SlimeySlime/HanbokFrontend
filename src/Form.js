import React, { Component } from 'react';


class Form extends Component{
    initailState = { 
        name : '', 
        job: ''
    }

    state = this.initailState

    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,  // name = key값, value = name  컴포넌트의 name='job' value={job}
        })
    }

    render(){
        const { name, job } = this.state
        return(
            <form>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' value={name} onChange={this.handleChange} />
                <label htmlFor='job'>Job</label>
                <input
                    type='text' name='job' id='job' value={job} onChange={this.handleChange}
                />
                <input type='button' value='submit' onClick={this.submitForm}/>
            </form>
        )
    }

    submitForm = () => {
        console.dir(this.state)
        this.props.handleSubmit(this.state)
        this.setState({
            name: '', 
            job: '' // == this.initialState
        })
    }
}

export default Form;