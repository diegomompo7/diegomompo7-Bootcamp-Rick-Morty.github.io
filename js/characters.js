let urlNextCharacter = '';

const printCharacters = () => {
    mainContainer.innerHTML="";
   
    getCharacters().then(response => {
        let charactersCards = formatCharactersCards(response);

        mainContainer.innerHTML = `
            <section class="section">
                <div class="section__text">
                    <h3 class="section__text-title">CHARACTERS FINDER</h3>
                </div>
                <section class="section-container">
                    ${charactersCards}
                </section>
                <div class = "section__more">
                    <button class="section__more-details"> +MORE </button>
                </div>
            </section>
        `;
        addEventListenerToMoreCharacters();
        addEventsToCharacterLinks(response);
    })
}

const getCharacters = async() => {
    if(urlNextCharacter === null || urlNextCharacter === '') {
        let url = URL_BASE + "/character";
        urlNextCharacter = url
    }
    let response = await fetch(urlNextCharacter);
    let data = await response.json();
    urlNextCharacter = data.info.next;
    console.log(urlNextCharacter)
    data = mapDataCharacters(data.results);
    return data;

} 
const mapDataCharacters = (data) => {
    let dataMapped = data.map(character => {
        let object =  {
            name: character.name,
            status: character.status,
            urlImage: character.image,
            species: character.species,
            gender: character.gender,
            origin: character.origin.name,
            location: character.location.name,
            urlDetails: character.url

        }
        return object;
    })
    return dataMapped;
}
const formatCharactersCards = (characters) =>{
    let templatesCharacters = characters.map(character => {
        styleStatus = character.status.toLowerCase()
        return `
            <div class="card">
                <div class="card__text">
                    <h2 class="card__text-name"> ${character.name}</h2>
                    <div class="card__status">
                    <p class="card__status-text card__status-${styleStatus}"> ${character.status.toUpperCase()}</p>
                    </div>
                </div>
                <div class="card__container">
                    <img class="card__container-img" src=" ${character.urlImage}">
                    <div class="card__info-container">
                        <p class="card__info-title">SPECIES</p>
                        <p class="card__info">${character.species}</p>
                        <p class="card__info-title">GENDER</p>
                        <p class="card__info">${character.gender}</p>
                        <p class="card__info-title">ORIGIN</p>
                        <p class="card__info">${character.origin}</p>
                        <p class="card__info-title">LOCATION</p>
                        <p class="card__info">${character.location}</p>
                    </div>
                </div>
                <div class="card__more">
                    <a class="card__more-link" href="#">+ MORE DETAILS</a>
                </div>
            </div>
        `   
    }).join('');

    return templatesCharacters;
}
const addEventListenerToMoreCharacters = () => {
    let moreCards = document.getElementsByClassName('section__more')[0];
    moreCards.addEventListener('click', () => {
        printMoreCharacters();
    })


}

const printMoreCharacters = () => {
       
    getCharacter().then(response => {
        let charactersCards = formatCharactersCards(response);

        let sectionContainer = document.getElementsByClassName('section-container')[0];

        sectionContainer.innerHTML += charactersCards;
        
    })
}
const addEventsToCharacterLinks = (characters) => {
    let cardLinks = [...document.getElementsByClassName('card__more-link')];
    console.log(cardLinks)
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('PERSONAJES', characters[i].urlDetails)
        })
    })
}