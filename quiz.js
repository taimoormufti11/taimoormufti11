let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 300; // 5 minutes in seconds

const questions = [
  {
    question: "What is the main recruitment body for Pakistan's federal civil services?",
    options: ["NTS", "Punjab Public Service Commission", "Federal Public Service Commission", "Pakistan Bureau of Administration"],
    answer: 2,
    explanation: "The Federal Public Service Commission (FPSC) conducts exams and oversees recruitment to federal civil services in Pakistan."
  },
  {
    question: "Which service is considered the backbone of Pakistan's bureaucratic structure?",
    options: ["Pakistan Customs Service", "Foreign Service of Pakistan", "Pakistan Administrative Service", "Police Service of Pakistan"],
    answer: 2,
    explanation: "The Pakistan Administrative Service (PAS), formerly DMG, plays the key role in policymaking and governance."
  },
  {
    question: "Which exam must one clear to join Pakistan’s civil bureaucracy?",
    options: ["NAT", "CSS", "PMS", "PCS"],
    answer: 1,
    explanation: "CSS (Central Superior Services) is the competitive examination conducted annually for recruitment to civil services in Pakistan."
  },
  {
    question: "Which tier of government appoints the Assistant Commissioner?",
    options: ["Federal Government", "Provincial Government", "Local Government", "Judiciary"],
    answer: 1,
    explanation: "Assistant Commissioners are appointed by the provincial government as part of the Pakistan Administrative Service."
  },
  {
    question: "Which training institute is responsible for training fresh CSS officers?",
    options: ["Pakistan Academy of Governance", "National School of Public Policy", "Administrative Training Institute", "Civil Service College"],
    answer: 1,
    explanation: "The National School of Public Policy (NSPP) provides mandatory training to newly inducted civil servants."
  },
  {
    question: "Who heads a Division in the federal government?",
    options: ["Secretary", "Minister", "Director", "Joint Secretary"],
    answer: 0,
    explanation: "A federal Secretary, typically a BPS-22 officer, is the administrative head of a Division."
  },
  {
    question: "Which grade is considered the highest in Pakistan’s civil bureaucracy?",
    options: ["BPS-20", "BPS-21", "BPS-22", "BPS-23"],
    answer: 2,
    explanation: "BPS-22 is the highest attainable grade in the civil service hierarchy of Pakistan."
  },
  {
    question: "What is the role of the Establishment Division in Pakistan?",
    options: ["Security Operations", "Policy Making", "Managing Civil Servants’ Appointments and Transfers", "Budgeting"],
    answer: 2,
    explanation: "The Establishment Division manages appointments, postings, and promotions of civil servants."
  },
  {
    question: "Which service handles foreign diplomatic postings for Pakistan?",
    options: ["PAS", "PCS", "Foreign Service of Pakistan", "Judicial Service"],
    answer: 2,
    explanation: "The Foreign Service of Pakistan deals with diplomatic assignments and foreign affairs."
  },
  {
    question: "Which document outlines conduct rules for Pakistan's civil servants?",
    options: ["Civil Code 1973", "Service Rules Act", "Civil Servants Act, 1973", "Constitution Article 240"],
    answer: 2,
    explanation: "The Civil Servants Act, 1973 governs conduct, appointments, and terms for civil servants."
  }
];

function startQuiz() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  if (!name || !age) return alert("Please enter your name and age.");
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("quiz").classList.remove("hide");
  document.getElementById("welcome-message").textContent = `Welcome ${name}`;
  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    } else {
      document.getElementById("timer").textContent = `Time Left: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
      timeLeft--;
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  document.getElementById("explanation").textContent = "";
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.disabled = false;
    btn.style.backgroundColor = "#e0e0e0";
  });
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("prev-btn").style.display = currentQuestion > 0 ? "inline-block" : "none";
}

function selectAnswer(index) {
  const correct = questions[currentQuestion].answer;
  const explanation = questions[currentQuestion].explanation;
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    btn.style.backgroundColor = i === correct ? "#28a745" : (i === index ? "#dc3545" : "#e0e0e0");
  });
  if (index === correct) score++;
  document.getElementById("explanation").textContent = explanation;
  document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz").classList.add("hide");
  document.getElementById("result").classList.remove("hide");
  document.getElementById("score").textContent = `Your score: ${score} out of ${questions.length}`;
  document.getElementById("restart-btn").style.display = "inline-block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 300;
  document.getElementById("result").classList.add("hide");
  document.getElementById("start-screen").classList.remove("hide");
}
