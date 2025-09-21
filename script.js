document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide-item');
    const infoPanels = document.querySelectorAll('.info-panel');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slidesContainer = document.querySelector('.slides-container');
    const sliderDots = document.querySelector('.slider-dots');

    let currentIndex = 0;

    // Создание точек
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        const slideWidth = slides[0].clientWidth;
        slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

        // Обновление активных классов
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Скрываем все инфо-панели
        infoPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Показываем нужную инфо-панель
        const activeSlideProductId = slides[currentIndex].getAttribute('data-product-id');
        const activePanel = document.querySelector(`.info-panel[data-product-id="${activeSlideProductId}"]`);
        if (activePanel) {
            activePanel.classList.add('active');
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        } else if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        updateSlider();
    }

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Добавляем обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Добавляем обработчик для переключения слайдов с помощью свайпа (опционально)
    let startX = 0;
    slidesContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
    });

    slidesContainer.addEventListener('mouseup', (e) => {
        const endX = e.clientX;
        const diff = startX - endX;
        if (diff > 50) {
            goToSlide(currentIndex + 1);
        } else if (diff < -50) {
            goToSlide(currentIndex - 1);
        }
    });

    // Initial update
    updateSlider();

    // Event listener for window resize to fix slider position
    window.addEventListener('resize', updateSlider);
});