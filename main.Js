// ==============================
// StudyBuddy Mega Deluxe JS
// ==============================

// ------------------------------
// Variables & Initial Setup
// ------------------------------

// Current XP and pet happiness
let currentXP = 0;
let petHappiness = 50;
let petEnergy = 50;
let petHunger = 50;
let petCleanliness = 50;
let petTraining = 0;

// Selected pet and background
let selectedPet = "pet1.png";
let selectedBackground = "sunset";

// DOM Elements
const welcomeScreen = document.getElementById("welcome-screen");
const mainApp = document.getElementById("main-app");

const signInChoice = document.getElementById("sign-in-choice");
const logInChoice = document.getElementById("log-in-choice");

const signInForm = document.getElementById("sign-in-form");
const logInForm = document.getElementById("log-in-form");

const siSubmit = document.getElementById("si-submit");
const liSubmit = document.getElementById("li-submit");

const petImg = document.getElementById("pet");
const xpDisplay = document.getElementById("xp");
const xpFill = document.getElementById("xp-fill");
const petHappyDisplay = document.getElementById("pet-happy");

// Sections
const studySection = document.getElementById("study-section");
const calendarSection = document.getElementById("calendar-section");
const todoSection = document.getElementById("todo-section");
const notesSection = document.getElementById("notes-section");
const resourcesSection = document.getElementById("resources-section");
const achievementsSection = document.getElementById("achievements-section");
const petCareSection = document.getElementById("pet-care-section");

// Nav Buttons
const navButtons = document.querySelectorAll(".nav-button");

// Notification
const notification = document.getElementById("notification");

// ------------------------------
// Helper Functions
// ------------------------------

// Show notification
function showNotification(message) {
    notification.innerText = message;
    notification.style.opacity = "1";
    setTimeout(() => {
        notification.style.opacity = "0";
    }, 2500);
}

// Update XP
function updateXP(amount) {
    currentXP += amount;
    if (currentXP > 500) currentXP = 500;
    xpDisplay.innerText = currentXP;
    xpFill.style.width = `${(currentXP / 500) * 100}%`;
}

// Update Pet Happiness
function updatePetHappiness(amount) {
    petHappiness += amount;
    if (petHappiness > 100) petHappiness = 100;
    if (petHappiness < 0) petHappiness = 0;
    petHappyDisplay.innerText = petHappiness;
}

// Switch Section
function showSection(section) {
    const allSections = [
        studySection,
        calendarSection,
        todoSection,
        notesSection,
        resourcesSection,
        achievementsSection,
        petCareSection
    ];
    allSections.forEach(sec => sec.style.display = "none");
    section.style.display = "block";
}

// Change Background
function changeBackground(bg) {
    selectedBackground = bg;
    mainApp.style.backgroundImage = `url('backgrounds/${bg}.jpg')`;
    showNotification(`Background changed to ${bg}!`);
}

// ------------------------------
// Sign In / Log In
// ------------------------------

// Show Sign In Form
signInChoice.addEventListener("click", () => {
    signInForm.style.display = "block";
    logInForm.style.display = "none";
});

// Show Log In Form
logInChoice.addEventListener("click", () => {
    logInForm.style.display = "block";
    signInForm.style.display = "none";
});

// Handle Sign In
siSubmit.addEventListener("click", () => {
    const name = document.getElementById("si-username").value;
    const email = document.getElementById("si-email").value;
    const password = document.getElementById("si-password").value;
    if(name && email && password) {
        welcomeScreen.style.display = "none";
        mainApp.style.display = "block";
        showNotification(`Welcome, ${name}! Your study adventure begins!`);
        petImg.src = selectedPet;
    } else {
        showNotification("Please fill out all sign-in fields!");
    }
});

// Handle Log In
liSubmit.addEventListener("click", () => {
    const email = document.getElementById("li-email").value;
    const password = document.getElementById("li-password").value;
    if(email && password) {
        welcomeScreen.style.display = "none";
        mainApp.style.display = "block";
        showNotification("Welcome back! Your pet is excited to see you!");
        petImg.src = selectedPet;
    } else {
        showNotification("Please fill out all log-in fields!");
    }
});

// ------------------------------
// Pet Selection
// ------------------------------
const petOptions = document.querySelectorAll(".pet-option");
petOptions.forEach(pet => {
    pet.addEventListener("click", () => {
        selectedPet = pet.src;
        petImg.src = selectedPet;
        showNotification("Pet selected! 🐾");
    });
});

// ------------------------------
// Background Selection
// ------------------------------
const bgOptions = document.querySelectorAll(".bg-option");
bgOptions.forEach(bg => {
    bg.addEventListener("click", () => {
        changeBackground(bg.dataset.bg);
    });
});

// ------------------------------
// Navigation Buttons
// ------------------------------
navButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.id;
        switch(id) {
            case "study-hall": showSection(studySection); break;
            case "calendar": showSection(calendarSection); break;
            case "to-do-list": showSection(todoSection); break;
            case "notes": showSection(notesSection); break;
            case "resources": showSection(resourcesSection); break;
            case "achievements": showSection(achievementsSection); break;
            case "pet-care": showSection(petCareSection); break;
        }
    });
});

// ------------------------------
// Pet Actions
// ------------------------------
document.getElementById("feed-pet").addEventListener("click", () => {
    petHunger -= 10;
    if(petHunger < 0) petHunger = 0;
    updatePetHappiness(5);
    showNotification("You fed your pet! 🍎 Happiness +5");
});

document.getElementById("play-pet").addEventListener("click", () => {
    updatePetHappiness(10);
    petEnergy -= 5;
    showNotification("You played with your pet! 🧸 Happiness +10");
});

document.getElementById("teach-trick").addEventListener("click", () => {
    petTraining += 10;
    updatePetHappiness(5);
    showNotification("Your pet learned a new trick! 🎩");
});

document.getElementById("pet-sleep").addEventListener("click", () => {
    petEnergy = 100;
    showNotification("Pet is sleeping. Energy restored!");
});

document.getElementById("pet-walk").addEventListener("click", () => {
    updatePetHappiness(15);
    showNotification("You walked your pet! 🚶 Happiness +15");
});

// ------------------------------
// Study Hall - Flashcards Example
// ------------------------------
const studyAnswer = document.getElementById("study-answer");
document.getElementById("submit-answer").addEventListener("click", () => {
    const answer = studyAnswer.value.trim();
    if(answer === "4") {
        updateXP(10);
        updatePetHappiness(5);
        showNotification("Correct! XP +10, Pet Happiness +5");
    } else {
        showNotification("Try again!");
    }
    studyAnswer.value = "";
});

// ------------------------------
// Quiz Game Example
// ------------------------------
const quizOptions = document.querySelectorAll(".quiz-option");
quizOptions.forEach(opt => {
    opt.addEventListener("click", () => {
        if(opt.innerText === "Paris") {
            updateXP(10);
            updatePetHappiness(5);
            showNotification("Correct! XP +10, Pet Happiness +5");
        } else {
            showNotification("Oops! Try another option!");
        }
    });
});

// ------------------------------
// End of Part 1
// ------------------------------// ==============================
// StudyBuddy Mega Deluxe JS - Part 2
// Calendar, To-Do, Notes, Resources, Achievements, Pet Care
// ==============================

// ------------------------------
// Calendar Functionality
// ------------------------------
const calendarDays = document.querySelectorAll(".calendar-day");
const calendarTaskInput = document.getElementById("calendar-task-input");
const calendarTaskTime = document.getElementById("calendar-task-time");
const calendarTaskList = document.getElementById("calendar-task-list");

// Store tasks in an object with date keys
let calendarTasks = {};

// Click a date to view or add task
calendarDays.forEach(day => {
    day.addEventListener("click", () => {
        const date = day.dataset.date;
        if(!date) return; // skip empty cells
        calendarTaskInput.value = "";
        calendarTaskTime.value = "";
        showNotification(`Selected date: ${date}`);
        // Load tasks for this date
        renderCalendarTasks(date);
        // Store selected date
        calendarTaskList.dataset.selectedDate = date;
    });
});

// Add task button
document.getElementById("calendar-add-task").addEventListener("click", () => {
    const date = calendarTaskList.dataset.selectedDate;
    if(!date) {
        showNotification("Select a date first!");
        return;
    }
    const taskName = calendarTaskInput.value.trim();
    const taskTime = calendarTaskTime.value;
    if(taskName === "" || taskTime === "") {
        showNotification("Enter both task name and time!");
        return;
    }
    if(!calendarTasks[date]) calendarTasks[date] = [];
    calendarTasks[date].push({name: taskName, time: taskTime});
    renderCalendarTasks(date);
    showNotification(`Task added for day ${date}! 🎯`);
    updateXP(5); // small XP for planning
});

// Render tasks for a selected date
function renderCalendarTasks(date) {
    calendarTaskList.innerHTML = "";
    if(calendarTasks[date]) {
        calendarTasks[date].forEach((task, index) => {
            const li = document.createElement("li");
            li.innerText = `${task.time} - ${task.name}`;
            const delBtn = document.createElement("button");
            delBtn.innerText = "Delete";
            delBtn.addEventListener("click", () => {
                calendarTasks[date].splice(index,1);
                renderCalendarTasks(date);
                showNotification("Task deleted!");
            });
            li.appendChild(delBtn);
            calendarTaskList.appendChild(li);
        });
    }
}

// ------------------------------
// To-Do List Functionality
// ------------------------------
const todoInput = document.getElementById("todo-item-input");
const todoAddBtn = document.getElementById("todo-add-item");
const todoList = document.getElementById("todo-list");

todoAddBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if(task === "") {
        showNotification("Enter a task!");
        return;
    }
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `${task} <button class="todo-complete">Complete</button>`;
    todoList.appendChild(li);
    todoInput.value = "";
    showNotification("Task added!");
    updateXP(2);
    // Add event listener to the new button
    li.querySelector(".todo-complete").addEventListener("click", () => {
        li.remove();
        updateXP(5);
        updatePetHappiness(3);
        showNotification("Task completed! XP +5, Pet Happiness +3");
    });
});

// ------------------------------
// Notes Functionality
// ------------------------------
const noteInput = document.getElementById("note-input");
const addNoteBtn = document.getElementById("add-note");
const notesList = document.getElementById("notes-list");

addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if(noteText === "") {
        showNotification("Write something first!");
        return;
    }
    const li = document.createElement("li");
    li.classList.add("note-item");
    li.innerHTML = `${noteText} <button class="note-delete">Delete</button>`;
    notesList.appendChild(li);
    noteInput.value = "";
    showNotification("Note added!");
    updateXP(3);

    li.querySelector(".note-delete").addEventListener("click", () => {
        li.remove();
        showNotification("Note deleted!");
    });
});

// ------------------------------
// Resources Dynamic Video
// ------------------------------
const gradeButtons = document.querySelectorAll(".grade-btn");
const subjectButtons = document.querySelectorAll(".subject-btn");
const resourcesDisplay = document.getElementById("resources-display");

// Store currently selected grade and subject
let currentGrade = null;
let currentSubject = null;

gradeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentGrade = btn.dataset.grade;
        showNotification(`Grade ${currentGrade} selected`);
    });
});

subjectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentSubject = btn.dataset.subject;
        if(!currentGrade) {
            showNotification("Select a grade first!");
            return;
        }
        // Hide all resource cards
        const cards = resourcesDisplay.querySelectorAll(".resource-card");
        cards.forEach(card => card.style.display = "none");
        // Show only the card matching grade + subject (simplified for example)
        const selector = `${currentSubject}-video`;
        const matchingCard = resourcesDisplay.querySelector(`.${selector}`);
        if(matchingCard) matchingCard.style.display = "block";
        else {
            // fallback: just show first card
            cards[0].style.display = "block";
        }
        showNotification(`Subject ${currentSubject} loaded!`);
        updateXP(5);
    });
});

// ------------------------------
// Achievements Functionality
// ------------------------------
const achievementsList = document.getElementById("achievements-list");
let achievementsEarned = [];

function earnAchievement(name) {
    if(achievementsEarned.includes(name)) return;
    achievementsEarned.push(name);
    const li = document.createElement("li");
    li.innerText = name;
    achievementsList.appendChild(li);
    showNotification(`Achievement Unlocked: ${name} 🏆`);
    updateXP(10);
}

// Example triggers
document.getElementById("submit-answer").addEventListener("click", () => {
    if(studyAnswer.value.trim() === "4") earnAchievement("First Correct Flashcard");
});

// ------------------------------
// Pet Care Section Actions
// ------------------------------
document.getElementById("pet-bathe").addEventListener("click", () => {
    petCleanliness += 30;
    if(petCleanliness > 100) petCleanliness = 100;
    petEnergy += 10;
    if(petEnergy > 100) petEnergy = 100;
    showNotification("Pet bathed! Cleanliness +30, Energy +10");
});

document.getElementById("pet-feed").addEventListener("click", () => {
    petHunger -= 20;
    if(petHunger < 0) petHunger = 0;
    updatePetHappiness(5);
    showNotification("You fed your pet! Hunger -20, Happiness +5");
});

document.getElementById("pet-play").addEventListener("click", () => {
    updatePetHappiness(15);
    petEnergy -= 10;
    if(petEnergy < 0) petEnergy = 0;
    showNotification("Played with pet! Happiness +15, Energy -10");
});

document.getElementById("pet-sleep").addEventListener("click", () => {
    petEnergy = 100;
    showNotification("Pet slept. Energy restored to 100!");
});

document.getElementById("pet-walk").addEventListener("click", () => {
    updatePetHappiness(20);
    updateXP(5);
    showNotification("Pet went for a walk! Happiness +20, XP +5");
});

// ------------------------------
// Bonus Notifications
// ------------------------------
setInterval(() => {
    if(petHappiness < 30) showNotification("Your pet seems sad. Play or feed it!");
    if(petEnergy < 20) showNotification("Pet is tired. Let it sleep soon.");
}, 60000); // every 60 seconds

// ------------------------------
// End of JS - Mega Complete
// ==============================