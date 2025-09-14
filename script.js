document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.slides-container');
    const slideItems = document.querySelectorAll('.slide-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    const totalSlides = slideItems.length;
    let currentIndex = 0;
    const autoSlideInterval = 5000; // 5 секунд для автоматического переключения
    let intervalId;

    // Функция для обновления позиции слайдера
    function updateSliderPosition() {
        slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
        updateDots();
    }

    // Функция для создания точек-индикаторов
    function createDots() {
        sliderDotsContainer.innerHTML = ''; // Очищаем существующие точки
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSliderPosition();
                resetAutoSlide();
            });
            sliderDotsContainer.appendChild(dot);
        }
    }

    // Функция для обновления активной точки
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Обработчик для кнопки "Вперед"
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliderPosition();
        resetAutoSlide();
    });

    // Обработчик для кнопки "Назад"
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
        resetAutoSlide();
    });

    // Функция для запуска автоматического переключения слайдов
    function startAutoSlide() {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        }, autoSlideInterval);
    }

    // Функция для сброса таймера автоматического переключения
    function resetAutoSlide() {
        clearInterval(intervalId);
        startAutoSlide();
    }

    // Инициализация слайдера при загрузке страницы
    createDots();
    updateSliderPosition();
    startAutoSlide(); // Запускаем авто-переключение
});
