document.addEventListener('DOMContentLoaded', () => {
    const resultsList = document.getElementById('results-list');
    
    // Retrieve results from localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults'));
  
    // Ensure there are results in localStorage
    if (quizResults && quizResults.length > 0) {
      quizResults.forEach(result => {
        // Find the database from the databaseTable instead of databases
        const db = databaseTable.find(database => database.name === result.name);
  
        // Create list item for each database result
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item', 'mt-1');
        
        // Display result details, including icon and show more button
        listItem.innerHTML = `
          <strong><a href="${db?.link || '#'}" target="_blank">${db?.name || result.name}</a></strong> (Score: ${result.score})<br>
          <img src="images/${db?.name.toLowerCase()}.png" alt="${db?.name}" class="img-fluid mb-2" style="max-width: 100px;"><br>
          ${db?.description || 'No description available.'}<br>
          
          <!-- Show more/less button with Bootstrap collapse -->
          <button class="btn btn-link p-0 mt-1" data-bs-toggle="collapse" data-bs-target="#details-${db.name}" aria-expanded="false" aria-controls="details-${db.name}">
            Show more
          </button>
  
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
        `;
  
        resultsList.appendChild(listItem);
      });
    } else {
      resultsList.innerHTML = '<p>No results available. Please restart.</p>';
    }
  
    // Restart button
    document.getElementById('restart-btn').onclick = () => {
      localStorage.removeItem('quizResults');  // Clear the results
      window.location.href = 'index.html';  // Redirect back to the quiz page
    };
  });
  