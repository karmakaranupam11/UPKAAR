let user = $("#user");
let logoutButton = $("#logout");
let containeruser = $("#containeruser");

function getUsername() {
    $.ajax({
        url: "/api/getUser",
        type: "GET",
        success: (data) => {
            console.log(data.user);
            containeruser.html(`<a class="nav-link" role="button" data-toggle="dropdown" aria-expanded="false" ><img src="../assets/images/account_circle_black_24dp.svg" class="rounded-circle"
            style="width: 30px;"  alt="Avatar" /></a><div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown"><a class="dropdown-item"  data-target="#exampleModal" href="#">${data.user.substring(0,1).toUpperCase()+data.user.substring(1)}</a><a class="dropdown-item" data-toggle="modal" data-target="#exampleModal" href="#">Logout</a><a class="dropdown-item" href="/reset">Reset Password</a></div>`);
        },
        error: () => {
            console.log("not logged in");
            containeruser.html(`<a class="nav-link" target="_blank" href="/">Sign in</a>`);
        }
    });
}


$("body").on("click", "#logout", function () {
    $.ajax({
        url: "/api/logout",
        type: "GET",
        success: () => {
            console.log("successfully logout");
            window.location.href = "/";
        },
        error: () => {
            console.log("Not logged out");
        }
    });
});



getUsername();

user.click(() => {
    console.log('clicked');
})