jQuery(document).ready(function(t) {
  function e() {
    i || (i = !0, window.requestAnimationFrame ? window.requestAnimationFrame(n) : setTimeout(n, 300))
  }

  function n() {
    var e = t(window).height() / 2,
      n = t(window).scrollTop();
    a.each(function() {
      var o = t(this),
        i = o.attr("id"),
        a = r.filter('[href^="#' + i + '"]');
      o.offset().top - e < n && o.offset().top + o.height() - e > n ? a.addClass("active") : a.removeClass("active")
    }), i = !1
  }

  function o(e) {
    t("body,html").animate({
      scrollTop: e.offset().top
    }, 300)
  }
  var i = !1,
    a = t(".cd-section"),
    c = t(".cd-vertical-nav"),
    r = c.find("a"),
    s = t(".cd-nav-trigger"),
    l = t(".cd-scroll-down");
  t(window).on("scroll", e), c.on("click", "a", function(e) {
    e.preventDefault(), o(t(this.hash)), c.removeClass("open")
  }), l.on("click", function(e) {
    e.preventDefault(), o(t(this.hash))
  }), s.on("click", function(t) {
    t.preventDefault(), c.toggleClass("open")
  })
});
