document.addEventListener('DOMContentLoaded', () => {
    const resultsList = document.getElementById('results-list');
    
    // Retrieve results from localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults'));

    // Retrieve the quiz answers and points for breakdown
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers'));

    // Ensure there are results in localStorage
    if (quizResults && quizResults.length > 0) {
      quizResults.forEach(result => {
        const db = databaseTable.find(database => database.name === result.name);

        // Create a col-md-6 div for two-column layout
        const listItem = document.createElement('div');
        listItem.classList.add('col-md-6', 'mb-3'); // Two-column layout

        // Create points breakdown from quiz answers
        let pointsBreakdown = '';
        quizAnswers.forEach(answer => {
          const questionPoints = answer.points && answer.points[db.name];
          if (questionPoints) {
            pointsBreakdown += `<li>${answer.question}: ${questionPoints} points</li>`;
          }
        });

        // Display result details, including icon, show more button, and points breakdown
        listItem.innerHTML = `
          <div class="card h-100 hover-card"> <!-- Add hover effect class -->
            <div class="card-body">
              <strong><a href="${db?.link || '#'}" target="_blank">${db?.name || result.name}</a></strong> (Score: ${result.score})<br>
              <img src="images/${db?.name.toLowerCase()}.png" alt="${db?.name}" class="img-fluid mb-2" style="max-width: 100px;"><br>
              ${db?.description || 'No description available.'}<br>

              <!-- Points breakdown section -->
              <ul class="list-unstyled">${pointsBreakdown}</ul>
              
              <!-- Show more/less button with Bootstrap collapse -->
              <div class="gray-box p-2 mt-2 w-25" data-bs-toggle="collapse" data-bs-target="#details-${db.name}">
                <span class="icon">▼</span> <span class="toggle-text">Show More</span>
              </div>

              <!-- Collapse container for details -->
              <div id="details-${db.name}" class="collapse mt-1">
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
              </div>
            </div>
          </div>
        `;

        resultsList.appendChild(listItem);
      });

      document.querySelectorAll('.gray-box').forEach(box => {
        const collapseTarget = document.querySelector(box.getAttribute('data-bs-target'));
      
        box.addEventListener('click', function () {
          const icon = this.querySelector('.icon');
          const text = this.querySelector('.toggle-text');
          const isExpanded = collapseTarget.classList.contains('show');
      
          // Use Bootstrap's collapse API to handle state toggling
          collapseTarget.addEventListener('shown.bs.collapse', () => {
            icon.innerHTML = '▲';
            text.innerHTML = 'Show Less';
          });
      
          collapseTarget.addEventListener('hidden.bs.collapse', () => {
            icon.innerHTML = '▼';
            text.innerHTML = 'Show More';
          });
        });
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
