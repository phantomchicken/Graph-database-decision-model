function showDatabaseDetails(dbName) {
    const db = databaseTable.find(database => database.name === dbName);
    
    if (!db) {
      return 'Details not available';
    }
  
    return `
      <strong>Type:</strong> ${db.type}<br>
      <strong>Pricing:</strong> ${db.pricing}<br>
      <strong>Support:</strong> ${db.support}<br>
      <strong>Serializability:</strong> ${db.serializability}<br>
      <strong>UI:</strong> ${db.ui}<br>
      <strong>Querying:</strong> ${db.querying}<br>
      <strong>Transactions:</strong> ${db.transactions}<br>
      <strong>Analytics:</strong> ${db.analytics}<br>
      <strong>Concurrency:</strong> ${db.concurrency}<br>
      <strong>Indexing:</strong> ${db.indexing}<br>
      <strong>Streaming:</strong> ${db.streaming}<br>
      <strong>Scalability:</strong> ${db.scalability}<br>
      <strong>Backup:</strong> ${db.backup}<br>
      <strong>Security:</strong> ${db.security}
    `;
  }
  
  
  
const questions = [
    {
      question: "What type of data do you mostly handle?",
      answers: [
        { text: "RDF", points: { 'Stardog': 10, 'GraphDB': 8, 'Neo4j': 2, 'TigerGraph': 2 } },  // Small points for Neo4j and TigerGraph, as they're LPG-focused
        { text: "LPG", points: { 'Neo4j': 10, 'TigerGraph': 8, 'GraphDB': 2, 'Stardog': 2 } }   // Small points for GraphDB and Stardog, as they're RDF-focused
      ]
    },
    {
      question: "Do you need high horizontal scalability?",
      answers: [
        { text: "Yes", points: { 'TigerGraph': 10, 'Neo4j': 5, 'GraphDB': 2, 'Stardog': 2 } },   // Larger points for TigerGraph and Neo4j, as they scale well
        { text: "No", points: { 'GraphDB': 5, 'Stardog': 3, 'Neo4j': 2, 'TigerGraph': 2 } }     // Small points for Neo4j and TigerGraph, as they still scale
      ]
    },
    // Add more questions here...
  ];
  
  const databases = {
    'Neo4j': { description: 'A popular labeled property graph database.', link: 'https://neo4j.com' },
    'Stardog': { description: 'An RDF-focused database with reasoning capabilities.', link: 'https://www.stardog.com' },
    'GraphDB': { description: 'A powerful RDF database with SPARQL support.', link: 'https://www.ontotext.com/products/graphdb/' },
    'TigerGraph': { description: 'An enterprise-focused database optimized for scalability.', link: 'https://www.tigergraph.com' }
  };
  
  
  let currentQuestionIndex = 0;
  let score = {};
  
  function updateBreadcrumbs() {
    const breadcrumbs = document.getElementById('progress-bar');
    breadcrumbs.innerHTML = '';
  
    questions.forEach((q, index) => {
      const breadcrumbItem = document.createElement('li');
      breadcrumbItem.classList.add('breadcrumb-item');
      if (index === currentQuestionIndex) {
        breadcrumbItem.classList.add('active');
        breadcrumbItem.setAttribute('aria-current', 'page');
        breadcrumbItem.innerText = `Question ${index + 1}`;
      } else {
        breadcrumbItem.innerHTML = `<a href="#">${index + 1}</a>`;
        breadcrumbItem.onclick = () => goToQuestion(index);
      }
      breadcrumbs.appendChild(breadcrumbItem);
    });
  }
  
  function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    answersElement.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'm-2', 'w-50');  // Wider buttons
      button.innerText = answer.text;
      button.onclick = () => addPoints(answer.points);
      answersElement.appendChild(button);
    });
  
    updateBreadcrumbs();  // Update breadcrumbs
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  }
  
  function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
  }
  
  
  
  function addPoints(points) {
    for (const db in points) {
      if (!score[db]) {
        score[db] = 0;
      }
      score[db] += points[db];
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    const resultsContainer = document.getElementById('results');
    const resultsList = document.getElementById('results-list');
    resultsContainer.classList.remove('d-none');
  
    const sortedResults = Object.keys(score)
      .sort((a, b) => score[b] - score[a])
      .map(db => ({ name: db, score: score[db], description: databases[db].description }));
  
    sortedResults.forEach(result => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      
      // Fetch the table details for the database
      const dbDetails = showDatabaseDetails(result.name);
      
      listItem.innerHTML = `
        <strong><a href="${databases[result.name].link}" target="_blank" class="db-link">${result.name}</a></strong> (Score: ${result.score})<br>
        <img src="images/${result.name.toLowerCase()}.png" alt="${result.name}" class="img-fluid mb-2" style="max-width: 100px;"><br>
        ${result.description}<br>
        ${dbDetails}`;  // Show the formatted table row details
      resultsList.appendChild(listItem);
    });
  
    document.getElementById('quiz-container').classList.add('d-none');
  
    // Add red, centered, wider restart button
    const restartButton = document.createElement('button');
    restartButton.classList.add('btn', 'btn-danger', 'mt-3', 'btn-block');
    restartButton.style.width = '50%';  // Wider
    restartButton.style.margin = '0 auto';  // Centered
    restartButton.innerText = 'Restart Quiz';
    restartButton.onclick = () => window.location.reload();
    resultsContainer.appendChild(restartButton);
  }
  
  
  
  window.onload = loadQuestion;
  