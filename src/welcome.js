import React from 'react';
import uuid from "uuid";

import './App.css';
import './welcome.css';
import News from "./components/news.js"
import Todos from "./components/todo.js"


const CATEGORY = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

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

            let placed_component = ""
            if (someParameter["SectorID"] === "News") {
                placed_component = <News key={uuid.v4()} country={this.state.newsCountry} category={CATEGORY[someParameter["DayID"]]} />
            } else if (someParameter["SectorID"] === "Todos") {
                placed_component = <Todos key={uuid.v4()} DayID={someParameter["DayID"]} />
            }

            this.setState({
                contentBody: placed_component,
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

    changeFont(event, someParameter) {

        if (someParameter === "a") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Times New Roman";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Times New Roman");
           
        }
        if (someParameter === "b") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Arial";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Arial");
        }
        if (someParameter === "c") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Comic Sans MS";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Comic Sans MS");
        }
        if (someParameter === "d") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Impact";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Impact");
        }
        if (someParameter === "e") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Courier New";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Courier New");
        }
        if (someParameter === "f") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Brush Script MT";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Brush Script MT");
        }
        if (someParameter === "g") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Papyrus";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Papyrus");
        }
        if (someParameter === "h") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Copperplate";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Copperplate");
        }
        if (someParameter === "i") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Goudy Old Style";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Goudy Old Style");
        }
        if (someParameter === "j") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Baskerville";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Baskerville");
        }
        if (someParameter === "k") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Rockwell";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Rockwell");
        }
        if (someParameter === "l") {
            document.getElementsByTagName("body")[0].style.fontFamily = "Lucida Bright";
            document.querySelectorAll('option').forEach(e => e.style.fontFamily = "Lucida Bright");
        }
        
    }

    changeLocation(event, someParameter) {
         this.setState({
             currentLocation: someParameter
            });
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

                        <text className="header">Select a Font Family</text>
                        <br />
                        <table>
                            <tr>
                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "a") }}>
                                    <p className="a">Times New Roman</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "b") }}>
                                   <p className="b">Arial</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "c") }}>
                                    <p className="c">Comic Sans MS</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "d") }}>
                                   <p className="d">Impact</p>
                                </td>

                            </tr>

                            <tr>
                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "e") }}>
                                    <p className="e">Courier New</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "f") }}>
                                    <p className="f">Brush Script MT</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "g") }}>
                                    <p className="g">Papyrus</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "h") }}>
                                    <p className="h">Copperplate</p>
                                </td>

                            </tr>

                            <tr>
                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "i") }}>
                                    <p className="i">Goudy Old Style</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "j") }}>
                                    <p className="j">Baskerville</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "k") }}>
                                    <p className="k">Rockwell</p>
                                </td>

                                <td className="tableCell" onClick={(e) => { this.changeFont(e, "l") }}>
                                    <p className="l">Lucida Bright</p>
                                </td>

                            </tr>
                            

                        </table>
                        <text className="header">Select a Location</text>
                        <br />
                        <div class="form-group">
                           
                            <select multiple class="form-control" id="exampleFormControlSelect2">
                                <option onClick={(e) => { this.changeLocation(e, "Amsterdam/Netherlands") }}>Amsterdam</option> <option onClick={(e) => { this.changeLocation(e, "Taipei/Taiwan") }}>Taipei</option>
                                <option onClick={(e) => { this.changeLocation(e, "Barcelona/Spain") }}>Barcelona</option> <option onClick={(e) => { this.changeLocation(e, "Hong Kong") }}>Hong Kong</option>
                                <option onClick={(e) => { this.changeLocation(e, "Tokyo/Japan") }}>Tokyo</option> <option onClick={(e) => { this.changeLocation(e, "London/United Kingdom") }}>London</option>
                                <option onClick={(e) => { this.changeLocation(e, "Dubai/United Arab Emirates") }}>Dubai</option> <option onClick={(e) => { this.changeLocation(e, "Paris/France") }}>Paris</option>
                                <option onClick={(e) => { this.changeLocation(e, "New York City/USA") }}>New York City</option> <option onClick={(e) => { this.changeLocation(e, "Singapore") }}>Singapore</option>
                                <option onClick={(e) => { this.changeLocation(e, "Mumbai/India") }}>Mumbai</option> <option onClick={(e) => { this.changeLocation(e, "Delhi/India") }}>Delhi</option>
                                <option onClick={(e) => { this.changeLocation(e, "Prague/Czech Republic") }}>Prague</option> <option onClick={(e) => { this.changeLocation(e, "Istanbul/Turkey") }}>Istanbul</option>
                                <option onClick={(e) => { this.changeLocation(e, "Mecca/Saudi Arabia") }}>Mecca</option> <option onClick={(e) => { this.changeLocation(e, "Rome/Italy") }}>Rome</option>
                                <option onClick={(e) => { this.changeLocation(e, "Miami/USA") }}>Miami</option> <option onClick={(e) => { this.changeLocation(e, "Guangzhou/China") }}>Guangzhou</option>
                                <option onClick={(e) => { this.changeLocation(e, "Seoul/South Korea") }}>Seoul</option> <option onClick={(e) => { this.changeLocation(e, "Bangkok/Thailand") }}>Bangkok</option>
                                <option onClick={(e) => { this.changeLocation(e, "Shanghai/China") }}>Shanghai</option> <option onClick={(e) => { this.changeLocation(e, "Los Angeles/USA") }}>Los Angeles</option>
                            </select>
                            
                        </div>
                       

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
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "Todos", "DayID": 2})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "Todos", "DayID": 3})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "Todos", "DayID": 4})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "Todos", "DayID": 5})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "Todos", "DayID": 6})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "Todos", "DayID": 0})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "Todos", "DayID": 1})}}></div>
                        </div>

                        <div className="news">
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "News", "DayID": 2})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "News", "DayID": 3})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "News", "DayID": 4})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "News", "DayID": 5})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "News", "DayID": 6})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "News", "DayID": 0})}}></div>
                            <div className="sector" onClick={(e) => { this.newsList(e, {"SectorID": "News", "DayID": 1})}}></div>
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
