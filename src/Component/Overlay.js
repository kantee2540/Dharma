import React from 'react'
import './Overlay.css'
import { Spinner } from 'react-bootstrap'

export default class Overlay extends React.Component{
    render(){
        return(
            <div className="overlay">
                <div className="overlay-content">
                    { this.props.isLoading ?
                        <Spinner animation="border" variant="secondary" className="spinner"/>
                        : null
                    }
                    <div className="overlay-text">
                        <b>{this.props.message}</b>
                    </div>
                    
                </div>
            </div>
        )
    }
}