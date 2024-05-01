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
            const copyTextButtons = Array.from(document.querySelectorAll('.copy-text-btn'));
            const allButtons = [...copyCodeButtons, ...copyTextButtons].sort((a, b) => {
                const rectA = a.getBoundingClientRect();
                const rectB = b.getBoundingClientRect();
                return rectA.top - rectB.top;
            });

            const focusedElement = document.activeElement;
            const focusedIndex = allButtons.indexOf(focusedElement);

            if (focusedElement === promptTextarea) {
                if (allButtons.length > 0) {
                    allButtons[allButtons.length - 1].focus();
                }
            } else if (allButtons.includes(focusedElement)) {
                let nextIndex = e.shiftKey ? focusedIndex - 1 : focusedIndex + 1;
                if (nextIndex >= 0 && nextIndex < allButtons.length) {
                    allButtons[nextIndex].focus();
                } else if (!e.shiftKey && nextIndex >= allButtons.length) {
                    promptTextarea.focus();
                } else if (e.shiftKey && focusedIndex === 0) {
                    promptTextarea.focus();
                }
            }
        }
    }, true);

    function addCopyButtons() {
        const messages = document.querySelectorAll('[data-message-author-role="assistant"]');

        messages.forEach(message => {
            if (!message.querySelector('.copy-text-btn')) {
                let btn = document.createElement('button');
                btn.textContent = 'Copy Text';
                btn.className = 'copy-text-btn';
                btn.style.cssText = 'position: absolute; top: 0; right: 0; margin-top: -35px; padding: 4px 8px; border: 1px solid black; border-radius: 5px; background-color: #FFFFFF; cursor: pointer;';
                btn.onclick = () => {
                    navigator.clipboard.writeText(message.textContent.trim());
                    alert('Message copied to clipboard!');
                };

                if (message.firstChild) {
                    message.insertBefore(btn, message.firstChild);
                } else {
                    message.appendChild(btn);
                }
            }
        });
    }

    setInterval(addCopyButtons, 1000);
})();
