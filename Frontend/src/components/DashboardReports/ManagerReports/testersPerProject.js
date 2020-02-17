import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios'

const GlobalVar = require("../../../GlobalVar");

class TestersPerManagerProject extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            data:{}
        }
    }

    componentWillMount(){
        let data = {email:localStorage.getItem('email')}
        axios.post(GlobalVar.server_base_url+'manager/reports/testersPerProject',data).then((response)=>{
            let bc=[]
            response.data['Projects'].forEach((each)=>{
                let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
                bc.push(c)
            })

            this.setState({
                data:{
                    labels:response.data['Projects'],
                    datasets:[{
                        data:response.data['NumberOfTesters'],
                        backgroundColor:bc,
                        hoverBackgroundColor:bc
                    }]
                }
            })
        }).catch((err)=>{
            console.log("Error in TestersPerManagerProject: "+err);
        })
    }

    render(){
        return(
            <div>
                <h2>Testers Count Per Project</h2>
                <Doughnut data={this.state.data} 
                        width={100}
                        height={40}
                        options={{ maintainAspectRatio: true }}
                />
            </div>
        )
    }
}

export default TestersPerManagerProject