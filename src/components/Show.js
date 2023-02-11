import React from 'react'
import Form from './Form'
import Titles from './Titles'
import Weather from './Weather'


export default class Show extends React.Component{
   state={
    longitude: undefined,
    lattitude: undefined,
    temprature:undefined,
    humidity:undefined,
    description:undefined,
    wind:undefined,
    error:undefined

   }
   getWeather=async(e)=>{
    e.preventDefault();
    const longitude=e.target.elements.longitude.value;
    const lattitude=e.target.elements.lattitude.value;
    const api_call=await fetch(`https://fcc-weather-api.glitch.me/api/current?lon=${longitude}&lat=${lattitude}`, {method: 'get'});
    const data=await api_call.json();
    console.log(data);
    if(longitude&&lattitude){
        this.setState({
        longitude:data.coord.lon,
        lattitude: data.coord.lat,
				temperature: data.main.temp,
				humidity: data.main.humidity,
				description: data.weather[0].description,
				wind: data.wind.speed,
				error: ""
        })

    }else{
        this.setState({ longitude: undefined,
            lattitude: undefined,
            temprature:undefined,
            humidity:undefined,
            description:undefined,
            wind:undefined,
            error:"please Enter"})
    }

   }
    render(){
        return(
            <>
            <div>
           <div className='wrapper'>
            <div className="main">
                <div className='container shadow'>
                <div className="row">
                    <div className='col-sm-5 title-container'>
                    <Titles/>
                </div>
                <div className='col-sm-7 form-container'>
                    <Form  getWeather={this.getWeather}/>
                    <Weather
                    longitude={this.state.longitude}
                    lattitude={this.state.lattitude}
                    temperature={this.state.temprature}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    wind={this.state.wind}
                    error={this.state.error}
                    />
                </div>
                </div>
                </div>
            </div>
           </div>
           </div>
            </>
        )
    }
}