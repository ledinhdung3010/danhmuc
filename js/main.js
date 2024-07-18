$(document).ready(function() {
    var interval = setInterval(function() {
        nextMain('slider1');
        nextMain('slider2');
    }, 3000); // Change 3000 to the interval time in milliseconds (3 seconds)

    function updateSlidesVisible(sliderId) {
        var slidesVisible = 4; // Default number of visible thumbnails
        if ($(window).width() <= 480) {
            slidesVisible = 2; // Assume mobile screen
        }
        return slidesVisible;
    }

    function showSlides(sliderId) {
        var thumbnails = $('#thumbnails-' + sliderId);
        var currentSlide = thumbnails.data('currentSlide') || 0;
        var slidesVisible = updateSlidesVisible(sliderId);
        
        thumbnails.find('.thumbnail').hide();
        thumbnails.find('.thumbnail').slice(currentSlide, currentSlide + slidesVisible).show();
    }

    window.prevMain = function(sliderId) {
        var slider = $('#' + sliderId);
        var totalSlides = slider.find('.thumbnail').length;
        var currentMainIndex = slider.data('currentMainIndex') || 0;

        if (currentMainIndex > 0) {
            currentMainIndex--;
        } else {
            currentMainIndex = totalSlides - 1; // Cycle to the last slide
        }

        var newImgSrc = slider.find('.thumbnail').eq(currentMainIndex).find('img').attr('src');
        slider.find('#mainImg-' + sliderId).attr('src', newImgSrc);
        slider.data('currentMainIndex', currentMainIndex);
        updateThumbnailSelection(sliderId);
    };

    window.nextMain = function(sliderId) {
        var slider = $('#' + sliderId);
        var totalSlides = slider.find('.thumbnail').length;
        var currentMainIndex = slider.data('currentMainIndex') || 0;

        if (currentMainIndex < totalSlides - 1) {
            currentMainIndex++;
        } else {
            currentMainIndex = 0; // Cycle to the first slide
        }

        var newImgSrc = slider.find('.thumbnail').eq(currentMainIndex).find('img').attr('src');
        slider.find('#mainImg-' + sliderId).attr('src', newImgSrc);
        slider.data('currentMainIndex', currentMainIndex);
        updateThumbnailSelection(sliderId);
    };

    window.changeMainImage = function(img, sliderId) {
        var slider = $('#' + sliderId);
        var newImgSrc = img.src;
        slider.find('#mainImg-' + sliderId).attr('src', newImgSrc);
        var currentMainIndex = slider.find('.thumbnail img').index(img);
        slider.data('currentMainIndex', currentMainIndex);
        updateThumbnailSelection(sliderId);
    };

    window.prevThumb = function(sliderId) {
        var thumbnails = $('#thumbnails-' + sliderId);
        var currentSlide = thumbnails.data('currentSlide') || 0;
        var slidesVisible = updateSlidesVisible(sliderId);

        if (currentSlide > 0) {
            currentSlide--;
            thumbnails.data('currentSlide', currentSlide);
            showSlides(sliderId);
        }
    };

    window.nextThumb = function(sliderId) {
        var thumbnails = $('#thumbnails-' + sliderId);
        var currentSlide = thumbnails.data('currentSlide') || 0;
        var slidesVisible = updateSlidesVisible(sliderId);
        var totalSlides = thumbnails.find('.thumbnail').length;

        if (currentSlide < totalSlides - slidesVisible) {
            currentSlide++;
            thumbnails.data('currentSlide', currentSlide);
            showSlides(sliderId);
        }
    };

    function updateThumbnailSelection(sliderId) {
        var slider = $('#' + sliderId);
        var currentMainIndex = slider.data('currentMainIndex') || 0;
        slider.find('.thumbnail').removeClass('selected-img');
        slider.find('.thumbnail').eq(currentMainIndex).addClass('selected-img');
    }

    // Initial call to display thumbnails for each slider
    showSlides('slider1');
    showSlides('slider2');

    // Update the number of visible thumbnails when resizing the window
    $(window).resize(function() {
        showSlides('slider1');
        showSlides('slider2');
    });
});
