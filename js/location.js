const printDetailLocation = (url) => {
    mainContainer.innerHTML = "";
    getLocation(url).then(response => {
        console.log(response)
        let locationDetail = formatLocationDetail(response)

        mainContainer.innerHTML = `
            <section class="section">
                <div class="section__text">
                    <h3 class="section__text-title">LOCATION DETAIL</h3>
                </div>
                <section class="section-container">
                    ${locationDetail}
                </section>
            </section>
        `;
        addEventListenerToOptions('personajes', response.character, 'residents')
    })
}
const getLocation = async(url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataLocation(data)
    return data
}

formatDataLocation = (data) => {
    let dataFormated = {
        name: data.name,
        type: data.type,
        dimension: data.dimension,
        character: mapOptions(data.residents, 'character')
    }
    return dataFormated;
}
const formatLocationDetail = (location) => {
    let character = formatOptions(location, 'residents')

    return `
        <div class="detail detail--location">
            <div class="detail__container--detail2">
                <h4 class="detail__container-title--detail2"> ${location.name}</h4>
            </div>
            <div class="detail__info--detail2">
                <div class="detail__info-container">
                    <p class="detail__info-title"> TYPE </p>
                    <p class="detail__info-description"> ${location.type} </p>
                    <p class="detail__info-title"> DIMENSION </p>
                    <p class="detail__info-description"> ${location.dimension} </p>
                </div>
                ${character}
            </div>
        </div>
    `
}