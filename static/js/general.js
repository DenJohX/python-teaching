jQuery(document).ready(function($){
    function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "El campo " + n + " debe contener entre " +
					min + " y " + max + " caracteres." );
				return false;
			} else {
				return true;
			}
		}

    function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}

    function updateTips( t ) {
			tips
				.text( t )
				.addClass( "ui-state-highlight" );
			setTimeout(function() {
				tips.removeClass( "ui-state-highlight", 1500 );
			}, 500 );
		}


        var name = $( "#name" );
        var form_name = $( '#username_input' );
        form_name.submit(function(evt){
            evt.preventDefault();
            return false;
        });

        tips = $( ".validateTips" );

        $( "#dialog-form" ).dialog({
			autoOpen: true,
			height: 300,
			width: 380,
			modal: true,
            closeOnEscape: false,

			buttons: {
				"Ingresar al curso": function() {
					var bValid = true;
					name.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( name, "username", 3, 16 );
					bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "El nick solo puede consistir de letras entre a-z y numeros 0-9, guiones bajos, y debe comenzar con una letra." );

					if ( bValid ) {
                        // CATCH NAME
                        CHATROOM_AUTHOR = name.val();
                        chatroom_poll();
                        console_poll();
						$( this ).dialog( "close" );

					}
				},
			},
			close: function() {
				name.val( "" ).removeClass( "ui-state-error" );
			}
		});
});
