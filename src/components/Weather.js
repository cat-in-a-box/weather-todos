import React from 'react'
import WeatherBlock from './WeatherBlock'
import {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTint} from '@fortawesome/free-solid-svg-icons'
import {faHandPaper} from '@fortawesome/free-regular-svg-icons'
import {faCompressArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import {faWind} from '@fortawesome/free-solid-svg-icons'
import changeCity from '../images/changeCity.svg'
import Welcome from './Today'

function Weather(props) {
    const cityValue = props.city;
    const [temp, setTemp] = useState("");
    const [desc, setDesc] = useState("");
    const [humidity, setHumidity] = useState("");
    const [rain, setRain] = useState("");
    const [pressure, setPressure] = useState("");
    const [country, setCountry] = useState("");
    const [wind, setWind] = useState("");
    const [hourTemp, setHourTemp] = useState([]);
    const [icon, setIcon] = useState("");
    const [region, setRegion] = useState("");
    const key = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityValue + '&appid=' + key)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                setCountry(data.sys.country)
                getWeather(data.coord.lat, data.coord.lon);
            })
            .catch((error) => console.log("error", error));
    }, []);

    function getWeather(lat, lon) {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude={daily}&appid=' + key)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                setTemp(toCelsius(data.current.temp));
                setDesc(data.current.weather[0].description);
                setHumidity(data.current.humidity);
                setRain(data.current.feels_like);
                setPressure(data.current.pressure);
                setWind((data.hourly[0].wind_speed * 3.6).toFixed(1));
                setRegion(data.timezone);
                let newArray = data.hourly.filter(a => {
                    return data.hourly.indexOf(a) < 12});
                setHourTemp(newArray);
                setIcon(data.current.weather[0].icon);
            })
    }

    function toCelsius(value) {
        return Math.round(parseFloat(value) - 273.15);
    }

    function getHour(value) {
        let date = new Date(value * 1000);
        return date.getHours() + 1;
    }

    function getCurrentDate(value) {
        let date = new Date(value * 1000);
        if (date.getMonth() >= 10) {
            return `${date.getDate()}.${date.getMonth() + 1}`;
        } else {
            return `${date.getDate()}.0${date.getMonth() + 1}`;
        }
    }

    function getIcon(id) {
        return require(`../images/icons/${id}@2x.svg`);
    }

    return (
        <div className="main-component weather-container">
            <Welcome name={props.name} city={props.city}/>
            <div className="weather-big">
                <div className="weather-main">
                    <div className="weather-icon">
                        <img src={icon ? getIcon(icon) : 0} alt="" />
                    </div>
                    <div className="weather-description">
                        <div className="weather-temp">{temp}°</div>
                        <div className="weather-clouds">{desc}</div>
                    </div>
                </div>
                <div className="weather-city"><span className="welcome-subtext" id="cityValue">{cityValue},</span> {country}
                    <img src={changeCity} alt="" onClick={() => {
                        localStorage.removeItem("city")
                        window.location.reload()}}/>
                </div>
            </div>
            <div className="weather-firstrow">
                <div className="weather-specifics">
                    <div className="weather-specifics-cell weather-humidity-container">
                        <div className="weather-specifics-icon">
                            <FontAwesomeIcon icon={faTint}/></div>
                        <div className="weather-specifics-info">
                            <div className="weather-specifics-title">Humidity
                                <span className="weather-specifics-value">{humidity}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="weather-specifics-cell weather-pressure-container">
                        <div className="weather-specifics-icon">
                            <FontAwesomeIcon icon={faCompressArrowsAlt}/></div>
                        <div className="weather-specifics-info">
                            <div className="weather-specifics-title">Air Pressure
                                <span className="weather-specifics-value">{pressure} hPa</span>
                            </div>
                        </div>
                    </div>
                    <div className="weather-specifics-cell weather-rain-container">
                        <div className="weather-specifics-icon">
                            <FontAwesomeIcon icon={faHandPaper}/></div>
                        <div className="weather-specifics-info">
                            <div className="weather-specifics-title">Feels Like
                                <span className="weather-specifics-value">{toCelsius(rain)}°</span>
                            </div>

                        </div>
                    </div>
                    <div className="weather-specifics-cell weather-wind-container">
                        <div className="weather-specifics-icon">
                            <FontAwesomeIcon icon={faWind}/></div>
                        <div className="weather-specifics-info">
                            <div className="weather-specifics-title">Wind Speed
                                <span className="weather-specifics-value">{wind} km/h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="weather-secondrow"> {
                    hourTemp.map((e) => {
                        let index = hourTemp.indexOf(e)
                        return <WeatherBlock
                            temp={toCelsius(hourTemp[index] ? hourTemp[index].temp : 0)}
                            hour={getHour(hourTemp[index] ? hourTemp[index].dt : 0)}
                            date={getCurrentDate(hourTemp[index] ? hourTemp[index].dt : 0)}
                            image={getIcon(hourTemp[index].weather[0].icon)}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Weather
