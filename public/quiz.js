function showDatabaseDetails(db) {
    return `
      <div class="row">
        <div class="col-md-6">
          <strong>Type:</strong> ${db.type}<br>
          <strong>Pricing:</strong> ${db.pricing}<br>
          <strong>Support:</strong> ${db.support}<br>
          <strong>Serializability:</strong> ${db.serializability}<br>
          <strong>UI:</strong> ${db.ui}<br>
          <strong>Querying:</strong> ${db.querying}<br>
          <strong>Transactions:</strong> ${db.transactions}
        </div>
        <div class="col-md-6">
          <strong>Analytics:</strong> ${db.analytics}<br>
          <strong>Concurrency:</strong> ${db.concurrency}<br>
          <strong>Indexing:</strong> ${db.indexing}<br>
          <strong>Streaming:</strong> ${db.streaming}<br>
          <strong>Scalability:</strong> ${db.scalability}<br>
          <strong>Backup:</strong> ${db.backup}<br>
          <strong>Security:</strong> ${db.security}
        </div>
      </div>
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
  
  function saveQuizResultsToStorage() {
    const sortedResults = Object.keys(score)
      .sort((a, b) => score[b] - score[a])
      .map(db => ({ name: db, score: score[db] }));
  
    // Save sorted results to localStorage
    localStorage.setItem('quizResults', JSON.stringify(sortedResults));
  
    // Redirect to the results page
    window.location.href = 'results.html';  // Assuming results page is named results.html
  }
  
  function showResults() {
    saveQuizResultsToStorage();  // Call the function to save results and redirect
  }
  
  
  
  
  window.onload = loadQuestion;
  