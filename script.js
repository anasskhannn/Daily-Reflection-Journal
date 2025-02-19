const api_url = "https://api.allorigins.win/get?url=" + encodeURIComponent(`https://zenquotes.io/api/quotes/random?${new Date().getTime()}`);


async function fetchQuote() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        const parsedData = JSON.parse(data.contents); // API returns response inside 'contents'

        if (Array.isArray(parsedData) && parsedData.length > 0) {
            const quoteText = parsedData[0].q;
            const quoteAuthor = parsedData[0].a;

            document.getElementById("quote-text").innerText = `"${quoteText}"`;
            document.getElementById("quote-author").innerText = `- ${quoteAuthor}`;
        } else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        console.error("Error fetching quote:", error);
        document.getElementById("quote-text").innerText = `"Failed to load quote."`;
        document.getElementById("quote-author").innerText = "- Unknown";
    }
}

fetchQuote();
