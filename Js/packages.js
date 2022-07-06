function toggleNavBar() {
    let container = $(".navbar");
    if ($(window).height() <= 530 || $(window).width() <= 575) {
        container.addClass("sticky-top");
        container.removeClass("fixed-top");
        
    }
    $(window).resize(() => {
        if ($(window).height() <= 530 || $(window).width() <= 575) {
            container.addClass("sticky-top");
            container.removeClass("fixed-top");
        } else {
            container.addClass("fixed-top");
            container.removeClass("sticky-top");
        }
    });
}

