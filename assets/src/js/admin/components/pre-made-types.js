(function ($) {
    window.addEventListener('DOMContentLoaded', () => {
        $('.directorist-add-types').on('click', function (event) {
            event.preventDefault();
          
            var url   = $(this).attr('data-url');
            var nonce = $(this).attr('data-nonce');
            console.log(url);
            $.ajax({
                type: 'post',
                url : directorist_admin.ajaxurl,
                data: {
                    action: 'directorist_pre_made_types',
                    _nonce: nonce,
                    url   : url
                },
                success: function success( response ) {
                    console.log(response)
                }
            });
            
        });
    });
})(jQuery);