$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

// long poll
inited = false;
last_date = 0;
params = {}
poll = function(){
    if (inited){
        params = {i:0, d:last_date}
    }else{
        params = {i:1, d:0}
    }
    $.ajax({
        type: 'POST',
        url: '/teaching/teaching/',
        timeout: 10000,
        data: params,
        success: function(data){
            console.debug(data.length);
            if (data.length >= 1){ 
                inited = true;
                last_date = data[data.length-1].date;
                render(data);
            }
        },
        complete: function(){
            poll();
        }
    });
}

// render
render = function(data){
    var div = $('#rsp');
    for (i in data){
        div.append('<p> &gt;&gt;&gt; '+data[i].txt+'</p>')
        //div.append('<p>'+data[i].date+': '+data[i].txt+'</p>')
    }
}


$(document).ready(function($){
    poll();
})

