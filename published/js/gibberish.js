let originalTexts = {};
let gibberishTurned = false;
let clickCounts = {};

document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to buttons
    document.getElementById('gibberishButton').addEventListener('click', turnToGibberish);
    document.getElementById('resetText').addEventListener('click', resetText);

        // Stores original text from left, middle and right containers
        let leftContainer = document.querySelector('.left-container');
        originalTexts['left-container'] = leftContainer.innerHTML;
    
        let middleContainer = document.querySelector('.middle-container');
        originalTexts['middle-container'] = middleContainer.innerHTML;

        let rightContainer = document.querySelector('.right-container');
        originalTexts['right-container'] = rightContainer.innerHTML;
});

function turnToGibberish() {
    document.querySelectorAll('.text').forEach(textElement => {
        let textId = textElement.id;
        if (!originalTexts[textId]) {
            originalTexts[textId] = textElement.textContent;
            clickCounts[textId] = 0;
        }

        let text = textElement.textContent;
        let gibberishText = '';

        const vowels = { 'a': ['e', 'i', 'o', 'u'], 'e': ['a', 'i', 'o', 'u'], 'i': ['a', 'e', 'o', 'u'], 'o': ['a', 'e', 'i', 'u'], 'u': ['a', 'e', 'i', 'o'] };

        const consonantMap = new Map([
            ['c', 'ck'],
            ['f', 'ph'],
            ['h', 'wh'],
            ['j', 'g'],
            ['k', 'c'],
            ['m', 'nn'],
            ['n', 'em'],
            ['q', 'kw'],
            ['s', 'z'],
            ['t', 'd'],
            ['v', 'bb'],
            ['w', 'wua'],
            ['x', 'ks'],
            ['y', 'i'],
            ['z', 's'],
        ]);

        for (let i = 0; i < text.length; i++) {
            let char = text[i].toLowerCase();
            if (char.match(/[a-z]/)) { // If a character is a letter
                if (i % 2 === 0) {
                    gibberishText += text[i]; // Keeps every third letter unchanged
                } else {
                    if (vowels[char]) {
                        let randomVowel = vowels[char][Math.floor(Math.random() * vowels[char].length)];
                        gibberishText += char === char.toUpperCase() ? randomVowel.toUpperCase() : randomVowel;
                    } else if (Math.random() < 0.1) { // Swaps random consonant letters at a probability of 20%
                        let randomConsonant = consonantMap.get(char) || char;
                        gibberishText += char === char.toUpperCase() ? randomConsonant.toUpperCase() : randomConsonant;
                    } else if (Math.random() < 0.025) { // Duplicates (some) letters at a probability of 2.5%
                        gibberishText += text[i] + text[i];
                    } else {
                        gibberishText += text[i]; // Keeps untargeted vowels or consonants unchanged
                    }
                }
            } else {
                gibberishText += text[i]; // Keeps numbers and symbols unaffected
            }
        }

        textElement.textContent = gibberishText;
        clickCounts[textId]++;
        if (clickCounts[textId] === 1) {
            document.getElementById('gibberishButton').textContent = '3 AM simulator';
        }else if (clickCounts[textId] === 2) {
            document.getElementById('gibberishButton').textContent = '4 simulator';
        }else if (clickCounts[textId] === 3) {
            document.getElementById('gibberishButton').textContent = '?????? simulator';
        }
    });

    // Shows the reset button after the first application of turning text into gibberish
    if (!gibberishTurned) {
        document.getElementById('resetText').style.display = 'inline-block';
        gibberishTurned = true;
    }
}

function resetText() {
    document.querySelectorAll('.text').forEach(textElement => {
        let textId = textElement.id;
        if (originalTexts[textId]) {
            textElement.textContent = originalTexts[textId];
            clickCounts[textId] = 0; // Reset click count for the text element
        }
    });
    
        // Resets text to normal from left, middle and right containers
        // Also prevents the middle container from changing size and bodies of text being switched around after the 'resetButton' is applied
        let leftContainer = document.querySelector('.left-container');
        leftContainer.innerHTML = originalTexts['left-container'];

        let middleContainer = document.querySelector('.middle-container');
        middleContainer.innerHTML = originalTexts['middle-container'];

        let rightContainer = document.querySelector('.right-container');
        rightContainer.innerHTML = originalTexts['right-container'];
    
    // Hides the reset button after resetting the text
    document.getElementById('resetText').style.display = 'none';
    gibberishTurned = false;
    document.getElementById('gibberishButton').textContent = '2 AM simulator';
}