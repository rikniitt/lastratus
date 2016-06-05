$(document).ready(function() {

    // Set selected ip in containers-new view
    if ($('#ctid')) {
        var ctid = $('#ctid').val();
        var ip = '192.168.0.' + ctid;
        $('#ip').val(ip);
    }


    $('.ssh').on('click', function() {
        $('.ssh-input').hide();
        var $inputDd = $(this).parent('dl').find('.ssh-input');
        $inputDd.show();
        if ($inputDd.is(':visible')) {
            $inputDd.find('input').select();
        }
    });
    $('.clipboard').on('click', function() {
        var cmd = $(this).parent('dd').find('input').val();
        window.prompt('Copy to clipboard: Ctrl+C, Enter', cmd);
        $('.ssh-input').hide();
    })

});