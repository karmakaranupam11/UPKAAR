let UserName = $("#UserName");
let UserContact = $("#UserContact");
let UserCity = $("#UserCity");
let UserPostalCode = $("#UserPostalCode");
let UserState = $("#UserState");
let BedNumbers = $("#BedNumbers");
let HospitalName = $("#HospitalName");
let btnSubmit = $("#btnSubmit");

btnSubmit.click(() => {
    $.post("/api/vacancy", {
        username: UserName.val(),
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