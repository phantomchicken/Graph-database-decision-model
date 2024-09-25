document.addEventListener('DOMContentLoaded', () => {
  const resultsList = document.getElementById('results-list');
  
  // Retrieve results from localStorage
  const quizResults = JSON.parse(localStorage.getItem('quizResults'));

  // Retrieve the quiz answers and points for breakdown
  const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
  const questions = JSON.parse(localStorage.getItem('questionsData')); // Assuming the questions are stored in localStorage too

  // Function to display database details
  function showDatabaseDetails(db) {
      return `
          <div class="row">
            <div class="col-md-6">
              <strong>Type:</strong> ${db?.type || 'N/A'}<br>
              <strong>Pricing:</strong> ${db?.pricing || 'N/A'}<br>
              <strong>Support:</strong> ${db?.support || 'N/A'}<br>
              <strong>Serializability:</strong> ${db?.serializability || 'N/A'}<br>
              <strong>UI:</strong> ${db?.ui || 'N/A'}<br>
              <strong>Querying:</strong> ${db?.querying || 'N/A'}<br>
              <strong>Transactions:</strong> ${db?.transactions || 'N/A'}
            </div>
            <div class="col-md-6">
              <strong>Analytics:</strong> ${db?.analytics || 'N/A'}<br>
              <strong>Concurrency:</strong> ${db?.concurrency || 'N/A'}<br>
              <strong>Indexing:</strong> ${db?.indexing || 'N/A'}<br>
              <strong>Streaming:</strong> ${db?.streaming || 'N/A'}<br>
              <strong>Scalability:</strong> ${db?.scalability || 'N/A'}<br>
              <strong>Backup:</strong> ${db?.backup || 'N/A'}<br>
              <strong>Security:</strong> ${db?.security || 'N/A'}
            </div>
          </div>
      `;
  }

  // Ensure there are results in localStorage
  if (quizResults && quizResults.length > 0) {
      quizResults.forEach(result => {
          const db = databaseTable.find(database => database.name === result.name);
          const dbNameId = db.name.replace(/\s+/g, '-').toLowerCase();
          // Create a col-md-6 div for two-column layout
          const listItem = document.createElement('div');
          listItem.classList.add('col-lg-6', 'col-12', 'mb-3'); // Two-column layout
          
          let pointsBreakdown = '';
          quizAnswers.forEach(answer => {
            // Find the question object that matches this answer
            const question = questions.find(q => q.question === answer.question);
            const selectedAnswer = answer.selectedAnswer;
            
            // Find the points for the selected answer for this specific database
            const answerPoints = question.answers.find(a => a.text === selectedAnswer)?.points[result.name];
            
            if (answerPoints) {
                pointsBreakdown += `<li>${answerPoints} - ${answer.question} (${selectedAnswer})</li>`;
            }
        });

          // Display result details, including icon, collapsible sections for details and points breakdown
          listItem.innerHTML = `
            <div class="card h-100 hover-card">
              <div class="card-body">
                <strong><a href="${db?.link || '#'}" target="_blank">${db?.name || result.name}</a></strong> (Score: ${result.score})<br>
                <img src="images/${dbNameId}.png" alt="${db?.name}" class="img-fluid mb-2" style="max-width: 100px;"><br>
                ${db?.description || 'No description available.'}<br>

                <!-- Collapsible Database Specifications -->
                <div class="gray-box p-2 mt-2" data-bs-toggle="collapse" data-bs-target="#specifications-${dbNameId}">
                  <span class="icon">▼</span> <span class="toggle-text">Show Database Specifications</span>
                </div>

                <div id="specifications-${dbNameId}" class="collapse mt-1">
                  ${showDatabaseDetails(db)}
                </div>

                <!-- Collapsible Points Breakdown -->
                <div class="gray-box p-2 mt-2" data-bs-toggle="collapse" data-bs-target="#points-${dbNameId}">
                  <span class="icon">▼</span> <span class="toggle-text">Show Points Breakdown</span>
                </div>

                <div id="points-${dbNameId}" class="collapse mt-1">
                  <h6>Points Breakdown:</h6>
                  <ul class="list-unstyled">${pointsBreakdown}</ul>
                </div>
              </div>
            </div>
          `;

          resultsList.appendChild(listItem);
      });

      // Add toggle functionality for collapsible sections
      document.querySelectorAll('.gray-box').forEach(box => {
          const collapseTarget = document.querySelector(box.getAttribute('data-bs-target'));

          if (collapseTarget) {
            box.addEventListener('click', function () {
              const icon = this.querySelector('.icon');
              const text = this.querySelector('.toggle-text');
  
              // Use Bootstrap's collapse API to handle state toggling
              collapseTarget.addEventListener('shown.bs.collapse', () => {
                icon.innerHTML = '▲';
                text.innerHTML = text.innerHTML.includes('Points Breakdown') ? 'Hide Points Breakdown' : 'Hide Database Specifications';
              });
  
              collapseTarget.addEventListener('hidden.bs.collapse', () => {
                icon.innerHTML = '▼';
                text.innerHTML = text.innerHTML.includes('Points Breakdown') ? 'Show Points Breakdown' : 'Show Database Specifications';
              });
            });
          }
      });
      
  } else {
      resultsList.innerHTML = '<p>No results available. Please restart.</p>';
  }

  // Restart button
  document.getElementById('restart-btn').onclick = () => {
      localStorage.removeItem('quizResults');  // Clear the results
      localStorage.removeItem('quizAnswers');  // Clear the answers
      window.location.href = 'index.html';  // Redirect back to the quiz page
  };
});
