import React from 'react';

class Todos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dayoffset: 0,
            date: 0,
            todos: ["Apple", "Banana", "Carrot", "Durian"]
        }
    }
    
    componentDidMount() {
        //Compute Date
        var date = new Date()
        var dayoffset = this.props.DayID -  date.getDay()
        console.log(this.props.DayID)
        date.setDate(date.getDate() + dayoffset + 1)

        this.setState({
            date: date
        })

        


    }

    render() {
        return (
            <div style= {{textAlign: "center",  color: 'white'}}>
                <h1>{this.state.date.toLocaleString().substring(0,10)}</h1>
                <table class="table">
                    <tbody>
                        <tr>
                            <td>The Shawshank Redemption</td>
                            <td><button class="btn btn-action"><h5>X</h5></button></td>
                        </tr>
                        <tr>
                            <td>The Shawshank Redemption</td>
                            <td><button class="btn btn-action"><h5>X</h5></button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            
        )
    }


}

export default Todos