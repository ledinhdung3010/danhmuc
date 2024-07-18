$(document).ready(function() {
    function updateSlidesVisible(sliderId) {
        var slidesVisible = 4; // Số lượng ảnh nhỏ hiển thị mặc định
        if ($(window).width() <= 480) {
            slidesVisible = 2; // Giả sử màn hình Android
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
            var newImgSrc = slider.find('.thumbnail').eq(currentMainIndex).find('img').attr('src');
            slider.find('#mainImg-' + sliderId).attr('src', newImgSrc);
            slider.data('currentMainIndex', currentMainIndex);
            updateThumbnailSelection(sliderId);
        }
    };

    window.nextMain = function(sliderId) {
        var slider = $('#' + sliderId);
        var totalSlides = slider.find('.thumbnail').length;
        var currentMainIndex = slider.data('currentMainIndex') || 0;

        if (currentMainIndex < totalSlides - 1) {
            currentMainIndex++;
            var newImgSrc = slider.find('.thumbnail').eq(currentMainIndex).find('img').attr('src');
            slider.find('#mainImg-' + sliderId).attr('src', newImgSrc);
            slider.data('currentMainIndex', currentMainIndex);
            updateThumbnailSelection(sliderId);
        }
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

    // Gọi lần đầu để hiển thị các ảnh nhỏ cho từng slider
    showSlides('slider1');
    showSlides('slider2');

    // Cập nhật lại số lượng ảnh nhỏ khi thay đổi kích thước cửa sổ
    $(window).resize(function() {
        showSlides('slider1');
        showSlides('slider2');
    });
});
