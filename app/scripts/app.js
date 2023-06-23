const baseImageUrl = 'app/res/images/';
fetch('app/scripts/products.json')
    .then(response => response.json())
    .then(data => {
        const gridContainer = document.getElementById('productGrid');
        const currencySelector = document.getElementById('currencySelector');
        const baseCurrency = 'INR';
        let selectedCurrency = currencySelector.value;

        currencySelector.addEventListener('change', function() {
            selectedCurrency = currencySelector.value;
            updatePrices(selectedCurrency);
        });

        function updatePrices(currency) {
            const currencySymbol = getCurrencySymbol(currency);

            data.forEach(product => {
                const priceElement = document.getElementById(`price_${product.id}`);
                const convertedPrice = convertCurrency(product.price, currency);
                const basePrice = convertCurrency(convertedPrice, baseCurrency);
                priceElement.textContent = currencySymbol + basePrice.toFixed(2);
            });
        }

        function convertCurrency(price, currency) {
            if (currency === 'INR') {
                return price * 1;
            } else if (currency === 'USD') {
                return price * 0.012;
            } else if (currency === 'EUR') {
                return price * 0.011; // Conversion rate from USD to EUR
            } else if (currency === 'GBP') {
                return price * 0.0095; // Conversion rate from USD to GBP
            }
        }

        function getCurrencySymbol(currency) {
            if (currency === 'INR') {
                return '₹';
            } else if (currency === 'USD') {
                return '$';
            } else if (currency === 'EUR') {
                return '€';
            } else if (currency === 'GBP') {
                return '£';
            }
        }
        data.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            const image = document.createElement('img');
            image.src = baseImageUrl + product.image;
            image.loading = 'lazy';
            image.srcset = `${baseImageUrl}${product.image} 1x, ${baseImageUrl}${product.image.replace('.jpg', '_2x.jpg')} 2x`;

            imageContainer.appendChild(image);
            const favoriteButton = document.createElement('i');
            favoriteButton.className = 'favorite-button';
            favoriteButton.className = "ri-add-line like"

            const name = document.createElement('h3');
            name.textContent = product.name;

            const price = document.createElement('p');
            price.id = `price_${product.id}`;
            price.textContent = getCurrencySymbol(selectedCurrency) + convertCurrency(product.price, selectedCurrency);

            card.appendChild(imageContainer);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(favoriteButton);

            card.addEventListener('click', () => {
                window.open('pages/product.html?id=' + product.id, '_top');
            });
            gridContainer.appendChild(card);
        });
    });
const search = () => {
    const searchBox = document.querySelector(".input").value.toUpperCase();
    const searchBox1 = document.querySelector(".input-m").value.toUpperCase();
    const storeItems = document.querySelector('.grid-container');
    const item = document.querySelectorAll('.card');
    const pname = storeItems.getElementsByTagName("h3");
    for (var i = 0; i < pname.length; i++) {
        let match = item[i].getElementsByTagName("h3")[0];
        if (match) {
            let textValue = match.textContent || match.innerHTML;
            if (textValue.toUpperCase().indexOf(searchBox) > -1 & textValue.toUpperCase().indexOf(searchBox1) > -1) {
                item[i].style.display = "";
                console.log("item[i]")
            } else {
                item[i].style.display = "none";
            }
        }
    }
}
const navbarPlaceholder = document.querySelector('.c-nav');
const xhr = new XMLHttpRequest();
xhr.open('GET', '/pages/base.html', true);

xhr.onload = function() {
    if (xhr.status === 200) {
        navbarPlaceholder.innerHTML = xhr.responseText;
    }
};
xhr.send();