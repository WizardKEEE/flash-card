const state = {
    numCards: 0,
    currentIndex: 0,
    flashcards: []
};

const setupContainer = document.getElementById('setup-container');
const formContainer = document.getElementById('form-container');
const flashcardContainer = document.getElementById('flashcard-container');
const flashcardForms = document.getElementById('flashcard-froms');
const flashcardDisplay = document.getElementById('flashcard-display');
const currentCardSpan = document.getElementById('current-card');
const totalCardsSpan = document.getElementById('total-cards');

document.getElementById('start-btn').addEventListener('click', startCreatingCards);
document.getElementById('save-btn').addEventListener('click', saveFlashcards);
document.getElementById('prev-btn').addEventListener('click', showPreviousCard);
document.getElementById('next-btn').addEventListener('click', showNextCard);
document.getElementById('flip-btn').addEventListener('click', flipCurrentCard);
document.getElementById('restart-btn').addEventListener('click', restartApp);
document.getElementById('shuffle-btn').addEventListener('click', shuffleCards);

function startCreatingCards(){
    state.numCards = parseInt(document.getElementById('num-cards').value);

    if(isNaN(state.numCards) || state.numCards < 1){
        alert('Please enter a valid number of flashcards.');
        return;
    }

    flashcardForms.innerHTML = '';

    for(let i = 0; i < state.numCards; i++){
        const formHtml = `
            <div class="flashcard-from">
                <h3>Flashcard ${i + 1}</h3>
                <div class="input-group">
                    <label for="question-${i}">Question:</label>
                    <textarea id="question-${i}" rows="3" required></textarea>
                </div>
                <div class="input-group">
                    <label for="answer-${i}">Answer:</label>
                    <textarea id="answer-${i}" rows="3" required></textarea>
                </div>
            </div>
        `;

        flashcardForms.innerHTML += formHtml;
    }

    setupContainer.classList.add('hidden');
    formContainer.classList.remove('hidden');
}

function saveFlashcards(){
    state.flashcards = [];
    let isValid = true;
    for(let i = 0; i < state.numCards; i++){
        const question = document.getElementById(`question-${i}`).value.trim();
        const answer = document.getElementById(`answer-${i}`).value.trim();

        if(!question || !answer){
            isValid = false;
            alert(`Please fill in both question and answer for Flashcard ${i + 1}`);
            break;
        }

        state.flashcards.push({question, answer});
    }
    if(isValid){
        state.currentIndex = 0;
        displayFlashcards();
        formContainer.classList.add('hidden');
        flashcardContainer.classList.remove('hidden');
        updateCardCounter();
    }
}

function displayFlashcards(){
    if(state.flashcards.length === 0) return;

    const card = state.flashcards[state.currentIndex];

    flashcardDisplay.innerHTML = `
        <div class="flashcard" id="current-flashcard">
            <div class="flashcard-front">
                <p>${card.question}</p>
            </div>
            <div class="flashcard-back">
                <p>${card.answer}</p>
            </div>
        </div>
    `;

    document.getElementById('current-flashcard').addEventListener('click', flipCurrentCard);
}

function showPreviousCard(){
    if(state.currentIndex > 0){
        state.currentIndex--;
        displayFlashcards();
        updateCardCounter();
    }
}

function showNextCard(){
    if(state.currentIndex < state.flashcards.length - 1){
        state.currentIndex++;
        displayFlashcards();
        updateCardCounter();
    }
}

function flipCurrentCard(){
    const flashcard = document.getElementById('current-flashcard');
    flashcard.classList.toggle('flipped');
}

function updateCardCounter(){
    currentCardSpan.textContent = state.currentIndex + 1;

    totalCardsSpan.textContent = state.flashcards.length;
}

function restartApp(){
    state.currentIndex = 0;

    flashcardContainer.classList.add('hidden');

    setupContainer.classList.remove('hidden');
}

function shuffleCards(){
    for(let i = state.flashcards.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [state.flashcards[i], state.flashcards[j]] = [state.flashcards[j], state.flashcards[i]];
    }
    state.currentIndex = 0;
    displayFlashcards();
    updateCardCounter();
}