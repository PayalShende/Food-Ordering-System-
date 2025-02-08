
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// registration.js
document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const userData = {
        firstname: document.getElementById("firstname").value,
        surname: document.getElementById("surname").value,
        username: document.getElementById("username").value,
        phone: document.getElementById("mobile number").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        password: document.getElementById("psw-repeat").value
    };
    
    // Send user data to the backend for registration
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Registration successful!");
            window.location.href = "/login.html"; // Redirect to login page
        } else {
            alert("Registration failed: " + data.message);
        }
    });
});
