let urlNextLocations = '';

const printLocations = () => {
    mainContainer.innerHTML="";
   
    getLocations().then(response => {
        let locationsCards = formatLocationsCards(response);

        mainContainer.innerHTML = `
            <section class="section">
                <div class="section__text">
                    <h3 class="section__text-title">LOCATION FINDER</h3>
                </div>
                <section class="section-container">
                    ${locationsCards}
                </section>
                <div class = "section__more">
                    <button class="section__more-details"> +MORE </button>
                </div>
            </section>
        `;
        addEventListenerToMoreLocations();
        addEventsToLocationLinks(response);
    })
}

const getLocations = async() => {
    if(urlNextLocations === null || urlNextLocations === '') {
        let url = URL_BASE + "/location";
        urlNextLocations = url
    }
    let response = await fetch(urlNextLocations);
    let data = await response.json();
    urlNextLocations = data.info.next;
    console.log(urlNextLocations)
    data = mapDataLocations(data.results);
    return data;

} 
const mapDataLocations = (data) => {
    let dataMapped = data.map(location => {
        let object =  {
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            urlDetails: location.url

        }
        return object;
    })
    return dataMapped;
}
const formatLocationsCards = (locations) =>{
    let templatesLocations = locations.map(location => {
        return `
            <div class="card">
                <div class="card__text--detail2">
                    <h2 class="card__text--detail2-name"> ${location.name}</h2>
                </div>
                <div class="card__container">
                    <div class="card__info-container card__info-container--details2">
                        <div class="card__info--type">
                            <p class="card__info-title card__info-title--details2">TYPE</p>
                            <p class="card__info card__info--details2">${location.type}</p>
                        </div>
                        <div class="card__info--dimension">
                            <p class="card__info-title card__info-title--locations">DIMENSION</p>
                            <p class="card__info card__info--detail2">${location.dimension}</p>
                        </div>
                    </div>
                </div>
                <div class="card__more">
                    <a class="card__more-link" href="#">+ MORE DETAILS</a>
                </div>
            </div>
        `   
    }).join('');

    return templatesLocations;
}
const addEventListenerToMoreLocations = () => {
    let moreCards = document.getElementsByClassName('section__more')[0];
    moreCards.addEventListener('click', () => {
        printMoreLocations();
    })


}

const printMoreLocations = () => {
       
    getLocations().then(response => {
        let locationsCards = formatLocationsCards(response);

        let sectionContainer = document.getElementsByClassName('section-container')[0];

        sectionContainer.innerHTML += locationsCards;
        
    })
}
const addEventsToLocationLinks = (locations) => {
    let cardLinks = [...document.getElementsByClassName('card__more-link')];
    console.log(cardLinks)
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('LOCALIZACIONES', locations[i].urlDetails)
        })
    })
}