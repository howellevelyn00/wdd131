const hotels = ["Grand Hyatt", "Hilton Garden", "Marriott Plaza", "Holiday Inn", "Hyatt Regency"];

function searchHotels(input) {
    if (!input) return [];
    return hotels.filter(hotel => hotel.toLowerCase().includes(input.toLowerCase()));
}

function renderResults(results, container) {
    container.innerHTML = '';
    if (!results || results.length === 0) {
        container.textContent = 'No hotels found.';
        return;
    }
    const ul = document.createElement('ul');
    results.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const input = document.getElementById('hotel-search');
    const results = document.getElementById('search-results');

    if (!form || !input || !results) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = input.value.trim();
        const matches = searchHotels(q);
        renderResults(matches, results);
    });
});