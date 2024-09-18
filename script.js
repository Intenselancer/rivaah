// sub-navbar
window.addEventListener('scroll', function () {
    const subnav = document.querySelector('.subnav'); // Get the sub-navbar
    const occasionSection = document.querySelector('.occassion'); // Get the occasion section

    const occasionTop = occasionSection.getBoundingClientRect().top; // Top of the occasion section
    const occasionBottom = occasionSection.getBoundingClientRect().bottom; // Bottom of the occasion section

    // Check if the occasion section is in view (scrolling to it)
    if (occasionTop <= 0 && occasionBottom > 0) {
        subnav.classList.add('show-subnav'); // Show sub-navbar
        subnav.classList.add('fixed-subnav'); // Make it fixed
    } else {
        subnav.classList.remove('fixed-subnav'); // Remove fixed when out of section
        subnav.classList.remove('show-subnav'); // Hide sub-navbar when outside the section
    }
});



// Get all video elements and buttons
document.addEventListener('DOMContentLoaded', () => {
    // Get all video elements and buttons
    const videos = document.querySelectorAll('.background-video');
    let currentSlide = 0;

    // Navigation buttons
    const nextSlideButton = document.getElementById('next-slide');
    const prevSlideButton = document.getElementById('prev-slide');

    // Event listeners for next and previous slide
    nextSlideButton.addEventListener('click', () => {
        changeSlide('next');
    });

    prevSlideButton.addEventListener('click', () => {
        changeSlide('prev');
    });

    function changeSlide(direction) {
        // Hide the current video
        videos[currentSlide].classList.remove('active-video');

        // Update the currentSlide index
        if (direction === 'next') {
            currentSlide = (currentSlide + 1) % videos.length;
        } else if (direction === 'prev') {
            currentSlide = (currentSlide - 1 + videos.length) % videos.length;
        }

        // Show the next video
        videos[currentSlide].classList.add('active-video');
    }

    // Auto slide every 5 seconds
    setInterval(() => {
        changeSlide('next');
    }, 5000);
});




// Occassion slider
const contentSliderOcc = document.querySelector('.content-slider-occ'); // Content slider div
const imageSliderOcc = document.querySelector('.image-slider-occ'); // Image slider div

let currentContentPositionOcc = 0;
let currentImagePositionOcc = 0;
let currentOptionOcc = 'Nishayathartham'; // Initial option

// Function to get dynamic slide widths
function getSlideWidthsOcc() {
    let contentSlideWidthOcc = 500;
    let imageSlideWidthOcc = 365;

    if (window.innerWidth < 992) {
        contentSlideWidthOcc = 325;
        imageSlideWidthOcc = 365;
    }

    return { contentSlideWidthOcc, imageSlideWidthOcc };
}

// Mapping options to their respective positions
function getOptionMappingOcc() {
    const { contentSlideWidthOcc } = getSlideWidthsOcc();

    return {
        0: 'Nishayathartham',
        [contentSlideWidthOcc]: 'Gauri-Puja',
        [2 * contentSlideWidthOcc]: 'Muhurtam', // Adjust based on the number of slides
        [3 * contentSlideWidthOcc]: 'Reception', // Adjust based on the number of slides
        [4 * contentSlideWidthOcc]: 'Explore-all-jewellery' // Adjust based on the number of slides
    };
}

// Function to move the sliders using buttons
function moveSliderByButtonOcc(direction) {
    const { contentSlideWidthOcc, imageSlideWidthOcc } = getSlideWidthsOcc();
    const maxContentScrollOcc = contentSliderOcc.scrollWidth - contentSliderOcc.clientWidth;
    const maxImageScrollOcc = imageSliderOcc.scrollWidth - imageSliderOcc.clientWidth;

    if (direction === 'left') {
        currentContentPositionOcc = Math.max(currentContentPositionOcc - contentSlideWidthOcc, 0);
        currentImagePositionOcc = Math.max(currentImagePositionOcc - imageSlideWidthOcc, 0);
    } else if (direction === 'right') {
        currentContentPositionOcc = Math.min(currentContentPositionOcc + contentSlideWidthOcc, maxContentScrollOcc);
        currentImagePositionOcc = Math.min(currentImagePositionOcc + imageSlideWidthOcc, maxImageScrollOcc);
    }

    // Apply the transformations
    contentSliderOcc.style.transform = `translateX(-${currentContentPositionOcc}px)`;
    imageSliderOcc.style.transform = `translateX(-${currentImagePositionOcc}px)`;

    // Update the active option based on the new position
    const optionMappingOcc = getOptionMappingOcc();
    const newOptionOcc = optionMappingOcc[currentContentPositionOcc];
    updateActiveOptionOcc(newOptionOcc);
}

// Left Button Click
document.querySelector('.slide-left-occ').addEventListener('click', () => {
    moveSliderByButtonOcc('left');
});

document.querySelector('.slide-right-occ').addEventListener('click', () => {
    moveSliderByButtonOcc('right');
});

// Option-based slider movement
const optionsOcc = document.querySelectorAll('.subnav-option'); // Option elements

// Function to move sliders based on selected option
function moveSliderByOptionOcc(selectedOption) {
    const { contentSlideWidthOcc, imageSlideWidthOcc } = getSlideWidthsOcc();
    const slideWidthsByOptionOcc = {
        'Nishayathartham': { content: 0, image: 0 },
        'Gauri-Puja': { content: contentSlideWidthOcc, image: imageSlideWidthOcc },
        'Muhurtam': { content: 2 * contentSlideWidthOcc, image: 2 * imageSlideWidthOcc },
        'Reception': { content: 3 * contentSlideWidthOcc, image: 3 * imageSlideWidthOcc },
        'Explore-all-jewellery': { content: 4 * contentSlideWidthOcc, image: 3 * imageSlideWidthOcc },
    };

    const { content: contentOffset, image: imageOffset } = slideWidthsByOptionOcc[selectedOption];

    currentContentPositionOcc = contentOffset;
    currentImagePositionOcc = imageOffset;

    // Apply the transformations
    contentSliderOcc.style.transform = `translateX(-${currentContentPositionOcc}px)`;
    imageSliderOcc.style.transform = `translateX(-${currentImagePositionOcc}px)`;

    // Update the current option
    currentOption = selectedOption;
    updateActiveOptionOcc(selectedOption);
}

// Update the active class based on the selected option
function updateActiveOptionOcc(selectedOption) {
    document.querySelector('.subnav-option.active').classList.remove('active');
    document.querySelector(`[data-option="${selectedOption}"]`).classList.add('active');
}

// Add click event listeners to each option
optionsOcc.forEach(option => {
    option.addEventListener('click', () => {
        const selectedOption = option.getAttribute('data-option');
        if (selectedOption !== currentOption) {
            moveSliderByOptionOcc(selectedOption);
        }
    });
});

// Update slider widths on resize
window.addEventListener('resize', () => {
    // Adjust slider positions based on new dimensions
    moveSliderByButtonOcc('right'); // or left, depending on your current position
});















// Getin Touch Slider 

const contentSlider = document.querySelector('.content-slider'); // Content slider div
const imageSlider = document.querySelector('.image-slider'); // Image slider div

let currentContentPosition = 0;
let currentImagePosition = 0;
let currentOption = 'nearest-store'; // Initial option

// Function to get dynamic slide widths
function getSlideWidths() {
    let contentSlideWidth = 500;
    let imageSlideWidth = 325;

    if (window.innerWidth < 992) {
        contentSlideWidth = 325;
        imageSlideWidth = 325;
    }

    return { contentSlideWidth, imageSlideWidth };
}

// Mapping options to their respective positions
function getOptionMapping() {
    const { contentSlideWidth } = getSlideWidths();

    return {
        0: 'nearest-store',
        [contentSlideWidth]: 'appointment',
        [2 * contentSlideWidth]: 'expert' // Adjust based on the number of slides
    };
}

// Function to move the sliders using buttons
function moveSliderByButton(direction) {
    const { contentSlideWidth, imageSlideWidth } = getSlideWidths();
    const maxContentScroll = contentSlider.scrollWidth - contentSlider.clientWidth;
    const maxImageScroll = imageSlider.scrollWidth - imageSlider.clientWidth;

    if (direction === 'left') {
        currentContentPosition = Math.max(currentContentPosition - contentSlideWidth, 0);
        currentImagePosition = Math.max(currentImagePosition - imageSlideWidth, 0);
    } else if (direction === 'right') {
        currentContentPosition = Math.min(currentContentPosition + contentSlideWidth, maxContentScroll);
        currentImagePosition = Math.min(currentImagePosition + imageSlideWidth, maxImageScroll);
    }

    // Apply the transformations
    contentSlider.style.transform = `translateX(-${currentContentPosition}px)`;
    imageSlider.style.transform = `translateX(-${currentImagePosition}px)`;

    // Update the active option based on the new position
    const optionMapping = getOptionMapping();
    const newOption = optionMapping[currentContentPosition];
    updateActiveOption(newOption);
}

// Left Button Click
document.querySelector('.slide-left').addEventListener('click', () => {
    moveSliderByButton('left');
});

document.querySelector('.slide-right').addEventListener('click', () => {
    moveSliderByButton('right');
});

// Option-based slider movement
const options = document.querySelectorAll('.slider-option'); // Option elements

// Function to move sliders based on selected option
function moveSliderByOption(selectedOption) {
    const { contentSlideWidth, imageSlideWidth } = getSlideWidths();
    const slideWidthsByOption = {
        'nearest-store': { content: 0, image: 0 },
        'appointment': { content: contentSlideWidth, image: imageSlideWidth },
        'expert': { content: 2 * contentSlideWidth, image: 2 * imageSlideWidth }
    };

    const { content: contentOffset, image: imageOffset } = slideWidthsByOption[selectedOption];

    currentContentPosition = contentOffset;
    currentImagePosition = imageOffset;

    // Apply the transformations
    contentSlider.style.transform = `translateX(-${currentContentPosition}px)`;
    imageSlider.style.transform = `translateX(-${currentImagePosition}px)`;

    // Update the current option
    currentOption = selectedOption;
    updateActiveOption(selectedOption);
}

// Update the active class based on the selected option
function updateActiveOption(selectedOption) {
    document.querySelector('.slider-option.active').classList.remove('active');
    document.querySelector(`[data-option="${selectedOption}"]`).classList.add('active');
}

// Add click event listeners to each option
options.forEach(option => {
    option.addEventListener('click', () => {
        const selectedOption = option.getAttribute('data-option');
        if (selectedOption !== currentOption) {
            moveSliderByOption(selectedOption);
        }
    });
});

// Update slider widths on resize
window.addEventListener('resize', () => {
    // Adjust slider positions based on new dimensions
    moveSliderByButton('right'); // or left, depending on your current position
});
