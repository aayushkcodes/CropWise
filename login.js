const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const backHomeLink = document.getElementById('backHomeLink');

loginTab.addEventListener('click', showLogin);
signupTab.addEventListener('click', showSignUp);

function showLogin() {
  loginForm.style.display = 'flex';
  signupForm.style.display = 'none';
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  backHomeLink.style.display = 'none';
}

function showSignUp() {
  signupForm.style.display = 'flex';
  loginForm.style.display = 'none';
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  backHomeLink.style.display = 'none';
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const city = document.getElementById('loginCity').value.trim();

  if (!email || !password || !city) {
    alert('Please fill all fields including city.');
    return;
  }

  sessionStorage.setItem('userCity', city);

  // For demo: redirect to home
  window.location.href = 'home.html';
});

signupForm.addEventListener('submit', e => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const dob = document.getElementById('dob').value;
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const city = document.getElementById('signupCity').value.trim();

  if (!firstName || !lastName || !dob || !phone || !email || !password || !city) {
    alert('Please fill all fields.');
    return;
  }
  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  sessionStorage.setItem('userCity', city);

  // For demo: redirect to home
  window.location.href = 'home.html';
});
