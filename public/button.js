// Floating Button Behavior
const scrollBtn = document.getElementById('scrollBtn');

// Show or hide the button based on scroll position
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
};

// Scroll to the top or bottom when the button is clicked
scrollBtn.onclick = function () {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollBtn.innerHTML = '&#8681;';
  } else {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    scrollBtn.innerHTML = '&#8679;';
  }
};
