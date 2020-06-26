import React,{Component} from 'react';
import './weatherForecast.css';
import {Container,Row, Col,InputGroup,FormControl} from 'react-bootstrap';
import {DropdownButton,Dropdown,ButtonGroup} from 'react-bootstrap';
import HourlyWeather from '../entity/hourlyWeather';
import Carousel from 'react-elastic-carousel';
import moment from 'moment';

class WeatherForecast extends Component
{
     
    
    constructor(props) 
    {
        super(props)

        this.state = {dailyweatherList:[],tempSelected:"Celsius",errorMessage:""};

        this.dailyweatherList=[];

        this.couroselStyle = 
        {
            
            width: 700+'px',
            height:500+'px',
            backgroundColor: '#659DBD',
            color:'#ffffff',
           
            padding:'40px'
        }

        this.bodyContainer=
        {
            width: 900+'px',
            margin: '0 auto',
        }

        this.textInput = React.createRef();     
      
    }

    //handler for temperature convertion type drop down menu
   dropDownMenuSelectionHandler=(event)=>
   {
       
        this.setState({tempSelected:event});
   }

  
   //listening to text input entry then immediately call fetch library which get weather data, and store the data in the state
   handleTextInputChange=() =>
   {

        let cityId = this.textInput.current.value;

        let regex = "^[0-9]+$"
       
        if(cityId.match(regex)!=null)
        { 

            fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=075db3ae4a1ecc4f318ad3ebf4ad4ac0`)
            .then(res => 
                { 
                    if(res.status==404)
                    {
                        this.setState({dailyweatherList:[]});  
                    }
                    else
                    {
                        return res.json();
                    }
                   
                })
            .then(result => 
            {
                if(result)
                {
                    for(let index in result.list)
                    {
                        this.hourlyWeather = new HourlyWeather();

                        this.hourlyWeather.setWeekDayName(moment(result.list[index].dt_txt).format('dddd'));

                        this.hourlyWeather.setDayDate(moment(result.list[index].dt_txt).format('LL'));

                        this.hourlyWeather.setDayTime(moment(result.list[index].dt_txt).format('LTS'));

                        this.hourlyWeather.setWeatherDescription(result.list[index].weather.description);

                        //calls method that does temperature convertion
                        this.tempConvertion(result.list[index].main.temp, result.list[index].main.feels_like);

                        this.hourlyWeather.setHumidity(result.list[index].main.humidity);

                        this.hourlyWeather.setWindSpeed(result.list[index].wind.speed);

                        this.hourlyWeather.setRainLevel(result.list[index].rain);

                        this.dailyweatherList.push(this.hourlyWeather); 
                    }
                    this.setState({dailyweatherList:this.dailyweatherList});
                }
                else
                {
                    this.setState({dailyweatherList:[]});
                }
                
            })
            .catch(error => this.setState({errorMessage:""}));
            
            this.setState({errorMessage:""});
            
        }
        else
        {
            this.setState({errorMessage:"Please enter valid city id (e.g. 2172797)"});
           
        }

    }

    //convert kelvin to celsius or fahrenheit
    tempConvertion(temperature, feelsLike)
    {
        if (this.state.tempSelected=="Celsius")
        {
            let temp =(Math.round((temperature-273.15) * 100)/100)+" *C"

            let feelsLikeTemp =(Math.round((feelsLike-273.15) * 100)/100)+" *C";

            this.hourlyWeather.setTemperature(temp );

            this.hourlyWeather.setFeelsLike(feelsLikeTemp);
        }
        else if (this.state.tempSelected=="Fahrenheit")
        {
            let temp =(Math.round(((temperature-273.15) * 9/5 + 32) * 100)/100)+" *F"

            let feelsLikeTemp =(Math.round(((temperature-273.15) * 9/5 + 32) * 100)/100)+" *F";

            this.hourlyWeather.setTemperature(temp);

            this.hourlyWeather.setFeelsLike(feelsLikeTemp);
        }
    }

    // called by render method to populate weather table for view
   renderTableRows() 
   {
    
        return <Carousel style={this.couroselStyle}>
        {
            this.state.dailyweatherList.map((dailyweather,index) => 
            {
          
                return <div> <Col>
                    <Row >
                      <Col className="offset:6">         
                        
                        <label key={index} style={{textAlign:'right', fontSize:35+'px'}} >{dailyweather.getWeekDayName()}</label>
                       
                       </Col>   
                    </Row>

                    <Row className="mt-4">

                        <label>Date: </label><label className="ml-2"> {dailyweather.getDayDate()}</label>

                    </Row>


                    <Row className="mt-4">

                        <label>Time: </label><label className="ml-2"> {dailyweather.getDayTime()}</label>

                    </Row>

                    <Row className="mt-4">

                        <label>Temperature: </label><label className="ml-2"> {dailyweather.getDailyTemperature()}</label>

                    </Row>

                    <Row className="mt-4">

                        <label>Feels Like: </label><label className="ml-2"> {dailyweather.getFeelsLike()}</label>

                    </Row>
                      
                    <Row className="mt-4">
                    
                        <label>Wind: </label><label className="ml-2"> {dailyweather.getWindSpeed()}</label>

                    </Row>

                    <Row className="mt-4 mb-5">

                        <label>Humidity: </label><label className="ml-2"> {dailyweather.getHumidity()}</label>
                    
                    </Row>
                            
                </Col>

                </div>
            })
        }
        
        </Carousel>
        
    }

    render()
    {
        
        return(
             
            <div >
                <Container style={this.bodyContainer}>
                    <Row>
                        <Col>
                            <InputGroup size="sm" className="mt-5">
                                <InputGroup.Prepend>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"   ref={this.textInput} type="text" onChange={() => this.handleTextInputChange()}/>
                            </InputGroup></Col>
                        <Col>
                            <DropdownButton 
                                as={ButtonGroup}
                                key="right"
                                id={`dropdown-button-drop-right`}
                                drop="right"
                                variant="secondary"
                                title={` Temp Select `}
                                onSelect={this.dropDownMenuSelectionHandler}>

                                <Dropdown.Item eventKey="Celsius">*C (Temp in celsius)</Dropdown.Item>

                                <Dropdown.Item eventKey="Fahrenheit">*F (Temp in fahrenheit)</Dropdown.Item>

                            </DropdownButton>

                            <label className="mt-5 ml-2" >{this.state.tempSelected} selected</label>
                        </Col>
                    </Row>
                    <Row>

                        <h3 className="error ml-5 mt-1" style={{fontSize:13+'px', color:'red'}}> { this.state.errorMessage } </h3> 
                    
                    </Row>
                   
                    <Row className="mt-3">
                            
                        {this.renderTableRows()}

                    </Row>
                        
                </Container>
                
            </div>
        );
          

    }
    
} 
export default WeatherForecast;