
class HourlyWeather 
{
    constructor() 
    {
        
    }

     setTemperature(temperature)
     {
        this.temperature = temperature;
     }
     getDailyTemperature()
     {
         return this.temperature;
     }

     setFeelsLike(feelsLikes)
     {
         this.feelsLikes = feelsLikes;

     }

     getFeelsLike()
     {
         return this.feelsLikes;
     }

     setHumidity(humidit)
     {
         this.humidity = humidit;
     }

     getHumidity()
     {
         return this.humidity;
     }

     

     setWeatherDescription(weatherDescription)
     {
        this.weatherDescription = weatherDescription;
     }

     getWeatherDescription()
     {
        return this.weatherDescription;
     }


     setWindSpeed(windSpeed)
     {
        this.windSpeed=windSpeed;
     }

     getWindSpeed()
     {
         return this.windSpeed;
     }

     setRainLevel(rainLevel)
     {
         this.rainLevel = rainLevel;
     }

     getRainLevel()
     {
         return this.rainLevel;
     }

     setWeekDayName(weekDayName)
     {
         this.weekDayName = weekDayName;
     }
     getWeekDayName()
     {
         return this.weekDayName;
     }

     setDayDate(dayDate)
     {
         this.dayDate = dayDate;
     }
     getDayDate()
     {
         return this.dayDate;
     }

     setDayTime(dayTime)
     {
         this.dayTime = dayTime;
     }
     getDayTime()
     {
         return this.dayTime;
     }
}

export default HourlyWeather;