let user = $("#user");
let logoutButton = $("#logout");
let containeruser = $("#containeruser");

function getUsername() {
    $.ajax({
        url: "/api/getUser",
        type: "GET",
        success: (data) => {
            console.log(data.user);
            containeruser.html(`<a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"data-toggle="dropdown" aria-expanded="false">${data.user}</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a id="logout" class="dropdown-item" href="#">Logout</a><a class="dropdown-item" href="/reset">Reset Password</a></div>`);
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