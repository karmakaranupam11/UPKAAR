
let name = $("#name");
let email = $("#email");
let password = $("#password");
let submit = $("#btnSubmit");
let message = $("#message");

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

submit.click(() => {
    console.log(name.val());
    
    if( name.val() === "" || email.val() === "" || password.val() === ""){
        message.html('<div class="flex p-4 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"><svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg><div><span class="font-medium">invalid!</span> please fill all</div></div>');
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
