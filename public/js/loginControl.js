document.getElementById("loginBtn").addEventListener('click', login);
let csrfToken;
let token;
let userID;
// Assuming you use the Fetch API
fetch('http://localhost:8000/csrf-token')
  .then(response => response.json())
  .then(data => {
    csrfToken = data.token;
    // Now you can use csrfToken in your subsequent requests
  })
  .catch(error => console.error('Error fetching CSRF token:', error));

function login() {
  console.log("aaaaaaaa");
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email, password);
  fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.user.id);
      //window.location.href = 'schedule.html';
      // Store the token securely (e.g., in localStorage) for subsequent requests
    })
    .catch(error => {
      console.error('Error:', error);
    });
}