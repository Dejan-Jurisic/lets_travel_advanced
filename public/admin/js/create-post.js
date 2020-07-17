let createForm = document.querySelector('.create-post-form'),
    createTitle = document.querySelector('#create-title'),
    createCountry = document.querySelector('#create-country'),
    createImageUrl = document.querySelector('#create-image-url'),
    createText = document.querySelector('#create-text');

createForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let text = createText.value;
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: createTitle.value,
            country: createCountry.value,
            imageUrl: createImageUrl.value,
            text: text,
            description: text.substring(0, text.indexOf('.') + 1)
        })
    }).then((response) => response.text()).then((data) => window.history.go());
})