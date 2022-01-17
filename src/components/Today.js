import React from 'react'
import {faSmileWink} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Today(props) {
    const [fact, setFact] = useState();
    const [today, setToday] = useState("");
    const [monthDay, setMonthday] = useState("");
    const [monthName, setMonthname] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        let today = new Date();
        let date = today.getDay();
        let monthday = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayName = days[date];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthName = months[month];
        setToday(dayName);
        setMonthday(monthday);
        setMonthname(monthName);
        setYear(year);
    }, [])

    useEffect(() => {
        const fetchFacts = () => {
            fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
                .then(function (resp) {
                    return resp.json()
                })
                .then((resp) => {
                    if (resp.text.length > 100) {
                        fetchFacts();
                    }
                    else {
                        setFact(resp.text);
                    }
                })
        }
        fetchFacts();
    }, [])

    return (
        <div className={'today-container'}>
            <div className="today-date">Today is
                <span className="today-subtext"> {today ? today : ""}, {monthDay ? monthDay : ""} {monthName ? monthName : ""} {year ? year : ""}</span>
            </div>
            <div className="today-facts today-subtext">
                <FontAwesomeIcon icon={faSmileWink} className={'FactIcon'}/>Fun fact for you:<br/>
                <div className="fact"> {fact ? fact : ""}</div>
            </div>
        </div>
    )
}

export default Today
