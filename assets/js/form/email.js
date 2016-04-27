jQuery(function($)  
{   
    $("#contact_form").submit(function()
    {
        var email = $("#email").val(); // get email field value
        var name = $("#name").val(); // get name field value
        var msg = $("#msg").val(); // get message field value
        var sub = $("#subject").attr("value");
        var phone = $("#number").val();
        if(phone == '') {
            phone = 'NA';
        }
        if(name == '' || sub == 'Subject*' || email == '' || msg == '') {
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
                    'subject': 'Enquiry ' + sub,
                    'text': msg,
                    "html":"A new enquiry has been submitted through contact form on your website, here are the details." + "<p>Name: "+name+"</p>" + "<p>Contact: "+phone+"</p>"+ "<p>Email: "+email+"</p>"+ "<p>Nature of enquiry: "+sub+"</p>"+ "<p>Message: "+msg+"</p>",
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
            $("#name").val(''); // reset field after successful submission
            $("#email").val(''); // reset field after successful submission
            $("#msg").val(''); // reset field after successful submission
        })
        .fail(function(response) {
            alert('Error sending message.');
        });
        return false; // prevent page refresh
    });
});


//form script

$(function(){
    
    $('.work-form-submit-btn').click(function(){
        $('.form-control').removeClass('is-empty').removeClass('is-invalid');
        var name = $('#name').val();
        var number = $('#number').val();
        var subject = $('#subject').val();
        var email = $('#email').val();
        var message = $('#msg').val();
        if(name==null || name==''){
            $('#name').addClass('is-empty');
        }if(number==null || number==''){
            $('#number').addClass('is-empty');
        }if(subject==null || subject==''){
            $('#subject').addClass('is-empty');
        }if(email==null || email==''){
            $('#email').addClass('is-empty');
        }if(message==null || message==''){
            $('#msg').addClass('is-empty');
        }if(email!=null && email!='' && !validateEmail(email)){
            $('#email').addClass('is-invalid');
        }
    });

     $('.work-form-reset-btn').click(function() {
        resetForm();
     });

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function resetForm() {
        $('.form-control').removeClass('is-empty').removeClass('is-invalid');
        $('.form-control').val('').text('');
        $('#subject').val('Subject*');
    }
});
//form script end