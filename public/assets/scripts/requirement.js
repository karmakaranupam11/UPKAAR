let cardContainer = $("#card-container");
let btnSubmit = $("#btnSubmit");
let inpPincode = $("#inpPincode");
let user = $("#user");
let status = $("#status");
let logoutButton = $("#logout");
let containeruser = $("#containeruser");



function getUsername() {
  $.ajax({
    url: "/api/getUser",
    type: "GET",
    success: (data) => {
      console.log(data.user);
      currentUser = data.userId;
      console.log(currentUser);
      containeruser.html(
        `<a class="nav-link" role="button" data-toggle="dropdown" aria-expanded="false" ><img src="../assets/images/account_circle_black_24dp.svg" class="rounded-circle"
        style="width: 30px;"  alt="Avatar" /></a><div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown"><a class="dropdown-item"  data-target="#exampleModal" href="#">${data.user.substring(0,1).toUpperCase()+data.user.substring(1)}</a><a class="dropdown-item" data-toggle="modal" data-target="#exampleModal" href="#">Logout</a><a class="dropdown-item" href="/reset">Reset Password</a></div>`
      );
    },
    error: () => {
      console.log("not logged in");
      containeruser.html(
        `<a class="nav-link" target="_blank" href="/">Sign in</a>`
      );
    },
  });
}


{/* <div class="card" style="width: 18rem;">
<div id="${data._id}" class="card-body">
    <h5 class="card-title"><span class="name">Posted by :</span> ${data.name}<br><h6>Posted on : ${data.date}</h6></ </h5>
    <h6 class="card-subtitle mb-2 text-muted"><span class="contact">Contact : </span>${data.usercontact}</h6><br>
    <p class="card-text"><span class="name">No. of Beds :</span> ${data.noOfBeds}</p>
    <p class="card-text"><span class="name">PinCode : </span>${data.postalcode}</p>
    <p class="card-text"><span class="name"> Location :</span>${data.city}, ${data.state}</p>
    <p class="card-text"><span class="name">Hospital Name :</span> ${data.hospitalName}</p>
    <button id="postDeleteButton" type="button" class="btn btn-outline-danger">Delete</button>
</div>
</div> */}
 

function createCards(data) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let date = data.date.substring(0,10);
    let arr = date.split('-');

    data.date = arr[2] +" "+months[parseInt(arr[1])-1] +" "+arr[0];
    // console.log(data.date);
    return $(`
    <div class="card">
	<div id="${data._id}" class="card-body">
		<div class="card-body">
			<h5 class="card-title">Organization : ${data.organizationname}</h5>
			<h5 class="card-title"><span class="name">Posted by :</span> ${ data.name}<br>
				<h6>Posted on : ${data.date}</h6>
			</h5>
			<p class="card-text">${data.hospitalName}</p>
			<p class="card-text">${data.address}</p>
		</div>
		<ul class="list-group list-group-flush">
			<li class="list-group-item">
				<h6 class="card-subtitle mb-2 text-muted"><span class="contact">Help line no. : </span>${
					data.usercontact
					}</h6>
			</li>
			<li class="list-group-item">
				<p class="card-text"><span class="name">PinCode : </span>${
					data.postalcode
					}</p>
			</li>
			<li class="list-group-item">
				<p class="card-text"><span class="name"> Address :</span>${
					data.city
					}, ${data.state}</p>
			</li>
			<li class="list-group-item">
				<p class="card-text"><span class="name">Volume :</span> ${ data.noOfBeds
					}</p>
			</li>
		</ul>
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
$("body").on("click", "#postDeleteButton" , function () {
    console.log('Delete button clicked');

    if(!confirm("are you sure you want to delete!")) return;

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