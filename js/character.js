const printDetailCharacter = (url) => {
    mainContainer.innerHTML = "";
    getCharacter(url).then(response => {
        console.log(response)
        let characterDetail = formatCharacterDetail(response)

        mainContainer.innerHTML = `
            <section class="section">
                <div class="section__text">
                    <h3 class="section__text-title">CHARACTER DETAIL</h3>
                </div>
                <section class="section-container">
                    ${characterDetail}
                </section>
            </section>
        `;
        addEventsToLocation(response)
        addEventListenerToOptions('temporadas', response.episode, 'episode')
    })
}
const getCharacter = async(url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataCharacter(data)
    console.log(data)
    return data
}

formatDataCharacter = (data) => {
    let dataFormated = {
        img: data.image,
        name: data.name,
        status: data.status,
        specie: data.species,
        originName: data.origin.name,
        location: data.location.url,
        locationName: data.location.name,
        episode: mapEpisode(data.episode)
    }
    return dataFormated;
}
const formatCharacterDetail = (character) => {
    let episode = formatEpisode('episode', character.episode)

    return `
        <div class="detail">
            <div class="detail__container">
                <img class="detail__container-img" src="${character.img}">
                <h4 class="detail__container-title"> ${character.name}</h4>
            </div>
            <div class="detail__info">
            <p class="detail__info-title"> STATUS </p>
                <div class="detail__info-status">
                    ${checkStatus(character.status)}
                </div>
                <div class="detail__info-container">
                    <p class="detail__info-title"> SPECIES </p>
                    <p class="detail__info-description"> ${character.specie} </p>
                    <p class="detail__info-title"> ORIGIN </p>
                    <p class="detail__info-description"> ${character.originName} </p>
                    <p class="detail__info-title">LOCATION</p>
                    <div class="detail__info-location">
                        <button class="detail__options detail__options-location">${character.locationName}</button>
                    </div>
                </div>
                ${episode}
            </div>
        </div>
    `
}
const addEventsToLocation = (character) => {
    let cardLocation = [...document.getElementsByClassName('detail__options-location')];
    cardLocation.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('LOCALIZACIONES', character.location)
        })
    })
}

const checkStatus = (character) =>{
    if(character.toLowerCase() === 'alive'){
        return `
            <p class="detail__info-status-text detail__info-status-text-${character.toLowerCase()}"> ${character.toUpperCase()}</p>
            <p class="detail__info-status-text"> DEAD </p>
            <p class="detail__info-status-text"> UNKOWN </p>
        `

    }else if(character.toLowerCase() === 'dead'){
        return`
            <p class="detail__info-status-text"> ALIVE </p>
            <p class="detail__info-status-text detail__info-status-text-${character.toLowerCase()}"> ${character.toUpperCase()}</p>
            <p class="detail__info-status-text"> UNKOWN </p>
        `

    }else{
        return `
            <p class="detail__info-status-text"> ALIVE </p>
            <p class="detail__info-status-text"> DEAD</p>
            <p class="detail__info-status-text detail__info-status-text-${character.toLowerCase()}"> ${character.toUpperCase()}</p>
        `
    }
}