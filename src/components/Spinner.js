import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className='text-center '>
                <img className='col-md-1' src={loading} alt='loading'></img>
            </div>
        )
    }
}
