// long poll
inited = false;
last_date = 0;
params = {}
jQuery(document).ready(function($){
    console_poll = function(){
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
                setTimeout('console_poll()',1500);
            }
        });
    }

    // render
    render = function(data){
        var div = $('#rsp');
        var div2 = $('div',div);
        for (i in data){
            div2.append('<p>'+data[i].txt+'</p>')
            //div.append('<p>'+data[i].date+': '+data[i].txt+'</p>')
        }
        div.animate({ scrollTop: div2.height() }, "slow");
    }

});

