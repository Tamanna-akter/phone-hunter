document.getElementById('error-message1').style.display = 'none';
document.getElementById('error-message2').style.display = 'none';

// load data
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        document.getElementById('error-message1').style.display = 'block';
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.phones))
    }
}
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    //console.log('phones');
    if (phones.length == 0) {
        document.getElementById('error-message2').style.display = 'block';
    }
    else {
        if (phones.length >= 20) {
            const slicedPhones = phones.slice(0, 20);
            //console.log(slicedItems);
            document.getElementById('error-message').style.display = 'none';
            slicedPhones?.forEach(phone => {
                const div = document.createElement("div");
                div.classList.add("col");
                div.innerHTML = `
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Title: ${phone.phone_name}</h5>
                        <p>Brand: ${phone.brand}</p>
                        <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary"> Details</button>
                    </div>
                </div>
            `;
                searchResult.appendChild(div);
            });
        }
    }
};
