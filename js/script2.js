'use strict';


window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const parent = document.querySelector('.tabheader__items'),
        tabs = parent.querySelectorAll('.tabheader__item'),
        tabsDesc = document.querySelectorAll('.tabcontent');

    function hideTabs() {
        tabsDesc.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        });
    }

    function showTab(i = 0) {
        tabsDesc[i].classList.add('show', 'fade');
        tabsDesc[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabs();
    showTab();

    parent.addEventListener('click', (event) => {
        const choice = event.target;

        if (choice && choice.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (tab == choice) {
                    hideTabs();
                    showTab(i);
                }
            });
        }
    });

    //timer
    const deadline = '2020-05-22';

    function countDeadline(endTime) {
        const nowDate = new Date(),
            timeAmount = Date.parse(endTime) - Date.parse(nowDate),
            days = Math.floor(timeAmount / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timeAmount / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((timeAmount / (1000 * 60)) % 60),
            seconds = Math.floor((timeAmount / 1000) % 60);
        return {
            'timeAmount': timeAmount,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function putTimeValues(endTime) {
        const timer = document.querySelector('.timer');

        let days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            interval = setInterval(updateClock, 1000);

        updateClock();

        function addZero(element) {

            if (element < 10) {
                return `0${element}`;
            } else {
                return element;
            }

        }

        function updateClock() {
            const miliseconds = countDeadline(endTime);

            days.innerHTML = addZero(miliseconds.days);
            hours.innerHTML = addZero(miliseconds.hours);
            minutes.innerHTML = addZero(miliseconds.minutes);
            seconds.innerHTML = addZero(miliseconds.seconds);

            if (miliseconds.timeAmount <= 0) {
                clearInterval(interval);
            }
        }

    }

    putTimeValues(deadline);

});