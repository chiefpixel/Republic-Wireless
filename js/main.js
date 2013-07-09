function containsBlanks() {
    var e = required.map(function() {
        return $(this).val() === ""
    });
    return $.inArray(true, e) != -1
}
function requiredFilledIn() {
    containsBlanks() ? calculateInput.attr("disabled", "disabled").addClass("inactiveButton") : calculateInput.removeAttr("disabled").removeClass("inactiveButton")
}
function postToFeed() {
    function n(e) {
        document.getElementById("msg").innerHTML = "Post ID: " + e.post_id
    }
    var e = "I'll save $" + document.getElementById("total_savings").innerHTML + " per year by switching to Republic Wireless",
        t = {
            method: "feed",
            redirect_uri: "http://republicwireless.com",
            link: "http://republicwireless.com/fact/",
            picture: "http://republicwireless.com/fact/img/FBshare.png",
            name: "Republic Wireless",
            caption: "$19/Month Unlimited Data, Talk & Text",
            description: e
        };
    FB.ui(t, n)
}
var isMobile = {
    iPhone: function() {
        return navigator.userAgent.match(/iPhone|iPod/i)
    },
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    others: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows() || isMobile.iPhone()
    }
};
if (!isMobile.others()) {
    $(window).load(function() {
        $("#loader_img").animate({
            opacity: "1",
            top: "300"
        }, 1e3, "easeOutSine");
        setTimeout(function() {
            $("#loader_img").animate({
                opacity: "0",
                top: "100"
            }, 600, "easeOutSine");
            setTimeout(function() {
                $("#loader").fadeOut(1500)
            }, 500)
        }, 500)
    })
} else {
    $(window).load(function() {
        $("#loader_img").animate({
            opacity: "1",
            top: "180"
        }, 1e3, "easeOutSine");
        setTimeout(function() {
            $("#loader_img").animate({
                opacity: "0",
                top: "50"
            }, 600, "easeOutSine");
            setTimeout(function() {
                $("#loader").fadeOut(1500)
            }, 500)
        }, 500)
    })
}
$("#money_bag_1, #money_bag_2, #money_bag_3, #money_bag_4, #money_bag_5, #monthly_response_large, #monthly_response_small, #final_savings, #less_than_zero_savings, #total_yearly_cost, #rw_yearly_cost").addClass("transparent");
$("span.dollar_sign").hide();
$(function() {
    $("input, textarea").placeholder()
});
$.fn.digits = function() {
    return this.each(function() {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
    })
};
var calculate = function() {
        var e = $("#current_monthly_cost").val(),
            t = 12,
            n = $("#current_phone_cost").val(),
            r = $("#number_of_lines").val(),
            i = e * t * r + Number(n) * r,
            s = 427 * Number(r),
            o = i - s;
        $("#current_yearly_cost").text(i).digits();
        $("#total_savings").text(o).digits();
        $(".republic_cost").text(s).digits();
        $(".lines").text(r).digits()
    };
$("#current_monthly_cost").keyup(function() {
    $("span.dollar_sign.one").fadeIn();
    if ($("#current_monthly_cost").val() < 75 && $("#current_monthly_cost").val() > 0) {
        $("#monthly_response_small").removeClass("transparent").addClass("opaque");
        $("#monthly_response_large").removeClass("opaque").addClass("transparent");
        $("#prompt").hide();
    }
    if ($("#current_monthly_cost").val() > 75) {
        $("#monthly_response_small").addClass("transparent").removeClass("opaque");
        $("#monthly_response_large").removeClass("transparent").addClass("opaque");
        $("#prompt").hide();
    }
    calculate()
});
$("#current_phone_cost").keyup(function() {
    $("span.dollar_sign.two").fadeIn();
    $("#monthly_response_small").removeClass("transparent").addClass("opaque");
    $("#monthly_response_large").removeClass("opaque").addClass("transparent");
    $("#prompt").hide();
    calculate()
});
$("#number_of_lines").keyup(function() {
    $("#monthly_response_small").removeClass("transparent").addClass("opaque");
    $("#monthly_response_large").removeClass("opaque").addClass("transparent");
    $("#prompt").hide();
    calculate()
});
$("#calculate").click(function() {
    $("#monthly_response_small, #monthly_response_large").hide();
    if ($("#total_savings").text() <= 0) $("#final_savings").toggleClass("transparent");
    else if ($("#total_savings").text() < 100 && $("#total_savings").text() > 0) {
        $("#money_bag_1").removeClass("transparent").animate({
            top: "0px"
        }, 500, "easeOutBounce");
        setTimeout(function() {
            $(".money_bag").animate({
                opacity: "0"
            }, 1200, "easeInOutCirc")
        }, 2500);
        setTimeout(function() {
            $("#final_savings").toggleClass("transparent")
        }, 3e3);
        $(".post_to_feed").removeClass("transparent").addClass("opaque")
    } else if ($("#total_savings").text() > 100 && $("#total_savings").text() < 1e3) {
        $("#money_bag_3").toggleClass("transparent").animate({
            top: "0px"
        }, 500, "easeOutBounce");
        setTimeout(function() {
            $("#money_bag_2").toggleClass("transparent").animate({
                top: "0px"
            }, 500, "easeOutBounce")
        }, 300);
        setTimeout(function() {
            $("#money_bag_4").toggleClass("transparent").animate({
                top: "0px"
            }, 500, "easeOutBounce")
        }, 600);
        setTimeout(function() {
            $(".money_bag").animate({
                opacity: "0"
            }, 1200, "easeInOutCirc")
        }, 1900);
        setTimeout(function() {
            $("#final_savings").removeClass("transparent")
        }, 2400);
        $(".post_to_feed").removeClass("transparent").addClass("opaque")
    } else {
        $("#money_bag_3").toggleClass("transparent").animate({
            top: "0px"
        }, 500, "easeOutBounce");
        setTimeout(function() {
            $("#money_bag_2").toggleClass("transparent").animate({
                top: "0px"
            }, 500, "easeOutBounce")
        }, 300);
        setTimeout(function() {
            $("#money_bag_1").toggleClass("transparent").animate({
                top: "0px"
            }, 500, "easeOutBounce")
        }, 600);
        setTimeout(function() {
            $("#money_bag_5").toggleClass("transparent").animate({
                top: "0px"
            }, 500, "easeOutBounce")
        }, 900);
        setTimeout(function() {
            $("#money_bag_4").toggleClass("transparent").animate({
                top: "0px"
            }, 500, "easeOutBounce")
        }, 1200);
        setTimeout(function() {
            $(".money_bag").animate({
                opacity: "0"
            }, 1200, "easeInOutCirc")
        }, 2500);
        setTimeout(function() {
            $("#final_savings").removeClass("transparent")
        }, 3e3);
        $(".post_to_feed").removeClass("transparent").addClass("opaque")
    }
    $("#current_monthly_cost, #current_phone_cost, #number_of_lines").val("");
    $(".dollar_sign").hide();
    return !1
});
var calculateInput = $("#calculate input"),
    required = $(".required");
$("span.hint_text").hide();
$("input, textarea").focus(function() {
    $(this).next().fadeIn("slow")
}).blur(function() {
    $(this).next().fadeOut("slow")
}).keyup(function() {
    requiredFilledIn()
});
$("input, textarea").keypress(function(e) {
    if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) return !1
});
requiredFilledIn();
FB.init({
    appId: "537633382960932",
    status: !0,
    cookie: !0
});
$(".post_to_feed").click(function() {
    postToFeed();
    return !1
});
if (!isMobile.others()) {
    $(window).load(function() {
        $("#eyes").jEye()
    });
    $(".nav a, a.back_to_top").click(function() {
        var e = $(this).attr("href");
        $("body").scrollTo($(e), 1e3, {
            axis: "y"
        });
        return !1
    });
    var header = $(".header"),
        nav = $(".nav"),
        buyButton = $(".shrink"),
        eagleLogo = $(".eagle_logo"),
        hbudPhone = $(".hbud_phone"),
        buyText = $(".buy_text"),
        windowHeight = $(window).height(),
        eagleDrop = function() {
            setTimeout(function() {
                eagleLogo.stop().animate({
                    top: "-10"
                }, 1e3, "easeOutBounce")
            }, 1200)
        };
    $(window).load(function() {
        eagleDrop()
    });
    var fixBuy = function() {
            if ($(window).scrollTop() > buyButton.data("top")) {
                buyButton.css("top", windowHeight - 210).removeClass("buy_button_static_expand").addClass("buy_button_fixed_contract");
                eagleLogo.stop().animate({
                    top: "-300px"
                }, 400);
                hbudPhone.removeClass("hbud_phone_hide").addClass("hbud_phone_show");
                buyText.addClass("hide_buy_text")
            } else {
                buyButton.css({
                    top: "300px"
                }).removeClass("buy_button_fixed_contract").addClass("buy_button_static_expand");
                eagleLogo.stop().animate({
                    top: "-10"
                }, 1e3, "easeOutBounce");
                hbudPhone.removeClass("hbud_phone_show").addClass("hbud_phone_hide");
                buyText.removeClass("hide_buy_text")
            }
        },
        beginningScrollTop = 0;
    $(window).scroll(function() {
        var e = $(this).scrollTop();
        if (e > beginningScrollTop) {
            header.stop().animate({
                top: "-" + e
            });
            nav.stop().animate({
                top: "80" - e
            })
        } else {
            header.stop().animate({
                top: "0px"
            });
            nav.stop().animate({
                top: "80px"
            })
        }
        beginningScrollTop = e
    });
    buyButton.data("top", buyButton.offset().top);
    $(window).scroll(function() {
        fixBuy()
    });
    buyButton.mouseover(function() {
        if ($(window).scrollTop() > buyButton.data("top")) {
            $(this).addClass("buy_button_fixed_expanded");
            buyText.removeClass("hide_buy_text")
        }
    });
    buyButton.mouseout(function() {
        if ($(window).scrollTop() > buyButton.data("top")) {
            $(this).removeClass("buy_button_fixed_expanded");
            buyText.addClass("hide_buy_text")
        }
    });
    var swing = function() {
            if (hover === !0) {
                eagleLogo.removeClass("center").addClass("left").toggleClass("right");
                setTimeout(swing, 1e3)
            }
        };
    eagleLogo.mouseover(function() {
        hover = !0;
        swing();
        var e = $("#eagle_screech-" + Math.ceil(Math.random() * 4))[0];
        e.play()
    });
    eagleLogo.mouseout(function() {
        eagleLogo.addClass("center");
        hover = !1
    });
    var slide = "li",
        firstSlides = function() {
            function n() {
                return e.find(slide)
            }
            var e = $("#slider_one"),
                t = 6e3;
            n().first().removeClass("firstwaiting").addClass("firstactive");
            interval = setInterval(function() {
                var t = e.find(slide + ".firstactive").index();
                n().eq(t).removeClass("firstactive").addClass("firstwaiting");
                n().length == t + 1 && (t = -1);
                n().eq(t + 1).removeClass("firstwaiting").addClass("firstactive")
            }, t)
        },
        secondSlides = function() {
            function n() {
                return e.find(slide)
            }
            var e = $("#slider_two"),
                t = 4e3;
            n().first().removeClass("secondwaiting").addClass("secondactive");
            interval = setInterval(function() {
                var t = e.find(slide + ".secondactive").index();
                n().eq(t).removeClass("secondactive").addClass("secondwaiting");
                n().length == t + 1 && (t = -1);
                n().eq(t + 1).removeClass("secondwaiting").addClass("secondactive")
            }, t)
        },
        thirdSlides = function() {
            function n() {
                return e.find(slide)
            }
            var e = $("#slider_three"),
                t = 7500;
            n().first().removeClass("firstwaiting").addClass("firstactive");
            interval = setInterval(function() {
                var t = e.find(slide + ".firstactive").index();
                n().eq(t).removeClass("firstactive").addClass("firstwaiting");
                n().length == t + 1 && (t = -1);
                n().eq(t + 1).removeClass("firstwaiting").addClass("firstactive")
            }, t)
        },
        fourthSlides = function() {
            function n() {
                return e.find(slide)
            }
            var e = $("#slider_four"),
                t = 5500;
            n().first().removeClass("secondwaiting").addClass("secondactive");
            interval = setInterval(function() {
                var t = e.find(slide + ".secondactive").index();
                n().eq(t).removeClass("secondactive").addClass("secondwaiting");
                n().length == t + 1 && (t = -1);
                n().eq(t + 1).removeClass("secondwaiting").addClass("secondactive")
            }, t)
        };
    firstSlides();
    secondSlides();
    thirdSlides();
    fourthSlides();
    var distanceFromVeryTop = 150,
        sectionOneDistance = $("#scroll-sect1").offset().top - distanceFromVeryTop,
        sectionTwoDistance = $("#scroll-sect2").offset().top - distanceFromVeryTop,
        sectionThreeDistance = $("#scroll-sect3").offset().top - distanceFromVeryTop,
        sectionThreeADistance = $("#scroll-sect3").offset().top + 500,
        sectionFourDistance = $("#scroll-sect4").offset().top - distanceFromVeryTop,
        sectionFiveDistance = $("#scroll-sect5").offset().top - distanceFromVeryTop,
        sectionSixDistance = $("#scroll-sect6").offset().top - distanceFromVeryTop;
    sectionOneScroll = !1;
    sectionTwoScroll = !1;
    sectionThreeScroll = !1;
    sectionThreeAScroll = !1;
    sectionFourScroll = !1;
    sectionFiveScroll = !1;
    sectionSixScroll = !1;
    $(window).scroll(function() {
        if ($(window).scrollTop() > sectionOneDistance && sectionOneScroll === !1) {
            $("#header_intro").animate({
                opacity: "1",
                width: "100%",
                height: "100%"
            }, 800, "easeOutBounce");
            sectionOneScroll = !0
        }
        if ($(window).scrollTop() > sectionTwoDistance && sectionTwoScroll === !1) {
            $("#header_savings").animate({
                opacity: "1",
                width: "100%",
                height: "100%"
            }, 1e3, "easeInOutBack");
            sectionTwoScroll = !0
        }
        if ($(window).scrollTop() > sectionThreeDistance && sectionThreeScroll === !1) {
            $("#header_no-catch").animate({
                opacity: "1",
                width: "100%",
                height: "100%"
            }, 800, "easeOutBounce");
            sectionThreeScroll = !0
        }
        if ($(window).scrollTop() > sectionThreeADistance && sectionThreeAScroll === !1) {
            $("#eaglephone").animate({
                width: "100%",
                height: "100%",
                margin: "0"
            }, 2500, "easeOutElastic");
            sectionThreeAScroll = !0
        }
        if ($(window).scrollTop() > sectionFourDistance && sectionFourScroll === !1) {
            $("#header_customer-reviews").animate({
                opacity: "1",
                width: "100%",
                height: "100%"
            }, 1e3, "easeInOutBack");
            sectionFourScroll = !0
        }
        if ($(window).scrollTop() > sectionFiveDistance && sectionFiveScroll === !1) {
            $(".how").animate({
                opacity: "1",
                width: "100%",
                height: "100%"
            }, 1e3, "easeInOutBack");
            setTimeout(function() {
                $(".in_the_heck").animate({
                    opacity: "1"
                }, 500)
            }, 200);
            setTimeout(function() {
                $(".who").animate({
                    opacity: "1",
                    width: "100%",
                    height: "100%"
                }, 1e3, "easeInOutBack")
            }, 400);
            setTimeout(function() {
                $(".in_tarnation").animate({
                    opacity: "1"
                }, 500)
            }, 600);
            sectionFiveScroll = !0
        }
        if ($(window).scrollTop() > sectionSixDistance && sectionSixScroll === !1) {
            $("#header_conclusion").animate({
                opacity: "1",
                width: "100%",
                height: "100%"
            }, 1e3, "easeOutBounce");
            sectionSixScroll = !0
        }
    });
    var animate_arrow_three = function() {
            var e = $("#savings_arrow");
            e.animate({
                width: "156px",
                marginLeft: "10px"
            }, 500, "easeInOutQuad");
            e.animate({
                width: "140px",
                marginLeft: "0px"
            }, 500, "easeInOutQuad", function() {
                animate_arrow_three()
            })
        };
    animate_arrow_three();
    var pointer = $(".pointer");
    lpop = $(".lpop");
    pointer.hide();
    lpop.mouseover(function() {
        $(this).next().fadeIn("slow")
    });
    lpop.mouseout(function() {
        $(this).next().fadeOut("slow")
    });
    $(".popit").popupWindow({
        height: 400,
        width: 600,
        centerScreen: 1
    })
};