import React from 'react'
import { useEffect } from 'react';

function Calendar(props) {
    const date = new Date();
    const month = date.toLocaleString('en', { month: 'long' });
    const year = new Date().getFullYear();
    const firstWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('en', {weekday: 'long'});
    const daysInMonth = new Date(date.getMonth(), date.getFullYear(), 0).getDate();

    function highlightCurrentDay() {
        let aTags = document.getElementsByTagName("a");
        let searchText = date.getDate().toString();
        let found;
        for (let i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent === searchText) {
                found = aTags[i];
                found.classList.add("currentDay");
                break;
            }
        }
    }

    function fillCalendar() {
        let weekdayNumber;
        let element
        if (firstWeekDay === 'Monday') {weekdayNumber=1}
        if (firstWeekDay === 'Tuesday') {weekdayNumber=2}
        if (firstWeekDay === 'Thursday') {weekdayNumber=3}
        if (firstWeekDay === 'Wednesday') {weekdayNumber=4}
        if (firstWeekDay === 'Friday') {weekdayNumber=5}
        if (firstWeekDay === 'Saturday') {weekdayNumber=6}
        if (firstWeekDay === 'Sunday') {weekdayNumber=7}
        let day = 1;
        for (let i = 0; i <= daysInMonth; i++) {
            element = document.getElementById(weekdayNumber);
            element.innerHTML = day.toString();
            day++;
            weekdayNumber++;
        }
    }

    function cleanInactiveDays() {
        let aTags = document.getElementById('calendar-inner').getElementsByTagName("a");
        let found;
        for (let i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent === '') {
                found = aTags[i];
                found.classList.add("inactive-day");
            }
        }
    }

    useEffect(() => {
        fillCalendar();
        highlightCurrentDay();
        cleanInactiveDays();
    }, []);

    return (
        <div className="main-component calendar">
            <div className="block">
                <div className="arrow-btn-container">
                    <h1 className="month-title">{month} {year}</h1>
                </div>
                <table id='calendar-inner' className="calendar-inner">
                    <thead className="days-week">
                    <tr>
                        <th>M</th>
                        <th>T</th>
                        <th>W</th>
                        <th>T</th>
                        <th>F</th>
                        <th>S</th>
                        <th>S</th>
                    </tr>
                    <div className={'separator'}/>
                    </thead>
                    <tbody>
                    <tr>
                        <td><a id={'1'}/></td>
                        <td><a id={'2'}/></td>
                        <td><a id={'3'}/></td>
                        <td><a id={'4'}/></td>
                        <td><a id={'5'}/></td>
                        <td><a id={'6'}/></td>
                        <td><a id={'7'}/></td>
                    </tr>
                    <tr>
                        <td><a id={'8'}/></td>
                        <td><a id={'9'}/></td>
                        <td><a id={'10'}/></td>
                        <td><a id={'11'}/></td>
                        <td><a id={'12'}/></td>
                        <td><a id={'13'}/></td>
                        <td><a id={'14'}/></td>
                    </tr>
                    <tr>
                        <td><a id={'15'}/></td>
                        <td><a id={'16'}/></td>
                        <td><a id={'17'}/></td>
                        <td><a id={'18'}/></td>
                        <td><a id={'19'}/></td>
                        <td><a id={'20'}/></td>
                        <td><a id={'21'}/></td>
                    </tr>
                    <tr>
                        <td><a id={'22'}/></td>
                        <td><a id={'23'}/></td>
                        <td><a id={'24'}/></td>
                        <td><a id={'25'}/></td>
                        <td><a id={'26'}/></td>
                        <td><a id={'27'}/></td>
                        <td><a id={'28'}/></td>
                    </tr>
                    <tr>
                        <td><a id={'29'}/></td>
                        <td><a id={'30'}/></td>
                        <td><a id={'31'}/></td>
                        <td><a id={'32'}/></td>
                        <td><a id={'33'}/></td>
                        <td><a id={'34'}/></td>
                        <td><a id={'35'}/></td>
                    </tr>
                    <tr>
                        <td><a id={'36'}/></td>
                        <td><a id={'37'}/></td>
                        <td><a id={'38'}/></td>
                        <td><a id={'39'}/></td>
                        <td><a id={'40'}/></td>
                        <td><a id={'41'}/></td>
                        <td><a id={'42'}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar
