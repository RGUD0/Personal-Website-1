let formIsValid = false; // default empty field

function validate() {
    // input elements
    let fNameInput;
    let lNameInput;
    let eAddressInput;
    let pNumberInput;
    let mInput;

    // values of inputs
    let fNameValue = null;
    let lNameValue = null;
    let eAddressValue = null;
    let pNumberValue = null;
    let mValue = null;

    // output elements
    let valFName;
    let valLName;
    let valUEmail;
    let valUPhone;
    let valUMessage;
    let validationOutput;
    let submitBtn;

    window.addEventListener("load", startup, false);

    // sets up input elements and listeners
    function startup() {
        // input elements
        fNameInput = document.querySelector("#user_fname");
        lNameInput = document.querySelector("#user_lname");
        eAddressInput = document.querySelector("#user_email");
        pNumberInput = document.querySelector("#user_phone");
        mInput = document.querySelector("#user_message");

        // span * requirements for inputs
        valFName = document.querySelector("#valFName");
        valLName = document.querySelector("#valLName");
        valUEmail = document.querySelector("#valUEmail");
        valUPhone = document.querySelector("#valUPhone");
        valUMessage = document.querySelector("#valUMessage");

        // listeners for input updates
        fNameInput.addEventListener("input", updateFirst, false);
        lNameInput.addEventListener("input", updateFirst, false);
        eAddressInput.addEventListener("input", updateFirst, false);
        pNumberInput.addEventListener("input", updateFirst, false);
        mInput.addEventListener("input", updateFirst, false);
    }

    function updateFirst(event) {
        // validate and submit elements
        validationOutput = document.querySelector("#validation");
        submitBtn = document.querySelector("#submitBtn");

        // input values
        fNameValue = fNameInput.value;
        lNameValue = lNameInput.value;
        eAddressValue = eAddressInput.value;
        pNumberValue = pNumberInput.value;
        mValue = mInput.value;

        // required * markers
        valFName.innerHTML = (fNameValue != "") ? "" : "*"; // not null
        valLName.innerHTML = (lNameValue != "") ? "" : "*"; // not null
        valUEmail.innerHTML = (eAddressValue.match(/^[a-zA-Z0-9]+[_\.-]*[a-zA-Z0-9]*@[a-zA-Z0-9-]+\.[a-z][a-z]+$/)) ? "" : "*"; // follows format xyz@<domain>.<top-level-domain>
        valUPhone.innerHTML = (pNumberValue.match(/^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/)) ? "" : "*"; // follows format 123-456-7890
        valUMessage.innerHTML = (mValue != "") ? "" : "*"; // not null

        // Checks if all inputs are valid (w/o *)
        if (valFName.textContent == "" && 
        valLName.textContent == "" && 
        valUEmail.textContent == "" && 
        valUPhone.textContent == "" && 
        valUMessage.textContent == "") {
            // Allows user to click submitt button
            submitBtn.disabled = false;
            formIsValid = true;
            console.clear();
            console.log("Field inputs all valid.");
        } else {
            // Does not allow user to click submitt button
            submitBtn.disabled = true;
            formIsValid = false;
            console.clear();
            console.log("Field inputs not all valid.");
        }

        // Shows correction message for input
        validationOutput.innerHTML = 
        (fNameValue == "" ? "First name cannot be null. <br>": "") +
        (lNameValue == "" ? "Last name cannot be null. <br>": "") +
        (!eAddressValue.match(/^[a-zA-Z0-9]+[_\.-]*[a-zA-Z0-9]*@[a-zA-Z0-9-]+\.[a-z][a-z]+$/) ? "Must follow xyz@domain.top-level-domain format. <br>": "") +
        (!pNumberValue.match(/^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/) ? "Must follow 123-456-7890 format. <br>": "") + 
        (mInput.value == "" ? "Message cannot be null. <br>": "");
    }
}

function sendMail() {
    if (formIsValid) { // Only sends if the form has valid inputs
        // Form field values
        var params = {
            user_fname: document.querySelector("#user_fname").value,
            user_lname: document.querySelector("#user_lname").value,
            user_email: document.querySelector("#user_email").value,
            user_phone: document.querySelector("#user_phone").value,
            user_message: document.querySelector("#user_message").value
        };
        // IDs
        const serviceID = "service_6wo05vw";
        const templateID = "template_xbl3d46";
        // sends field values to email
        emailjs.send(serviceID,templateID,params)
        .then(function(response) {
            alert("Your message sent through using sendMail()!");
            console.log('SUCCESS!', response.status, response.text);
            document.querySelector("#user_fname").value = "";
            document.querySelector("#user_lname").value = "";
            document.querySelector("#user_email").value = "";
            document.querySelector("#user_phone").value = "";
            document.querySelector("#user_message").value = "";
            document.querySelector("#submitBtn").disabled = true;
            //console.log(res);
        }, function(error) {
            console.log('FAILED...', error);
        })
        //.catch((err) => console.log(err));
    }
}