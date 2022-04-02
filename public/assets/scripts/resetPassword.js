let oldpassword = $("#oldpassword");
let newpassword = $("#newpassword");
let submit = $("#btnSubmit");
let message = $("#message");

submit.click(() => {
    console.log(oldpassword.val());

    $.ajax({
        url: "/api/update/password",
        type: "PUT",
        data: {
            oldPassword: oldpassword.val(),
            newPassword: newpassword.val(),
        },
        success: () => {
            console.log('logged in successfully');
            message.html('<div class="alert alert-success" role="alert"> Successfully changed up in </div>');
            oldpassword.val("");
            newpassword.val("");
            window.location.href = "/";
        },
        error: (data) => {
            console.log(data);
            oldpassword.val("");
            newpassword.val("");
            message.html('<div class="alert alert-danger" role="alert">Wrong password!</div>');
        }
    });
})