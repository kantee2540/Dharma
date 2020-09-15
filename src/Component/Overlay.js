import React from 'react'
import './Overlay.css'

export default class Overlay extends React.Component{
    render(){
        return(
            <div className="overlay">
                <div className="overlay-content">
                    {this.props.message}
                </div>
            </div>
        )
    }
}