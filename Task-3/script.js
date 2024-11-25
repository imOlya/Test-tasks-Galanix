document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const countryInput = document.getElementById("country-input");
    const resultsContainer = document.getElementById("results-container");
    const resetButton = document.getElementById("reset-button");

    // Функція для створення таблиці
    const createTable = (data) => {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Заголовки таблиці
        const headers = ["#", "Name", "Country", "Website"];
        const headerRow = document.createElement("tr");
        headers.forEach((header) => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Рядки таблиці
        data.forEach((university, index) => {
            const row = document.createElement("tr");

            // Колонка #
            const numberCell = document.createElement("td");
            numberCell.textContent = index + 1;
            row.appendChild(numberCell);

            // Колонка Name
            const nameCell = document.createElement("td");
            nameCell.textContent = university.name;
            row.appendChild(nameCell);

            // Колонка Country
            const countryCell = document.createElement("td");
            countryCell.textContent = university.country;
            row.appendChild(countryCell);

            // Колонка Website
            const websiteCell = document.createElement("td");
            const link = document.createElement("a");
            link.href = university.web_pages[0];
            link.textContent = university.web_pages[0];
            link.target = "_blank";
            websiteCell.appendChild(link);
            row.appendChild(websiteCell);

            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    };

    // Пошук університетів
    const searchUniversities = async (country) => {
        try {
            const response = await fetch(
                `http://universities.hipolabs.com/search?country=${country}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            const data = await response.json();
            if (data.length === 0) {
                resultsContainer.innerHTML = `<p>No universities found for "${country}".</p>`;
            } else {
                const table = createTable(data);
                resultsContainer.innerHTML = ""; // Очищення перед додаванням
                resultsContainer.appendChild(table);
            }
        } catch (error) {
            resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    };

    // Обробка форми
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const country = countryInput.value.trim();
        if (country) {
            searchUniversities(country);
        }
    });

    // Скидання форми
    resetButton.addEventListener("click", () => {
        countryInput.value = "";
        resultsContainer.innerHTML = "";
    });
});
