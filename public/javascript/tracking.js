$(document).ready(function(){
    $("form").submit(function(e){
        e.preventDefault();
        var $this = $(this);
        $.post(
            $(this).attr("action"), // Gets the URL to sent the post to
            $(this).serialize(), // Serializes form data in standard format
            function(data) { /** code to handle response **/ },
            "json" // The format the response should be in
            );
    })

    // format dates
    $('.shortdate').each(function(index) {
        console.log(moment(new Date($(this).text())).format('YYYY-MM-DD HH:mm:ss'));
    });

});