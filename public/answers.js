document.addEventListener('DOMContentLoaded', () => {
    const answersList = document.getElementById('answers-list');
    
    // Retrieve answers from localStorage or wherever you're storing them
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
  
    // Check if answers exist in localStorage
    if (quizAnswers && quizAnswers.length > 0) {
      quizAnswers.forEach(answer => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
  
        // Append the question and selected answer
        listItem.innerHTML = `
          <strong>Question:</strong> ${answer.question}<br>
          <strong>Answer:</strong> ${answer.selectedAnswer}
        `;
  
        answersList.appendChild(listItem);
      });
    } else {
      answersList.innerHTML = '<li class="list-group-item">No answers found.</li>';
    }
  });
  