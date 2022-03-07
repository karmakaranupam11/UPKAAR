const get = document.getElementById('get');
const text = document.getElementById('text');
const slot = document.getElementById('slot');
const date = document.getElementById('date');

generateDate = () => {
     const dt = new Date();
     const yyyy = dt.getFullYear();
     let mm = dt.getMonth() + 1;
     let dd = dt.getDate();
     if (dd < 10) dd = '0' + dd;
     if (mm < 10) mm = '0' + mm;
     const today = dd + '-' + mm + '-' + yyyy;
     return today;
}

changeFormat = (date) => {
     const myArray = date.split("-");

     dt = myArray[2] + "-" + myArray[1] + "-" + myArray[0];
     return dt;
}

checkValid = (date) => {
     var varDate = new Date(date); //dd-mm-YYYY
     var today = new Date();
     today.setHours(0, 0, 0, 0);

     if (today >= varDate){
          console.log("date" + varDate);
     console.log("Today" + today);
     return false;
     }
     else return true;
}

get.addEventListener('click', () => {
     if (text.value === "") {
          slot.innerHTML = "";
          slot.innerHTML = "Please Enter a valid Pincode!";
          return;
     }
     if (!checkValid(date.value)) {
          slot.innerHTML = "";
          slot.innerHTML = "Please Enter a valid Date!";
          return;
     }
     const choosenDate = changeFormat(date.value);
     console.log("date : " + date.value + " " + changeFormat(date.value))
     $.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${text.value}&date=${choosenDate}`, (datas) => {
          slot.innerHTML = "";
          if(datas.sessions.length == 0){
               slot.innerHTML = "No slots available for booking!"
               return
          }
          for (e of datas.sessions) {
               console.log(e);
               const details = document.createElement("div");
               details.innerHTML = ` <div class="card" style="width: 18rem;">
                    <div class="card-body">
                         <h5 class="card-title">Location : ${e.name}</h5>
                         <p class="card-text">
                              <ul>
                              <li class="Address"><b>Address:</b> ${e.address}</li>
                              <li class="state"><b>State name:</b> ${e.state_name}</li>
                              <li class="district"><b> District name:</b> ${e.district_name}</li>
                              <li class="block"><b>Block name:</b> ${e.block_name}</li>
                              <li class="pincode"><b>Pincode</b>: ${e.pincode}</li>
                              </ul>
                         </p>
                    </div>
                    <ul class="list-group list-group-flush">
                         <li class="list-group-item"> From:<span class="start"> ${e.from} </span>To: <span class="to">${e.to}</span></li>
                         <li class="list-group-item feetype">Fee Type: ${e.fee_type}</li>
                         <li class="list-group-item">Available Capacity: ${e.available_capacity}</li>
                         <li class="list-group-item">Available capacity dose1: ${e.available_capacity_dose1}</li>
                         <li class="list-group-item">Available capacity dose2: ${e.available_capacity_dose2}</li>
                         <li class="list-group-item vac">Vaccine: ${e.vaccine}</li>
                    </ul>
        </div>`;
               slot.appendChild(details);
          }
     });
});