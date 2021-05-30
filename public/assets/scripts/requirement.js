let cardContainer = $("#card-container");
let btnSubmit = $("#btnSubmit");
let inpPincode = $("#inpPincode");

function createCards(data) {
  return $(`
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Name : ${data.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Contact : ${data.usercontact}</h6><br>
                <p class="card-text">No. of Beds : ${data.noOfBeds}</p>
                <p class="card-text">PinCode : ${data.postalcode}</p>
                <p class="card-text">${data.city}, ${data.state}</p>
                <p class="card-text">Hospital Name : ${data.hospitalName}</p>
            </div>
        </div>
    `);
}

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
        if(res.length === 0) {
            cardContainer.append($(`<h3 class="text-center"> No resources found near you, try searching by PinCode</h3>`))
        }
        for(data of res) {
            cardContainer.append(createCards(data));
        }
    })
}

$.get("/api/vacancy/", (datas) => {
    cardContainer.empty();
    for (data of datas) {
        cardContainer.append(createCards(data));
    }
});

getLocation();

btnSubmit.click(() => {
    $.get(`/api/vacancy/${inpPincode.val()}`, (datas) => {
        cardContainer.empty();
        inpPincode.val("pincode");
        for(data of datas) {
            cardContainer.append(createCards(data));
        }
    })
})