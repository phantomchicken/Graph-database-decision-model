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
      question: "Do you need to work with other data types as well?",
      answers: [
        { text: "Object", points: { 'OrientDB': 10 } },
        { text: "Column", points: { 'Azure Cosmos DB': 10, 'DataStax': 10 } },
        { text: "Document", points: { 'ArangoDB': 10, 'Azure Cosmos DB': 10, 'OrientDB': 10 } },
        { text: "Key-value", points: { 'ArangoDB': 10, 'Azure Cosmos DB': 10, 'OrientDB': 10 } }
      ]
    },
    {
      question: "Do you require an LPG, RDF model or both?",
      answers: [
        { text: "LPG", points: { 'Neo4j': 10, 'Memgraph': 10, 'TigerGraph': 10, 'NebulaGraph': 10, 'ArangoDB': 10, 'Azure Cosmos DB': 10, 'OrientDB': 10, 'DataStax': 10, 'HyperGraphDB': 10, 'TerminusDB': 10, 'JanusGraph': 10 } },
        { text: "RDF", points: { 'Stardog': 10, 'GraphDB': 10, 'Amazon Neptune': 10, 'OracleGraph': 10, 'AnzoGraph': 10 } },
        { text: "Both", points: { 'Amazon Neptune': 10, 'OracleGraph': 10, 'AnzoGraph': 10 } }
      ]
    },
    {
      question: "Do you require hyperedge support?",
      answers: [
        { text: "Yes", points: { 'HyperGraphDB': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you wish to have native integration with other apps from an ecosystem?",
      answers: [
        { text: "Yes", points: { 'Amazon Neptune': 10, 'Azure Cosmos DB': 10, 'OracleGraph': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you require parallel processing?",
      answers: [
        { text: "Yes", points: { 'Neo4j': 10, 'TigerGraph': 10, 'AnzoGraph': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you wish to save your data in-memory?",
      answers: [
        { text: "Yes", points: { 'Memgraph': 10, 'TerminusDB': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you require advanced RDF functionalities: reasoning, SHACL, federated queries?",
      answers: [
        { text: "Yes", points: { 'Stardog': 10, 'GraphDB': 10, 'Amazon Neptune': 10, 'DataStax': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you need native streaming capabilities?",
      answers: [
        { text: "Yes", points: { 'Memgraph': 10, 'TigerGraph': 10, 'NebulaGraph': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you need high horizontal scalability?",
      answers: [
        { text: "Yes", points: { 'TigerGraph': 10, 'NebulaGraph': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you require analytics (as opposed to just transactions)?",
      answers: [
        { text: "Yes", points: { 'Neo4j': 10, 'Memgraph': 10, 'TigerGraph': 10, 'Amazon Neptune': 10, 'Azure Cosmos DB': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Does your database need to be easy to use?",
      answers: [
        { text: "Yes", points: { 'Neo4j': 10, 'Memgraph': 10 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Do you require native graph algorithms?",
      answers: [
        { text: "Yes", points: { 'Neo4j': 10, 'Memgraph': 10, 'TigerGraph': 10, 'Amazon Neptune': 5, 'Azure Cosmos DB': 5 } },
        { text: "No", points: {} }
      ]
    },
    {
      question: "Which query language would you like to work with?",
      answers: [
        { text: "Cypher", points: { 'Neo4j': 10, 'Memgraph': 10 } },
        { text: "SPARQL", points: { 'Stardog': 10, 'GraphDB': 10, 'Amazon Neptune': 10, 'AnzoGraph': 10 } },
        { text: "Gremlin", points: { 'Amazon Neptune': 10, 'Azure Cosmos DB': 10, 'DataStax': 10, 'JanusGraph': 10 } },
        { text: "GraphQL", points: { 'Dgraph': 10 } },
        { text: "Custom/other", points: { 'TigerGraph': 10, 'NebulaGraph': 10, 'ArangoDB': 10, 'OrientDB': 10, 'HyperGraphDB': 10, 'TerminusDB': 10, 'OracleGraph': 10 } }
      ]
    }
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
  
      // Pass the current question and selected answer text to addPoints
      button.onclick = () => addPoints(answer.points, currentQuestion.question, answer.text);
      
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
  
  
  
  let quizAnswers = [];

  function addPoints(points, question, selectedAnswer) {
    for (const db in points) {
      if (!score[db]) {
        score[db] = 0;
      }
      score[db] += points[db];
    }
  
    // Store the user's selected answer
    quizAnswers.push({ question, selectedAnswer });
  
    // Save the answers to localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
    // Save questions to localStorage
    localStorage.setItem('questionsData', JSON.stringify(questions));

  
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
  