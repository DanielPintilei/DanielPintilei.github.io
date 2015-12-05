$(window).scroll(function () {
    $("#landing").css("opacity", 1 - $(window).scrollTop() / 100);
});