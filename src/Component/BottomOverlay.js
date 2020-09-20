import React from 'react'
import './Overlay.css'

export default class BottomOverlay extends React.Component{

    render(){
        return(
            <div className="overlay-bottom" 
            style={{visibility: this.props.show ? 'visible': 'hidden', 
                    opacity: this.props.show ? 1 : 0}}>
                <div className="overlay-content-bottom">
                    {this.props.message}
                </div>
            </div>
        )
    }
}