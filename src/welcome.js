import React from 'react';

import './App.css';
import './welcome.css';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            day: 0,
            contentBody: "",
            contentVisible: false,
            currentLocation: "Istanbul/Turkey",
            theme: "Night",
            settingsVisible: false
        };
        this.testData = this.testData.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.timerID = setInterval(() => this.dayOfWeek(), 1000);
        this.testData();
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
        var color;
        if (this.state.theme === "Night") {
            color = "#0a8dd2";
        }
        if (this.state.theme === "Pinky") {
            color = "#ff3399";
        }
        if (this.state.theme === "Forest") {
            color = "#33cc33";
        }

        var child = document.querySelectorAll("div.sector");

        if (this.state.day === 0) { child[4].style.backgroundColor = color; child[3].style.backgroundColor = "transparent";}
        else if (this.state.day === 1) { child[5].style.background = color; child[4].style.backgroundColor = "transparent";}
        else if (this.state.day === 2) { child[6].style.background = color; child[5].style.backgroundColor = "transparent";}
        else if (this.state.day === 3) { child[0].style.background = color; child[6].style.backgroundColor = "transparent";}
        else if (this.state.day === 4) { child[1].style.background = color; child[0].style.backgroundColor = "transparent";}
        else if (this.state.day === 5) { child[2].style.background = color; child[1].style.backgroundColor = "transparent";}
        else if (this.state.day === 6) { child[3].style.background = color; child[2].style.backgroundColor = "transparent";}
    }
    newsList(event, someParameter) {
        var element;
        if (this.state.settingsVisible === true) {
            element = document.getElementsByClassName("settings");
            element[0].style.display = 'none';

            this.setState({
                settingsVisible: false
            });
        }

        if (this.state.contentVisible === false) {
            element = document.getElementsByClassName("content");
            element[0].style.display = 'block';

            element = document.getElementsByClassName("clock-container");
            element[0].style.float = "left";

            this.setState({
                contentVisible: true
            });
        }
        else {

            element = document.getElementsByClassName("content");
            element[0].style.display = 'none';

            element = document.getElementsByClassName("clock-container");
            element[0].style.float = "none";

            this.setState({
                contentVisible: false
            });
        }


    }
    settings(event, someParameter) {
        var element;
        if (this.state.contentVisible === true) {
            element = document.getElementsByClassName("content");
            element[0].style.display = 'none';

            element = document.getElementsByClassName("clock-container");
            element[0].style.float = "none";

            this.setState({
                contentVisible: false
            });
        }
        if (this.state.settingsVisible === false) {
            element = document.getElementsByClassName("settings");
            element[0].style.display = 'block';

            this.setState({
                settingsVisible: true
            });
        }
        else {

            element = document.getElementsByClassName("settings");
            element[0].style.display = 'none';

            this.setState({
                settingsVisible: false
            });
        }


    }

    testData() {
        const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
        console.log(todos);

        

    }
    handleOptionChange(e) {
        console.log(e.target.value);
        this.setState({
            theme: e.target.value
        });

        var element;
        if (e.target.value === "Night") {        
            document.body.style.backgroundImage = "url('./background.jpg')";
            element = document.getElementsByClassName("clock-container")[0];
            element.style.backgroundColor = "#000e29";
            element.style.opacity = "0.7";
            document.getElementsByClassName("digital")[0].style.color = "white";
            element = document.getElementsByClassName("content")[0];
            element.style.backgroundColor = "#000e29";
            element.style.opacity = "0.7";
            document.getElementById("seconds-indicator").style.backgroundColor = "#b3e3e3";
            document.getElementById("minutes-indicator").style.backgroundColor = "#0261a9";
            document.getElementById("hours-indicator").style.backgroundColor = "#02e3e3";

            
        }
        if (e.target.value === "Pinky") {
            document.body.style.backgroundImage = "url('./pinkBackground.jpg')"; 
            element = document.getElementsByClassName("clock-container")[0];
            element.style.backgroundColor = "#b30000";
            element.style.opacity = "0.7";
            document.getElementsByClassName("digital")[0].style.color = "#b30000";
            element = document.getElementsByClassName("content")[0];
            element.style.backgroundColor = "#b30000";
            element.style.opacity = "0.7";
            document.getElementById("seconds-indicator").style.backgroundColor = "#ffccff";
            document.getElementById("minutes-indicator").style.backgroundColor = "#ff0066";
            document.getElementById("hours-indicator").style.backgroundColor = "#ff00ff";
            

            
        }
        if (e.target.value === "Forest") {
            document.body.style.backgroundImage = "url('./greenBackground.jpg')";
            element = document.getElementsByClassName("clock-container")[0];
            element.style.backgroundColor = "#024b02";
            element.style.opacity = "0.8";
            document.getElementsByClassName("digital")[0].style.color = "#026402";
            element = document.getElementsByClassName("content")[0];
            element.style.backgroundColor = "#024b02";
            element.style.opacity = "0.8";
            document.getElementById("seconds-indicator").style.backgroundColor = "#ccffdd";
            document.getElementById("minutes-indicator").style.backgroundColor = "#00b300";
            document.getElementById("hours-indicator").style.backgroundColor = "#80ff80"; 
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
                {<div className="digital"> {this.state.date.toLocaleTimeString()} <br/> {this.state.currentLocation}</div>}

                <div className="settings">
                    <div className="settingsContent">
                        <text className="header">Select a Theme </text>
                        <br/>
                        <table>
                            <tr onChange={this.handleOptionChange.bind(this)}>
                                <td>
                                <div className="radio">
                                        <label><input type="radio" id='regular'
                                            name="theme"
                                            checked={this.state.theme === 'Night'} 
                                            //onChange={this.handleOptionChange}
                                            value="Night"/><text className="themeName">Night</text>
                                            <div className="DarkBlueClock"><div className="line1"></div> <div className="line2"></div></div>
                                        </label>
                                 </div>
                                </td>
                                <td>
                                    <div className="radio">
                                        <label><input type="radio" id='regular'
                                            name="theme"
                                            //onChange={this.handleOptionChange}
                                            checked={this.state.theme === 'Pinky'}
                                            value="Pinky"
                                            /><text className="themeName">Pinky</text>
                                            <div className="PinkClock"><div className="line1"></div> <div className="line2"></div></div>
                                       </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="radio">
                                        <label><input type="radio" id='regular'
                                            name="theme"
                                           // onChange={this.handleOptionChange}
                                            checked={this.state.theme === 'Forest'}
                                            value="Forest"/><text className="themeName">Forest</text>
                                            <div className="GreenClock"><div className="line1"></div> <div className="line2"></div></div>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    
                </div>

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
                        <div className="indicator-cover" onClick={(e) => { this.settings(e, 1) }}></div>
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
