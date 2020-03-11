/*
 |-------------------------------
 | tweetanaliz theme v1.0
 |-------------------------------
 | (c) 2018 - Alper Mutlu TOKSÖZ
 | Github: https://github.com/wutlu
 |-------------------------------
 */

$(function() {
	console.log('core 2.0.1 ready')

    $('.lazy').each(function() {
        $(this).lazy()
    })
})

/* --- focus function --- */

var focusDelay;

$(document).on('click', '[data-focus]', function() {
	var __ = $(this);

	var target = __.data('focus'),
		target = element(target);

	window.clearTimeout(focusDelay)

	focusDelay = window.setTimeout(function() {
		target.focus()
	}, __.data('focus-delay'))

	return false;
})

/* --- class function --- */

var classDelay;

$(document).on('click', '[data-class]', function() {
    var __ = $(this);

    var target = __.data('class'),
        target = element(target);

    window.clearTimeout(classDelay)

    classDelay = window.setTimeout(function() {
        if (__.data('remove-class'))
        {
            target.removeClass(__.data('remove-class'))
        }

        if (__.data('add-class'))
        {
            target.addClass(__.data('add-class'))
        }

        if (__.data('toggle-class'))
        {
            target.toggleClass(__.data('toggle-class'))
        }
    }, __.data('class-delay'))

    return false;
})

/* --- selector function --- */

function element(m) {
    var sp = m.split('->'),
        elem,
        selector = '';

    $.each(sp, function(key, val) {
        if (elem)
        {
            var brackets = val.split(/[(\)]/);

            selector = selector + "." + brackets[0] + "('" + brackets[1] + "')";
        }
        else
        {
            elem = "$('" + val + "')";
        }
    })

    return eval(elem + selector);
}

/* --- cookies --- */

function setCookie(cookie_name, cookie_value, days) {
    var d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));

    var expires = 'expires=' + d.toUTCString();

    document.cookie = cookie_name + '=' + cookie_value + ';' + expires + ';path=/';
}

function getCookie(cookie_name) {
    var name = cookie_name + '=';
    var decoded_cookie = decodeURIComponent(document.cookie);
    var ca = decoded_cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }

    return '';
}

$(document).ready(function() {
    if (!getCookie('cookie-alert'))
    {
        $('.cookie-alert').addClass('active')
    }
})

$('.cookie-alert').on('click', '.close', function() {
    $(this).closest('.cookie-alert').hide()

    setCookie('cookie-alert', true, 7)

    return false;
})

/* --- slider function --- */

function sliderNav(slider)
{
    var nav = slider.find('.slider-nav');
    var list = slider.find('.slider-list');
    var active_item = list.find('.active');

    nav.children('a').addClass('active')

    if (active_item.data('src'))
    {
        active_item.css('background-image', 'url(' + active_item.data('src') + ')')
    }

    if (active_item.is(':last-child'))
    {
        nav.children('a[data-action=next]').removeClass('active')
    }

    if (active_item.is(':first-child'))
    {
        nav.children('a[data-action=prev]').removeClass('active')
    }
}

$('.slider').each(function() {
    sliderNav($(this))
}).on('click', '.slider-nav > a', function() {
    var __ = $(this);
    var slider = __.closest('.slider');
    var active_item = __.closest('.slider').find('.slider-list').children('.active');
    var prev_item = active_item.prev('.slider-item');
    var next_item = active_item.next('.slider-item');

    if (__.data('action') == 'prev' && prev_item.length)
    {
        active_item.fadeOut(200, function() {
            active_item.removeClass('active')

            prev_item.fadeIn(200, function() {
                prev_item.addClass('active')

                sliderNav(slider)
            })
        })
    }
    else if (__.data('action') == 'next' && next_item.length)
    {
        active_item.fadeOut(200, function() {
            active_item.removeClass('active')

            next_item.fadeIn(200, function() {
                next_item.addClass('active')

                sliderNav(slider)
            })
        })
    }

    return false;
})
