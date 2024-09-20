// Floating Button Behavior
const scrollUpBtn = document.getElementById('scrollUpBtn');
const scrollDownBtn = document.getElementById('scrollDownBtn');

// Scroll to the top when the "scroll up" button is clicked
scrollUpBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Scroll to the bottom when the "scroll down" button is clicked
scrollDownBtn.onclick = function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

// Show or hide the scroll buttons based on scroll position
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollUpBtn.style.display = 'block';
  } else {
    scrollUpBtn.style.display = 'none';
  }

  if (document.body.scrollTop + window.innerHeight >= document.body.scrollHeight - 100) {
    scrollDownBtn.style.display = 'none';
  } else {
    scrollDownBtn.style.display = 'block';
  }
};
