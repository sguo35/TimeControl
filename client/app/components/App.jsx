'use strict';

/**
 * Module dependencies.
 */
import React from 'react';
import CircularProgressbar from "react-circular-progressbar";
import "whatwg-fetch";

/**
 * App component
 */
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            json: {
                timeLeft: 10
            }
        };
        setInterval(this.func, 5000);
    }
    func = async () => {
        console.log("Fetching...");
        let response = await fetch("http://localhost:4000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let json = await response.json();
        this.setState({json: json});
    }
    render = () => {
        return (
            <div style={{
                height: "60%", width: "60%", margin: 'auto', marginTop: 15,
                fontfamily: 'Raleway, sans-serif'
            }}>
                <CircularProgressbar percentage={this.state.json.timeLeft}
                    textForPercentage={(pct) => pct + ' min'} />
            </div>
        );
    }
}