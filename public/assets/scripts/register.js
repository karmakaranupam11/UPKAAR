
let name = $("#name");
let email = $("#email");
let password = $("#password");
let submit = $("#btnSubmit");
let message = $("#message");

submit.click(() => {
    console.log(name.val());
    
    if( name.val() === "" || email.val() === "" || password.val() === ""){
        message.html('<div class="alert alert-danger" role="alert">Please fill all!</div>');
        return;
    }


    $.ajax({
        url: "/api/register",
        type: "POST",
        data: {
            name: name.val(),
            email: email.val(),
            password: password.val(),
        },
        success: () => {
            console.log('logged in successfully');
            message.html('<div class="alert alert-success" role="alert"> Successfully signed up in </div>');
            name.val("");
            email.val("");
            password.val("");
            window.location.href = "/";
        },
        error: (data) => {
            console.log(data);
            name.val("");
            email.val("");
            password.val("");
            message.html('<div class="alert alert-danger" role="alert">user with this email already exists!</div>');
        }
    });
})
