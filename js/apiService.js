export async function fetchQuote() {
    const api_url = "https://api.allorigins.win/get?url=" + encodeURIComponent(`https://zenquotes.io/api/quotes/random`);
    try {
        const response = await fetch(api_url, { cache: "no-store" });
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        const parsedData = JSON.parse(data.contents);

        if (Array.isArray(parsedData) && parsedData.length > 0) {
            const { q: quoteText, a: quoteAuthor } = parsedData[0];
            return { quoteText, quoteAuthor };
        } else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        console.error("Error fetching quote:", error);
        return { quoteText: "Failed to load quote.", quoteAuthor: "Unknown" };
    }
}