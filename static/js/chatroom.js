jQuery(document).ready(function($){
    chatForm = $('#chatroom_form');
    chatField = $('#chatroom_send_text');
    chatWindow = $('#chatroom_chat');
    CHATROOM_AUTHOR = prompt('Bienvenido, ingrese su nick');
    min_poll_date = 0
    chatroom_poll_wait = 100;

    chatroom_poll_wait_inc = function(){
        if (chatroom_poll_wait < 2000){
            chatroom_poll_wait += 100;
        }
    }

    chatroom_poll = function(){
        $.ajax({
            url: CHATROOM_POLL_URL,
            type: 'POST',
            timeout: 10000,
            data: {d:min_poll_date},
            dataType: 'json',
            success: function(data){
                if (data.length > 0){
                    chatroom_render(data);
                    chatroom_poll_wait = 100;
                    min_poll_date = data[data.length-1].d
                }else{
                    chatroom_poll_wait_inc();
                    console.debug(chatroom_poll_wait);
                }
            },
            failure: function(){
                chatroom_poll_wait_inc();
            },
            complete: function(){
                setTimeout('chatroom_poll()',chatroom_poll_wait);
            }
        });
    }

    chatroom_render = function(data){
        var i=0;
        var divContent = $('div',chatWindow);
        // blur previous posts
        $('span',divContent).addClass('old');


        animate = false;
        if (chatWindow.scrollTop == divContent.height()){
            animate = true;
        }
        animate = true // TODO: make it auto-wrap to te bottom if needed

        for (i in data){
            divContent.append('<p><span>'+data[i].a+':</span> '+data[i].txt+'</p>')
        }
        if (animate){
            chatWindow.animate({ scrollTop: divContent.height() }, "slow");
        }

    }

    chatroom_send = function(text){
        $.ajax({
            url: CHATROOM_SEND_URL,
            type: 'POST',
            data: {
                txt: text,
                a: CHATROOM_AUTHOR
            },
            dataType: 'json',
            success: function(data){
            },
            failure: function(err){
            },
            complete: function(){
            }
        })
    }

    chatForm.submit(function(ev){
        ev.preventDefault();
        // get text
        var texto = chatField.val();
        chatField.val('');
        chatroom_send(texto);
        return false;
    });

    chatroom_poll();
});
