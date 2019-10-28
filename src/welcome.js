import React from 'react';

//import './App.css';
import './welcome.css';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            day: 0,
            contentBody: "",
            contentVisible: false
        };
    
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.timerID = setInterval(() => this.dayOfWeek(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    dayOfWeek() {
        var day = this.state.date.getDay();
        this.setState({
            day: day
        });
        
        var child = document.querySelectorAll("div.sector");

        if (this.state.day === 0) { child[4].style.backgroundColor = "#0a8dd2"; child[3].style.backgroundColor = "transparent";}
        else if (this.state.day === 1) { child[5].style.background = "#0a8dd2"; child[4].style.backgroundColor = "transparent";}
        else if (this.state.day === 2) { child[6].style.background = "#0a8dd2"; child[5].style.backgroundColor = "transparent";}
        else if (this.state.day === 3) { child[0].style.background = "#0a8dd2"; child[6].style.backgroundColor = "transparent";}
        else if (this.state.day === 4) { child[1].style.background = "#0a8dd2"; child[0].style.backgroundColor = "transparent";}
        else if (this.state.day === 5) { child[2].style.background = "#0a8dd2"; child[1].style.backgroundColor = "transparent";}
        else if (this.state.day === 6) { child[3].style.background = "#0a8dd2"; child[2].style.backgroundColor = "transparent";}
    }
    newsList(event, someParameter) {
        if (this.state.contentVisible === false) {
            var element = document.getElementsByClassName("content");
            element[0].style.display = 'block';

            element = document.getElementsByClassName("clock-container");
            element[0].style.float = "left";

            this.setState({
                contentVisible: true
            });
        }
        else {

            var element = document.getElementsByClassName("content");
            element[0].style.display = 'none';

            element = document.getElementsByClassName("clock-container");
            element[0].style.float = "none";

            this.setState({
                contentVisible: false
            });
        }


    }

    render() {

        const hoursDegrees = this.state.date.getHours() * 30 + this.state.date.getMinutes() / 2;
        const minutesDegrees = this.state.date.getMinutes() * 6 + this.state.date.getSeconds() / 10;
        const secondsDegrees = this.state.date.getSeconds() * 6;

        const divStyleHours = {
            transform: "rotateZ(" + hoursDegrees + "deg)"
        };

        const divStyleMinutes = {
            transform: "rotateZ(" + minutesDegrees + "deg)"
        };

        const divStyleSeconds = {
            transform: "rotateZ(" + secondsDegrees + "deg)"
        };


        return (
            <div >
                {<div className="digital"> {this.state.date.toLocaleTimeString()}</div>}
                <div className="clock-container styling">
                    <div id="clock" className="clock-content">
                    
                        <div className="surface">
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                        </div>

                        <div className="activity">
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                            <div className="sector"></div>
                        </div>

                        <div className="news">
                            <div className="sector" onClick={(e) => { this.newsList(e, 1)}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, 1) }}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, 1) }}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, 1) }}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, 1) }}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, 1) }}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, 1) }}></div>
                        </div>

                        <div className="weather">
                            <div className="sector" ></div>
                            <div className="sector" ></div>
                            <div className="sector" ></div>
                            <div className="sector" ></div>
                            <div className="sector" ></div>
                            <div className="sector" ></div>
                            <div className="sector" ></div>
                        </div>
                        
                        
                   
                        <text className="monday">Monday</text>
                        <text className="tuesday">Tuesday</text>
                        <text className="wednesday">Wednesday</text>
                        <text className="thursday">Thursday</text>
                        <text className="friday">Friday</text>
                        <text className="saturday">Saturday</text>
                        <text className="sunday">Sunday</text>
                            
                        

                        <div
                            id="hours-indicator"
                            className={
                                "indicator hours-indicator " +
                                (this.state.date.getHours() === 0 ? "" : "transition-effect")
                            }
                            style={divStyleHours}></div>
                        <div
                            id="minutes-indicator"
                            className={
                                "indicator minutes-indicator " +
                                (this.state.date.getMinutes() === 0 ? "" : "transition-effect")
                            }
                            style={divStyleMinutes}></div>
                        <div
                            id="seconds-indicator"
                            className={
                                "indicator seconds-indicator " +
                                (this.state.date.getSeconds() === 0 ? "" : "transition-effect")
                            }
                            style={divStyleSeconds}></div>
                        <div className="indicator-cover"></div>
                    </div>
                    

                </div>
                <div className="content">
                    {this.state.contentBody}
                </div>
            </div>
        );
    }
}


export default Welcome;
