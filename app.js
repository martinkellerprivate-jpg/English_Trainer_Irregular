// Test verbs (sample data within app.js)
const verbs = [
    { deutschesVerb: "gehen", baseForm: "go", simplePast: "went", pastParticiple: "gone" },
    { deutschesVerb: "sehen", baseForm: "see", simplePast: "saw", pastParticiple: "seen" },
    { deutschesVerb: "essen", baseForm: "eat", simplePast: "ate", pastParticiple: "eaten" },
    { deutschesVerb: "schreiben", baseForm: "write", simplePast: "wrote", pastParticiple: "written" },
    { deutschesVerb: "nehmen", baseForm: "take", simplePast: "took", pastParticiple: "taken" }
];

// Variables to track the current verb
let currentVerbIndex = 0;

// DOM Elements
const deutschesVerbElement = document.querySelector(".training-verb");
const baseFormInput = document.querySelector("#base-form");
const simplePastInput = document.querySelector("#simple-past");
const pastParticipleInput = document.querySelector("#past-participle");
const feedbackContainer = document.querySelector("#feedback-container");
const checkButton = document.querySelector(".primary-button");
const nextButton = document.querySelector(".secondary-button");

// Helper function to sanitize input
const sanitizeInput = (input) => input.trim().toLowerCase();

// Function to display the current verb
function displayCurrentVerb() {
    const currentVerb = verbs[currentVerbIndex];
    deutschesVerbElement.textContent = currentVerb.deutschesVerb;
}

// Function to check the answers
function checkAnswers() {
    const currentVerb = verbs[currentVerbIndex];
    const userBaseForm = sanitizeInput(baseFormInput.value);
    const userSimplePast = sanitizeInput(simplePastInput.value);
    const userPastParticiple = sanitizeInput(pastParticipleInput.value);

    let allCorrect = true;
    feedbackContainer.innerHTML = ""; // Clear previous feedback

    // Check each form
    if (userBaseForm === currentVerb.baseForm) {
        baseFormInput.classList.add("correct");
    } else {
        baseFormInput.classList.add("wrong");
        allCorrect = false;
    }

    if (userSimplePast === currentVerb.simplePast) {
        simplePastInput.classList.add("correct");
    } else {
        simplePastInput.classList.add("wrong");
        allCorrect = false;
    }

    if (userPastParticiple === currentVerb.pastParticiple) {
        pastParticipleInput.classList.add("correct");
    } else {
        pastParticipleInput.classList.add("wrong");
        allCorrect = false;
    }

    // Display feedback
    if (allCorrect) {
        feedbackContainer.textContent = "Richtig!";
        feedbackContainer.classList.add("success");
    } else {
        feedbackContainer.innerHTML = `Falsch! Die korrekten Formen sind:<br>\n            Base Form: ${currentVerb.baseForm}<br>\n            Simple Past: ${currentVerb.simplePast}<br>\n            Past Participle: ${currentVerb.pastParticiple}`;
        feedbackContainer.classList.add("error");
    }
}

// Function to load the next verb
function loadNextVerb() {
    currentVerbIndex = (currentVerbIndex + 1) % verbs.length; // Cycle to the next verb
    displayCurrentVerb();

    // Clear inputs and reset styles
    baseFormInput.value = "";
    simplePastInput.value = "";
    pastParticipleInput.value = "";
    baseFormInput.classList.remove("correct", "wrong");
    simplePastInput.classList.remove("correct", "wrong");
    pastParticipleInput.classList.remove("correct", "wrong");
    feedbackContainer.innerHTML = "";
    feedbackContainer.classList.remove("success", "error");
}

// Event listeners
checkButton.addEventListener("click", checkAnswers);
nextButton.addEventListener("click", loadNextVerb);

// Handle Enter key for input submission
[baseFormInput, simplePastInput, pastParticipleInput].forEach(input => {
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkAnswers();
        }
    });
});

// Initialize the app
window.onload = displayCurrentVerb;