
let email = $("#email");
let password = $("#password");
let submit = $("#btnSubmit");
let message = $("#message");


submit.click(() => {

    $.ajax({
        url: "/api/login",
        type: "POST",
        data: {
            email: email.val(),
            password: password.val(),
        },
        success: () => {
            console.log('logged in successfully');
            message.html('<div class="alert alert-success" role="alert"> Successfully logged in </div>');
            window.location.href = "/home";
        },
        error: () => {
            console.log('Wrong username or password');
            message.html('<div class="alert alert-danger" role="alert">Wrong username or password!</div>');
        }
    });
})

