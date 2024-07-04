document.addEventListener('DOMContentLoaded', function() {

    const defaultImage = 'https://s3-alpha-sig.figma.com/img/d636/7d6d/f34ce14e7187edeeb026d73413e4a29c?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZodDcY2kA0Ni06gad~zdgxR7wFAFtlfm-FU-mw-eLZTbXt43ZX9HifCQez2EY-UWilImSyTcz95Po9lemBNkPk-dY4AtcncHPEvB5hDRieK~qY-fiKWw5L80YNQo~9iu-JrYX~KlN1-gzHY9GpfI1MF0mDsygyZ3t0RHnQiBY-UwpPKir~QHnC4~1Y1CckIfhk9Jy4BnVB~yutTVd7xTrlpMl~LyDJ2X2p3isa~h7wl63zOONAdfs2BxtX1pVB~3hYKgjYR1KmseIaauFj3J2vAZw3zOykZ5p08lDFt64XB6wnOgz1f9pQA8Di8jGfEfHdwBg~mYZuoKojGOm~nNjw__';

    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
        .then(response => response.json())
        .then(data => {
            // Populate product details
            document.getElementById('marmeto').innerText = data.product.vendor;
            document.getElementById('embrace').innerText = data.product.title;
            document.getElementById('dis-price').innerText = data.product.price;
            document.getElementById('org-price').innerText = data.product.compare_at_price;
            document.getElementById('description').innerHTML = data.product.description;

            // Populate main image
            const mainImageElement = document.querySelector('#main-image img');
            if (mainImageElement) {
                mainImageElement.src = data.product.images[0].src;
                mainImageElement.alt = data.product.title;
                mainImageElement.onerror = function() {
                    mainImageElement.src = defaultImage;
                };
            }

            // Populate other images
            const otherImagesContainer = document.getElementById('other-images');
            if (otherImagesContainer) {
                data.product.images.slice(1).forEach(imageObj => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageObj.src;
                    imgElement.alt = data.product.title;
                    imgElement.classList.add('product-thumbnail'); // Add a class for styling if needed
                    otherImagesContainer.appendChild(imgElement);
                    imgElement.onerror = function() {
                        imgElement.src = defaultImage;
                    };
                });
            }

            // Populate color options
            const colorOptionsContainer = document.getElementById('container-box');
            const colorOption = data.product.options.find(option => option.name === 'Color');
            if (colorOption) {
                colorOption.values.forEach(color => {
                    const colorBox = document.createElement('div');
                    colorBox.classList.add('color-box');
                    colorBox.style.backgroundColor = Object.values(color)[0]; // Get the color value from the object
                    colorOptionsContainer.appendChild(colorBox);
                });
            }

            // Populate size options
            const sizeOptionsContainer = document.getElementById('size-options');
            const sizeOption = data.product.options.find(option => option.name === 'Size');
            if (sizeOption) {
                sizeOption.values.forEach(size => {
                    const sizeButton = document.createElement('button');
                    sizeButton.classList.add('radio-button');
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'size';
                    input.value = size.toLowerCase().replace(' ', '-');
                    input.id = size.toLowerCase().replace(' ', '-');
                    const label = document.createElement('label');
                    label.setAttribute('for', input.id);
                    label.textContent = size;
                    sizeButton.appendChild(input);
                    sizeButton.appendChild(label);
                    sizeOptionsContainer.appendChild(sizeButton);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Quantity control logic
    const quantityElement = document.getElementById('quantity');
    let quantity = 1;

    document.getElementById('decrease-quantity').addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityElement.innerText = quantity;
        }
    });

    document.getElementById('increase-quantity').addEventListener('click', function() {
        quantity++;
        quantityElement.innerText = quantity;
    });

    document.getElementById('add-to-cart-button').onclick = function() {
        alert("Item added to the cart! Quantity: " + quantity);
        console.log("Item added to the cart! Quantity:", quantity);
    }
});
