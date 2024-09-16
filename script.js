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
