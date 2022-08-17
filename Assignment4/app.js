function userSearch() {
    var countryName = document.getElementById("userInput").value;
    fetch("https://api.covid19api.com/summary")
        .then((res1) => res1.json())
        .then((data1) => displayResult(data1, countryName));

    document.getElementById("userInput").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("details").textContent = "";
}

function displayResult(data1, countryName) {
    var outerArea = document.getElementById("result");
    var innerArea = document.createElement("div");

    for (let index = 0; index < data1.Countries.length; index++) {
        if (countryName == data1.Countries[index].Country) {
            innerArea.innerHTML = `<div class="container animate__animated animate__fadeInDown">
            <h2>Result:</h2>
            <p>
                <span><b>Searched Country: </b></span>
                ${data1.Countries[index].Country}
                <br>
                <span><b class="text-warning">Total Confirmed: </b></span>
                ${data1.Countries[index].TotalConfirmed}
                <br>
                <span> <b class="text-danger">Total Deaths: </b> </span>
                ${data1.Countries[index].TotalDeaths}
                <br>
                <button onclick="extraDetails('${countryName}')" class="btn btn-outline-primary mt-4" type="button">More
                    Details</button>
            </p>
    
        </div>`;
        }
        innerArea.classList.add("theStyle");
        outerArea.appendChild(innerArea);

    }
}

function extraDetails(country) {
    fetch("https://restcountries.com/v3.1/all")
        .then((res2) => res2.json())
        .then((data2) => displayExtraDetails(data2, country));
    document.getElementById("details").textContent = "";
}

function displayExtraDetails(data2, country) {

    var outerDiv = document.getElementById("details");
    var innerDiv = document.createElement("div");

    for (let index = 0; index < data2.length; index++) {
        if (country == data2[index].name.common) {

            innerDiv.innerHTML = `<div class="container mt-5 animate__animated animate__fadeInUp">
            <div class="row g-3">
                <div class="col-12 col-lg-4">
                    <h3>${country}</h3>
                    <br>
                    <img src="${data2[index].flags.png}" alt="flag image">
    
                </div>
                <div class="col-12 col-lg-4">
                    <b>Capital: </b> ${data2[index].capital[0]}
                    <br>
                    <b>Region: </b> ${data2[index].region}
                    <br>
                    <b>Population: </b> ${data2[index].population}
                </div>
                <div class="col-12  col-lg-4">
                    <b>Main Currency: </b> ${data2[index].currencies[Object.keys(data2[index].currencies)].name}
                    <br>
                    <b>Language: </b> ${Object.values(data2[index].languages)
                    .toString()
                    .split(",")
                    .join(", ")}
                </div>
            </div>
        </div>`;
        }

        outerDiv.appendChild(innerDiv);
    }



}