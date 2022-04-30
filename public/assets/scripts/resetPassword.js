let oldpassword = $("#oldpassword");
let newpassword = $("#newpassword");
let submit = $("#btnSubmit");
let message = $("#message");

function myFunction() {
    var x = document.getElementById("newpassword");
    var y = document.getElementById("oldpassword");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  }

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
            message.html('<div class="p-4 mb-2 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert"><span class="font-medium">Successfully changed</span> password </div>');
            oldpassword.val("");
            newpassword.val("");
            window.location.href = "/";
        },
        error: (data) => {
            console.log(data);
            oldpassword.val("");
            newpassword.val("");
            message.html('<div class="flex p-4 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"><svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg><div><span class="font-medium">Wrong password alert!</span> try again</div></div>');
        }
    });
})