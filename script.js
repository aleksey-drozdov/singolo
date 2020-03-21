
//работа функций только после полной загрузки странцы. 
window.addEventListener('load', () => {

    //анимация меню
    let menu = document.querySelector('nav ul');  //получем меню
    menu.addEventListener('click', (e) => {
        for (let i = 0; i < menu.childElementCount; i++) {  //убираем активную кнопку
            menu.children[i].children[0].classList.remove('active-link');
        }
        e.target.classList.add('active-link'); //делаем активной кнопку, на которую нажали
    })

    //плавынй скролл по ссылкам 
    let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
        V = 0.6;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    for (let i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
            e.preventDefault(); //отменяем стандартное поведение
            let w = window.pageYOffset,  // производим прокрутка прокрутка
                hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
            t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null;
            requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
                window.scrollTo(0, r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash  // URL с хэшем
                }
            }
        }, false);
    }

    // смена активных кнопок при скролле 
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 2465) {
            for (let i = 0; i < menu.childElementCount; i++) {  //убираем активную кнопку
                menu.children[i].children[0].classList.remove('active-link');
            }
            menu.children[4].children[0].classList.add('active-link');
        }
        if (window.pageYOffset < 2465 && window.pageYOffset > 1701) {
            for (let i = 0; i < menu.childElementCount; i++) {  //убираем активную кнопку
                menu.children[i].children[0].classList.remove('active-link');
            }
            menu.children[3].children[0].classList.add('active-link');
        }
        if (window.pageYOffset < 1701 && window.pageYOffset > 765) {
            for (let i = 0; i < menu.childElementCount; i++) {  //убираем активную кнопку
                menu.children[i].children[0].classList.remove('active-link');
            }
            menu.children[2].children[0].classList.add('active-link');
        }
        if (window.pageYOffset < 765 && window.pageYOffset > 100) {
            for (let i = 0; i < menu.childElementCount; i++) {  //убираем активную кнопку
                menu.children[i].children[0].classList.remove('active-link');
            }
            menu.children[1].children[0].classList.add('active-link');
        }
        if (window.pageYOffset < 100) {
            for (let i = 0; i < menu.childElementCount; i++) {  //убираем активную кнопку
                menu.children[i].children[0].classList.remove('active-link');
            }
            menu.children[0].children[0].classList.add('active-link');
        }
    })




    //портфолио

    //анимация кнопок
    let portfolioFilter = document.querySelector('.portfolio-filter');
    let portfolioStockItems = Array.from(document.querySelectorAll('.stock-item'));

    portfolioFilter.addEventListener('click', (e) => {
        if (e.target.tagName !== 'P') { //костыль для убирания active класса со списка фильтра
            return
        }
        for (let i = 0; i < portfolioFilter.childElementCount; i++) {
            portfolioFilter.children[i].children[0].classList.remove('active-filter');
        }
        e.target.classList.add('active-filter');
        shuffleImg();

    })
    //расставляем картинки в случайном порядке, не меняя структуры разметки
    function shuffleImg() {
        for (let i = 0; i < portfolioStockItems.length; i++) {
            portfolioStockItems[i].remove()
        }
        var shuffleItems = portfolioStockItems.sort(function () {
            return Math.random() - 0.5;
        });
        for (let i = 0; i < portfolioStockItems.length; i++) {
            document.querySelector('.portfolio-stock').append(shuffleItems[i])
        }
    }

    //рамка на картинках портфолио
    let portfolioStock = document.querySelector('.portfolio-stock');
    portfolioStock.addEventListener('click', (e) => {
        if (e.target.tagName !== 'IMG') {
            return
        }
        for (let i = 0; i < portfolioStock.childElementCount; i++) {  //убираем активную кнопку
            portfolioStock.children[i].children[0].classList.remove('stock-item-active');
        }
        e.target.classList.add('stock-item-active'); //делаем активной кнопку, на которую нажали
    })


    //слайдер
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isEnabled = true;



    function hideSlide(direction) {
        isEnabled = false;
        slides[currentSlide].classList.add(direction);
        slides[currentSlide].addEventListener('animationend', function () {
            this.classList.remove('active-slide', direction);
        })
    }

    function showSlide(direction) {
        slides[currentSlide].classList.add('next-slide', direction);
        document.querySelector('.slider').style.backgroundColor = document.querySelector('.next-slide').dataset.bgcolor
        slides[currentSlide].addEventListener('animationend', function () {
            this.classList.remove('next-slide', direction);
            this.classList.add('active-slide');
            isEnabled = true;
        })
    }


    function changeCurrentSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
    }

    function previousSlide(n) {
        hideSlide('to-right');
        changeCurrentSlide(n - 1);
        showSlide('from-left');
    }

    function nextSlide(n) {
        hideSlide('to-left');
        changeCurrentSlide(n + 1);
        showSlide('from-right');
    }

    document.querySelector(".arrowBack").addEventListener('click', function () {
        if (isEnabled) {
            previousSlide(currentSlide);
        }
    })

    document.querySelector(".arrowNext").addEventListener('click', function () {
        if (isEnabled) {
            nextSlide(currentSlide);
        }
    })

    //экран телефона
    let phones = document.querySelectorAll('.phone');
    for (let i = 0; i < phones.length; i++) {
        phones[i].addEventListener('click', function () {
            phones[i].classList.toggle('phone-screen-off');
        })

    }




    //обработка формы
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        //получаем значения инпутов
        var subject = document.querySelector('[name=subject]').value.length == 0 ? document.querySelector('[name=subject]').dataset.subject : "Тема: " + document.querySelector('[name=subject]').value;
        var description = document.querySelector('[name=detail]').value.length == 0 ? document.querySelector('[name=detail]').dataset.description : "Описание: " + document.querySelector('[name=detail]').value;

        document.querySelector('.form-send-subject').innerHTML = subject;
        document.querySelector('.form-send-description').innerHTML = description;
        document.querySelector('.form-send').style.display = 'flex';
    })
    //закрытие диалогового окна и очистка инпутов
    document.querySelector('.form-send-close').addEventListener('click', function () {
        var inputs = document.querySelectorAll('[data-input]');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        document.querySelector('.form-send').style.display = 'none';
        console.log(inputs)
    })








})