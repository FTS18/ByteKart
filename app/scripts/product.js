baseImageUrl = '../app/res/images/'; // Set your base image URL here

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('../app/scripts/products.json')
    .then(response => response.json())
    .then(data => {
        const product = data.find(item => String(item.id) === String(productId));

        if (product) {
            const productDetailsContainer = document.getElementById('productDetails');

            const card = document.createElement('div');
            card.className = 'product-container';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'p-image-container';

            const details = document.createElement('div');
            details.className = 'product-details';

            const image = document.createElement('img');
            image.src = baseImageUrl + product.image;
            image.loading = 'lazy';
            image.srcset = `${baseImageUrl}${product.image} 1x, ${baseImageUrl}${product.image.replace('.jpg', '_2x.jpg')} 2x`;

            imageContainer.appendChild(image);

            const nameDiv = document.createElement('div');
            nameDiv.className = 'product-name';
            nameDiv.textContent = product.name;

            const priceDiv = document.createElement('div');
            priceDiv.className = 'product-price';
            priceDiv.textContent = '$' + product.price;

            const descDiv = document.createElement('div');
            descDiv.className = 'product-description';
            descDiv.textContent = product.description;
            details.appendChild(nameDiv);
            details.appendChild(descDiv);
            details.appendChild(priceDiv);
            card.appendChild(details);
            card.appendChild(imageContainer);

            productDetailsContainer.appendChild(card);
        } else {
            console.error('Product not found');
        }
    });