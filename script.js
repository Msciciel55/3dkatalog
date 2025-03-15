document.addEventListener('DOMContentLoaded', () => {
    const modelGrid = document.querySelector('.model-grid');
    const modelViewer = document.getElementById('model-viewer');
    const closeViewer = document.getElementById('close-viewer');
    const modelViewerElement = modelViewer.querySelector('model-viewer');
    const categoryButtons = document.querySelectorAll('.category-button');

    // URL do pliku JSON na GitHubie
    const jsonUrl = 'https://raw.githubusercontent.com/Msciciel55/3dkatalog/refs/heads/main/dane.json';

    let models = [];

    // Funkcja do pobierania danych JSON
    async function fetchModels() {
        try {
            const response = await fetch(jsonUrl);
            models = await response.json();
            displayModels(models);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
    }

    // Funkcja do wyświetlania modeli
    function displayModels(modelsToDisplay) {
        modelGrid.innerHTML = ''; // Czyści istniejące karty
        modelsToDisplay.forEach(model => {
            const card = document.createElement('div');
            card.classList.add('model-card');
            card.setAttribute('data-model', model.model);

            const img = document.createElement('img');
            img.src = model.thumbnail;
            img.alt = model.title;

            const title = document.createElement('h2');
            title.textContent = model.title;

            card.appendChild(img);
            card.appendChild(title);
            modelGrid.appendChild(card);

            card.addEventListener('click', () => {
                modelViewerElement.setAttribute('src', model.model);
                modelViewer.style.display = 'flex';
            });
        });
    }

    // Pobierz i wyświetl modele
    fetchModels();

    // Dodaj obsługę kliknięcia przycisków kategorii
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            if (category === 'all') {
                displayModels(models);
            } else {
                const filteredModels = models.filter(model => model.category === category);
                displayModels(filteredModels);
            }
        });
    });

    closeViewer.addEventListener('click', () => {
        modelViewer.style.display = 'none';
    });
});
