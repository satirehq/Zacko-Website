document.addEventListener('DOMContentLoaded', () => {
    const transformButton = document.getElementById('transformButton');
    const restoreButton = document.getElementById('restoreButton');

    const textNodes = [];
    const originalTexts = [];

    // Function to recursively find all text nodes
    const getTextNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textNodes.push(node);
            originalTexts.push(node.textContent);
        } else {
            node.childNodes.forEach(getTextNodes);
        }
    };

    getTextNodes(document.body);

    // Function to gibberishify text based on specified rules
    const gibberishify = (text) => {
        let isFirstLetter = true; // Flag to track if it's the first letter of a sentence
        return text.split('').map((char, index, arr) => {
            // Check if it's the first letter of a sentence
            if (isFirstLetter && (index === 0 || /[.!?]\s+/.test(arr[index - 2]))) {
                isFirstLetter = false;
                return char.toUpperCase(); // Keep the first letter of a sentence uppercase
            }

            // 20% chance to change any letter
            if (Math.random() < 0.2) {
                // Check if it's a consonant and change it based on the provided alternatives
                if (/[bcdfghjklmnpqrstvwxyz]/i.test(char)) {
                    switch (char.toLowerCase()) {
                        case 'c':
                            return Math.random() < 0.5 ? 'c' : 'ck';
                        case 'f':
                            return Math.random() < 0.5 ? 'f' : 'ph';
                        case 'h':
                            return Math.random() < 0.5 ? 'h' : 'wh';
                        case 'j':
                            return 'g'; // Always change 'j' to 'g'
                        case 'k':
                            return 'c'; // Always change 'k' to 'c'
                        case 'm':
                            return Math.random() < 0.5 ? 'm' : 'nn';
                        case 'n':
                            return Math.random() < 0.5 ? 'n' : 'em';
                        case 'q':
                            return 'kw'; // Always change 'q' to 'kw'
                        case 's':
                            return 'z'; // Always change 's' to 'z'
                        case 't':
                            return 'd'; // Always change 't' to 'd'
                        case 'v':
                            return Math.random() < 0.5 ? 'v' : 'bb';
                        case 'w':
                            return 'wua'; // Always change 'w' to 'wua'
                        case 'x':
                            return 'ks'; // Always change 'x' to 'ks'
                        case 'y':
                            return 'i'; // Always change 'y' to 'i'
                        case 'z':
                            return 's'; // Always change 'z' to 's'
                        default:
                            return char;
                    }
                }
                // Change vowels to one of the provided alternatives based on the rules
                else if (/[aeiou]/i.test(char)) {
                    const alternatives = {
                        'a': ['e', 'i', 'o', 'u'],
                        'e': ['a', 'i', 'o', 'u'],
                        'i': ['a', 'e', 'o', 'u'],
                        'o': ['a', 'e', 'i', 'u'],
                        'u': ['a', 'e', 'i', 'o']
                    };
                    const randomVowel = alternatives[char.toLowerCase()];
                    return randomVowel[Math.floor(Math.random() * randomVowel.length)];
                }
            }

            // Default case: keep the original character
            return char;
        }).join('');
    };

    let transformClickCount = 0;

    // Update button label based on transformation count
    const updateButtonLabel = () => {
        switch (transformClickCount) {
            case 1:
                transformButton.textContent = '3 am simulator';
                break;
            case 2:
                transformButton.textContent = '4 am simulator';
                break;
            case 3:
                transformButton.textContent = '5 am simulator';
                break;
            default:
                transformButton.textContent = '????? simulator';
        }
    };

    // Event listener for transform button click
    transformButton.addEventListener('click', () => {
        transformClickCount++;
        textNodes.forEach((node, index) => {
            if (node.parentNode !== transformButton && node.parentNode !== restoreButton) {
                node.textContent = gibberishify(originalTexts[index]);
            }
        });
        updateButtonLabel();
        restoreButton.style.display = 'inline-block';
    });

    // Event listener for restore button click
    restoreButton.addEventListener('click', () => {
        textNodes.forEach((node, index) => {
            if (node.parentNode !== transformButton && node.parentNode !== restoreButton) {
                node.textContent = originalTexts[index];
            }
        });
        transformClickCount = 0; // Reset click count
        transformButton.textContent = '2 am simulator'; // Reset button label
        restoreButton.style.display = 'none';
    });
});