document.getElementById('firstLetter').addEventListener('input', function() {
    const firstLetterInput = document.getElementById('firstLetter');
    const firstLetter = firstLetterInput.value.trim().toLowerCase(); // Получаем введенную букву и преобразуем в нижний регистр
    const cocktailContainer = document.getElementById('cocktailContainer');

    // Проверяем, что введена только одна буква
    if (firstLetter.length === 1) {
        // Выполняем запрос к API с введенной буквой
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
        .then(res => res.json())
        .then(data => {
            // Перебираем коктейли и добавляем названия и картинки в контейнер
            if (data.drinks) {
                data.drinks.forEach(cocktail => {
                    const cocktailBlock = document.createElement('div');
                    cocktailBlock.classList.add('cocktail-block');

                    const img = document.createElement('img');
                    const p = document.createElement('p');

                    if (cocktail.strDrinkThumb) {
                        img.src = cocktail.strDrinkThumb;
                        img.alt = cocktail.strDrink;
                        cocktailBlock.appendChild(img);
                    }

                    p.textContent = cocktail.strDrink;
                    cocktailBlock.appendChild(p);
                    cocktailContainer.appendChild(cocktailBlock);
                });
            } else {
                const p = document.createElement('p');
                p.textContent = 'No cocktails found';
                cocktailContainer.appendChild(p);
            }
        })
        .catch(error => console.log(error));
    } else {
        // Если введено несколько букв или ничего не введено, очищаем контейнер
        cocktailContainer.innerHTML = '';
    }
});
