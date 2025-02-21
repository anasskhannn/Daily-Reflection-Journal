import { fetchQuote } from './apiService.js';

async function updateQuote() {
    const { quoteText, quoteAuthor } = await fetchQuote();
    document.getElementById("quote-text").innerText = `"${quoteText}"`;
    document.getElementById("quote-author").innerText = `- ${quoteAuthor}`;
}

document.addEventListener('DOMContentLoaded', updateQuote);

document.getElementById("download-btn").addEventListener("click", () => {
    window.print();
});