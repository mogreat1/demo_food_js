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
    const deadline = '2020-05-31';

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

    // Modal Window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    function closeModal() {
        // modal.style.display = 'none';
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        // modal.style.display = 'block';
        modal.classList.add('show');
        modal.classList.remove('hide');
        //not to allow scroll on the window
        document.body.style.overflow = 'hidden';

        clearInterval(modalTimerId);
    }

    //close clicking in the cross
    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    //close clicking in the Grey area
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    //to close Modal with Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModelByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModelByScroll);
        }
    }

    window.addEventListener('scroll', showModelByScroll);

    //Classes
    class MenuCard {
        constructor(picture, alt, title, description, price, parentSelector, ...classes) {
            this.picture = picture;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
            <img src=${this.picture} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            this.parent.append(element);
        }

    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        18,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        12,
        '.menu .container',
        'menu__item'
    ).render();






});