"use strict"

// console.log("Inside the js")
const sign_up = document.getElementById('signup')
const sign_in = document.getElementById('sign_in')
const forgot = document.querySelector('.forgot')
// console.log(sign_up)
sign_up.addEventListener("click", signup);
sign_in.addEventListener("click", login);
forgot.addEventListener("click", forgot_pass)

function forgot_pass(e){
    // e.preventDefault()
    alert("Contact website owner!")
}

let temp_database = [];

function login(e){
    // e.preventDefault()
    const email = document.getElementById('email_id').value
    const password = document.getElementById('password').value
    // console.log(temp_database[0][0], temp_database[0][1])

    for (let i=0; i<temp_database.length; i++){
        if(email === temp_database[i][0] && password === temp_database[i][1]){
            window.location.replace("services.html");
            break
        }

        if(i === temp_database.length-1 && (email !== temp_database[i][0] || password !== temp_database[i][1])){
            alert("Wrong Credentials, please try again!")
        }
    }
    console.log(temp_database)
    // console.log(temp_database.includes())  
}


function signup(e) {
    //  e.preventDefault()
    // console.log("Inside the function")
    const name = document.getElementById('firstname').value
    const surname = document.getElementById('lastname').value
    const mobile = document.getElementById('phone').value
    const email_id = document.getElementById('email').value
    const password = document.getElementById('password1').value
    const cnfpassword1 = document.getElementById('cnfpassword').value

    // console.log(name, surname, mobile, email_id, password, cnfpassword1)
    let email_db = []
    for(let i=0; i<temp_database.length; i++){
        email_db.push(temp_database[i][0])
    } 

    if(email_db.includes(email_id)){
        alert("Account already exists, Please sign in!")
    }
    else if(name.length >= 3 && surname.length >= 3 && mobile.length >= 8 && email_id.length >= 10 && email_id.includes("@") && email_id.includes(".com") && password.length >= 8 && cnfpassword1 === password){
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', "http://127.0.0.1:5000/", true);
        xhttp.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        let send = {firstname:name,lastname:surname,phone:mobile,email:email_id,password1:password,cnfpassword:cnfpassword1};
        var sendString = JSON.stringify(send);
        xhttp.send(sendString);
        alert("Registration Succesful")
    }
    else{
        alert("Wrong credentials, Please try again!!!")
    }

    
    
    
}

getUser();
async function getUser() {
  const get_url = 'http://127.0.0.1:5000/get';
  const response = await fetch(get_url);
  const data_watch = await response.json();
//   console.log("getUser()")
//   console.log(data_watch);
  temp_database = data_watch;
}