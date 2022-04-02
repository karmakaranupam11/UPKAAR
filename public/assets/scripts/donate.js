let UserName = $("#UserName");
let UserContact = $("#UserContact");
let UserCity = $("#UserCity");
let UserPostalCode = $("#UserPostalCode");
let UserState = $("#UserState");
let BedNumbers = $("#BedNumbers");
let HospitalName = $("#HospitalName");
let logoutButton = $("#logout");
let containeruser = $("#containeruser");
let btnSubmit = $("#btnSubmit");



function getUsername() {
    $.ajax({
        url: "/api/getUser",
        type: "GET",
        success: (data) => {
            console.log(data.user);
            UserName.val(`${data.user}`);
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

generateTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

getUsername();

btnSubmit.click(() => {
    $.post("/api/post/upload", {
        username: UserName.val(),
        date: generateTodaysDate(),
        city: UserCity.val(),
        contact: UserContact.val(),
        postalcode: UserPostalCode.val(),
        state: UserState.val(),
        noOfBeds: BedNumbers.val(),
        hospitalName: HospitalName.val()
    }, (err, data) => {
        UserName.val("");
        UserContact.val("");
        UserCity.val("");
        UserPostalCode.val("");
        UserState.val("");
        BedNumbers.val("");
        HospitalName.val("");
        confirm("Your form has been submitted")
    })
})