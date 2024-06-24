// Function to display the list of words
function updateWordList() {
    chrome.storage.local.get({words: []}, function(data) {
        const wordListDiv = document.getElementById('wordList');
        wordListDiv.innerHTML = ''; // Clear the current list
        data.words.forEach((word, index) => {
            const wordElement = document.createElement('div');
            wordElement.textContent = word;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteWord(index);
            };
            wordElement.appendChild(deleteButton);
            wordListDiv.appendChild(wordElement);
        });
    });
}

// Function to add a word
document.getElementById('addWord').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    chrome.storage.local.get({words: []}, function(data) {
        const words = data.words;
        words.push(word);
        chrome.storage.local.set({words: words}, function() {
            updateWordList(); // Update the list after adding
            document.getElementById('wordInput').value = ''; // Clear input field
        });
    });
});

// Function to get a random word
document.getElementById('getRandomWord').addEventListener('click', function() {
    chrome.storage.local.get({words: []}, function(data) {
        const words = data.words;
        if (words.length > 0) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            document.getElementById('randomWord').textContent = randomWord;
        } else {
            document.getElementById('randomWord').textContent = "No words added yet.";
        }
    });
});

// Function to delete a word
function deleteWord(index) {
    chrome.storage.local.get({words: []}, function(data) {
        let words = data.words;
        words.splice(index, 1); // Remove the word at the specified index
        chrome.storage.local.set({words: words}, function() {
            updateWordList(); // Update the list after deletion
        });
    });
}

// Initial list update when popup is opened
document.addEventListener('DOMContentLoaded', updateWordList);
