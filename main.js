// Get the form element and error message container
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Correct username and password
const correctUsername = "Oil Barrel";
const correctPassword = "BarrelGang";

// Event listener for form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from reloading the page

  // Get the entered username and password
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if the entered credentials are correct
  if (username === correctUsername && password === correctPassword) {
    alert("Login successful!");
    window.location.href = "pokeindex.html"; // Redirect to another page
  } else {
    // Show an error message if the credentials are incorrect
    errorMessage.style.display = "block";
    errorMessage.textContent = "Incorrect username or password.";
  }
});


