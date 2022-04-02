let cardContainer = $("#card-container");
let btnSubmit = $("#btnSubmit");
let inpPincode = $("#inpPincode");
let user = $("#user");
let status = $("#status");
let logoutButton = $("#logout");
let containeruser = $("#containeruser");
let postDeleteButton = $("#postDeleteButton");


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

function createCards(data) {
    return $(`
        <div class="card" style="width: 18rem;">
            <div id="${data._id}" class="card-body">
                <h5 class="card-title"><span class="name">Posted by :</span> ${data.name}<br><h6>Posted on : ${data.date}</h6></ </h5>
                <h6 class="card-subtitle mb-2 text-muted"><span class="contact">Contact : </span>${data.usercontact}</h6><br>
                <p class="card-text"><span class="name">No. of Beds :</span> ${data.noOfBeds}</p>
                <p class="card-text"><span class="name">PinCode : </span>${data.postalcode}</p>
                <p class="card-text"><span class="name"> Location :</span>${data.city}, ${data.state}</p>
                <p class="card-text"><span class="name">Hospital Name :</span> ${data.hospitalName}</p>
                <button id="postDeleteButton" type="button" class="btn btn-outline-danger">Delete</button>
            </div>
        </div>
    `);
}

getUsername();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showResults);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showResults(position) {
    $.get("/api/vacancy/", {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }, (res) => {
        cardContainer.empty();
        if (res.length === 0) {
            cardContainer.append($(`<h3 class="text-center"> No resources found near you, try searching by PinCode</h3>`))
        }
        // data.sort(compare);
        for (data of res) {
            cardContainer.append(createCards(data));
        }
    })
}

$.get("/api/vacancy/", (datas) => {
    cardContainer.empty();
    datas.sort(compare);
    for (data of datas) {
        cardContainer.append(createCards(data));
    }
});

function compare(a, b) {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }
    return 0;
}

getLocation();

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

// for dynamically created elements
$(document).on('click', postDeleteButton, function () {
    console.log('Delete button clicked');

    const postid = document.getElementById('postDeleteButton').parentNode.id;
    // console.log(id);

    $.ajax({
        url: `/api/removePost/${postid}`,
        type: 'DELETE',
        success: (result) => {
            // Do something with the result
            console.log(result);
            window.location.href = "/requirement";
        },
        error: () => {
            console.log("you are not authorized to delete the post");
            status.html('<div class="alert alert-danger" role="alert">You are not authorized to delete this post!</div>');
        }
    });
});

btnSubmit.click(() => {
    console.log("clicked submit");
    if (inpPincode.val() === "") {
        cardContainer.empty();
        cardContainer.append($(`<h3 class="text-center"> Invalid Pincode! please enter a valid Pincode</h3>`))
        return;
    }
    $.get(`/api/vacancy/${inpPincode.val()}`, (datas) => {
        cardContainer.empty();
        inpPincode.val("pincode");
        datas.sort(compare);
        for (data of datas) {
            cardContainer.append(createCards(data));
        }
    })
})