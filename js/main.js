    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    $(window).scroll(function () {
        $("#landing").css("opacity", 1 - $(window).scrollTop() / 100);
    });