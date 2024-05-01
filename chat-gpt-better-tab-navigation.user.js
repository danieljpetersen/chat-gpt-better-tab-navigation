// ==UserScript==
// @name         ChatGPT Better Tab Navigation
// @version      1.0
// @description  Enhances Tab navigation in ChatGPT interface
// @author       Daniel J. Petersen
// @match        https://chat.openai.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();

            const promptTextarea = document.querySelector('#prompt-textarea');
            const copyCodeButtons = Array.from(document.querySelectorAll('button')).filter(button => button.textContent.includes('Copy code'));

            const focusedElement = document.activeElement;
            const focusedIndex = copyCodeButtons.indexOf(focusedElement);

            if (focusedElement === promptTextarea) {
                // If focus is on the prompt, move to the last 'Copy code' button
                if (copyCodeButtons.length > 0) {
                    copyCodeButtons[copyCodeButtons.length - 1].focus();
                }
            } else if (copyCodeButtons.includes(focusedElement)) {
                // If focus is on a 'Copy code' button
                if (e.shiftKey && focusedIndex > 0) {
                    // Move focus to the previous button if Shift+Tab
                    copyCodeButtons[focusedIndex - 1].focus();
                } else if (!e.shiftKey && focusedIndex === copyCodeButtons.length - 1) {
                    // Move focus to the prompt if Tab on the last button
                    promptTextarea.focus();
                } else if (!e.shiftKey) {
                    // Move focus to the next button if Tab
                    copyCodeButtons[focusedIndex + 1].focus();
                }
            } else {
                // Default fallback if focus is elsewhere, focus the prompt
                promptTextarea.focus();
            }
        }
    }, true);
})();
