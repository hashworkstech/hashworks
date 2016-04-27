jQuery(function($)  
{   
    var value;
    // var handleFileSelect = function(evt) {
    //     var files = evt.target.files;
    //     var file = files[0];
    //     if (files && file) {
    //         var reader = new FileReader();

    //         reader.onload = function(readerEvt) {
    //             var binaryString = readerEvt.target.result;
    //             value = btoa(binaryString);
    //         };

    //         reader.readAsBinaryString(file);
    //     }
    // };

    $('.file-upload-div').on('change', function(){
        var fileName = document.getElementById("file-upload").value;
        $('.file-back').val(fileName);
    });

    $("#scontact_form").submit(function()
    {   
        var email = $("#semail").val(); // get email field value
        var name = $("#sname").val(); // get name field value
        var msg = $("#smsg").val(); // get message field value
        var phone = $("#snumber").val();
        if(phone == '') {
            phone = 'NA';
        }
        if(name == '' || email == '' || msg == '' || value == null) {
            return false;
        }
        $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'fVUdEk-EJMBKTLq0gx5PRw',
                'message': {
                    'from_email': email,
                    'from_name': name,
                    'headers': {
                        'Reply-To': email
                    },
                    'subject': 'Job Application',
                    "html":"A new job application has been submitted through contact form on your website, here are the details." + "<p>Name: "+name+"</p>" + "<p>Contact: " +phone+"</p>"+ "<p>Email: " +email+"</p>"+ "<p>Message: " +msg+"</p>" ,
                    'text': msg,
                    "attachments": [
                    {
                        "type": "text/plain",
                        "name": "Resume.doc",
                        "content": value
                    }],
                    'to': [
                    {
                        'email': 'founders@hashworks.co',
                        'name': 'Hashworks',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            alert('Your message has been sent. Thank you!'); // show success message
            $("#sname").val(''); // reset field after successful submission
            $("#semail").val(''); // reset field after successful submission
            $("#smsg").val(''); // reset field after successful submission
        })
        .fail(function(response) {
            alert('Error sending message.');
        });
        return false; // prevent page refresh
    });
});



//form script for join us
$(function(){
    var value;
    var handleFileSelect = function(evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                value = btoa(binaryString);
            };

            reader.readAsBinaryString(file);
        }
    };
    $('.join-form-submit-btn').click(function(){
        $('.form-control').removeClass('is-empty').removeClass('is-invalid');
        var name = $('#sname').val();
        var number = $('#snumber').val();
        var file = value;
        var email = $('#semail').val();
        var message = $('#smsg').val();
        if(name==null || name==''){
            $('#sname').addClass('is-empty');
        }if(number==null || number==''){
            $('#snumber').addClass('is-empty');
        }if(file==null || file==''){
            $('.file-back').addClass('is-empty');
        }if(email==null || email==''){
            $('#semail').addClass('is-empty');
        }if(message==null || message==''){
            $('#smsg').addClass('is-empty');
        }if(email!=null && email!='' && !validateEmail(email)){
            $('#email').addClass('is-invalid');
        }
    });

     $('.join-form-reset-btn').click(function() {
        resetForm();
     });

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function resetForm() {
        $('.form-control').removeClass('is-empty').removeClass('is-invalid');
        $('.form-control').val('').text('');
    }
});
//form script for join us end
