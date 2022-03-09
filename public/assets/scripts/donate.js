let UserName = $("#UserName");
let UserContact = $("#UserContact");
let UserCity = $("#UserCity");
let UserPostalCode = $("#UserPostalCode");
let UserState = $("#UserState");
let BedNumbers = $("#BedNumbers");
let HospitalName = $("#HospitalName");
let btnSubmit = $("#btnSubmit");

generateTodaysDate = ()=>{
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '-' + mm + '-' + yyyy;
return today;
}

btnSubmit.click(() => {
    $.post("/api/vacancy", {
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