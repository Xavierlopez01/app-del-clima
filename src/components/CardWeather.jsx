import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({ lat, lon}) => {


    const [weather, setWeather] = useState()
    const [temperture, setTemperture] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        if (lat) {
            const APIkey = 'cca2266c30f17536621af083f2529958'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)} ºC`,
                        farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} ºF`
                    }
                    setTemperture(temp)
                    setIsloading(false)
                })
                .catch(err => console.log(err))
        }

    }, [lat, lon])
    console.log(weather)

    const handleClick = () => setIsCelsius(!isCelsius)

    if(isloading){
        return <LoadingScreen />
    }else{
        return (
            <article className='card'>
                <h1 className='card__title'>Weather App</h1>
                <h2 className='card__country'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
                <div className='card__container'>
                    <img className='card__container-img' src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="img climate" />
                    <div className='card__container-contents'>
                        <h3 className='card__container-title'>&#34;{weather?.weather[0].description}&#34;</h3>
                        <ul className='card__container-data'>
                            <li><i className="fa-solid fa-wind"></i> Wind Speed: <span className='card__container-data-data'>{weather?.wind.speed} m/s</span></li>
                            <li><i className="fa-solid fa-cloud"></i> Clouds: <span className='card__container-data-data'>{weather?.clouds.all}%</span></li>
                            <li><i className="fa-solid fa-prescription-bottle"></i> Pressure: <span className='card__container-data-data'>{weather?.main.pressure} hPa</span></li>
                            <li><i className="fa-regular fa-raindrops"></i> Humidity: <span className='card__container-data-data'>{weather?.main.humidity}%</span></li>
                        </ul>
                    </div>
                </div>
                <div className='card__temp' >
                <h2 className='card__temp-temp'>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2>
                <button className='card__temp-btn' onClick={handleClick}>{isCelsius ? 'Change to ºF' : 'Change to ºC'}</button>
                </div>
                <footer className='footer'>Created by <a href="https://xavier-lopez-portfolio.netlify.app/" target={'_blank'}>Xavier López</a></footer>
            </article>
        )
    }


}

export default CardWeather