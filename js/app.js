// Display Spinner
const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}
// Display search result
const toggleSearchResult = displayStyle => {
    document.getElementById("display-result").style.display = displayStyle;
}
// Display Phone Details function
const togglePhoneDetails = displayStyle => {
    document.getElementById("phone-details").style.display = displayStyle;
}
document.getElementById("error-message1").style.display = "none";
document.getElementById("error-message2").style.display = "none";
//search the phone
const searchPhone = async () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //clear search field
    searchField.value = "";
    if (searchText == "") {

        document.getElementById("error-message2").style.display = "none";
        document.getElementById("error-message1").style.display = "block";
        document.getElementById("search-result").textContent = "";
        document.getElementById("phone-details").textContent = "";
        toggleSpinner("none");
    }
    else {
        toggleSpinner("block");
        toggleSearchResult("none");
        togglePhoneDetails("none");
        document.getElementById("error-message1").style.display = "none";
        document.getElementById("error-message2").style.display = "none";

        //loading the data
        url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data.data);
        }
        catch (error) {
            toggleSearchResult(none);
            togglePhoneDetails(none);
        }
    }
}
// Search Result function
const displaySearchResult = phones => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    document.getElementById("phone-details").textContent = "";
    if (phones.length == 0) {
        document.getElementById("error-message2").style.display = "block";
    }
    else {
        if (phones.length >= 20 || phones.length < 20) {
            const slicedPhones = phones.slice(0, 20);
            document.getElementById("error-message2").style.display = "none";
            slicedPhones?.forEach(phone => {
                const div = document.createElement("div");
                div.classList.add("col");
                div.innerHTML = `
                <div class="card h-100 border-success">
                    <img src="${phone.image}" class="card-img-top w-75 mt-4" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">Phone-Name: ${phone.phone_name}</h5>
                        <h6 class="text-center"><span class="fw-bolder">Brand:</span> ${phone.brand}<//h6>
                        <button onclick="phoneDetail('${phone.slug}')" type="button" class="btn btn-success w-100 mt-3">Details</button>
                    </div>
                </div>
            `;
                searchResult.appendChild(div);
            });

        }
    };
    toggleSearchResult("block");
    toggleSpinner("none");

}
//display phone details
const phoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPhoneDetail(data.data);
    }
    catch (error) {
        toggleSearchResult(none);
        togglePhoneDetails(none);
    }
}
//display phones information
const displayPhoneDetail = phone => {
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    const div = document.createElement("div");
    if (phone.others) {
        div.innerHTML = `
        <div class="card border-success">
        <div class="w-50 my-3 mx-auto">
            <img src="${phone.image}" class="card-img-top w-75" alt="...">
        </div>
        <div class="card-body d-flex flex-column align-items-start">
            <h5 class="card-title fw-bolder">Phone Name: ${phone.name}</h5>
            <p class="card-text"><span class="fw-bolder">Brand: </span> ${phone.brand}</p>
            <p class="card-text"><span class="fw-bolder">storage: </span> ${phone.mainFeatures.storage}</p>
            <p class="card-text"><span class="fw-bolder">Display size: </span> ${phone.mainFeatures.displaySize}</p>
            <p class="card-text"><span class="fw-bolder">chipset: </span> ${phone.mainFeatures.chipSet}</p>
            <p class="card-text"><span class="fw-bolder">memory: </span> ${phone.mainFeatures.memory}</p>
            <p class="card-text"><span class="fw-bolder">sensors: </span> ${phone.mainFeatures.sensors}</p>
            <p class="card-text"><span class="fw-bolder">Release-date: </span> ${phone.releaseDate ? phone.releaseDate : "Not-found"}</p>
            <h6 class="card-title text-center">Others Information</h6>
            
            <p class="card-text">GPS: ${phone.others.GPS}</p>
            <p class="card-text">WLAN: ${phone.others.WLAN}</p>
            <p class="card-text">NFC: ${phone.others.NFC}</p>
            <p class="card-text">Radio: ${phone.others.Radio}</p>
            <p class="card-text">USB: ${phone.others.USB}</p>
            <p class="card-text">bluetooth: ${phone.others.Bluetooth}</p>
           
        </div>
        </div>
    `;
    }

    else {
        div.innerHTML = `
        <div class="card border-success">
        <div class="w-50 my-3 mx-auto">
            <img src="${phone.image}" class="card-img-top w-75" alt="...">
        </div>
        <div class="card-body d-flex flex-column align-items-start">
            <h5 class="card-title fw-bolder">Phone Name: ${phone.name}</h5>
            <p class="card-text"><span class="fw-bolder">Brand: </span> ${phone.brand}</p>
            <p class="card-text"><span class="fw-bolder">storage: </span> ${phone.mainFeatures.storage}</p>
            <p class="card-text"><span class="fw-bolder">Display size: </span> ${phone.mainFeatures.displaySize}</p>
            <p class="card-text"><span class="fw-bolder">chipset: </span> ${phone.mainFeatures.chipSet}</p>
            <p class="card-text"><span class="fw-bolder">memory: </span> ${phone.mainFeatures.memory}</p>
            <p class="card-text"><span class="fw-bolder">sensors: </span> ${phone.mainFeatures.sensors}</p>
            <p class="card-text"><span class="fw-bolder">Release-date: </span> ${phone.releaseDate ? phone.releaseDate : "Not-found"}</p>
            <h6 class="card-title text-center">Others Information not found</h6>
    `;
    }
    phoneDetails.appendChild(div);
    togglePhoneDetails("block");
}
