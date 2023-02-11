let urlNextEpisodes = '';
let nameEpisode = []
let dateEpisode = []
let season = []
let seasonConcat = []
let dataConcat = []
let idEpisode;
let seasonObject = new Object()
let seasonArray = []
let dataPages = []


const printEpisodes = () => {
    mainContainer.innerHTML="";
   
    getEpisodes().then(response => {
        let episodesCards = formatEpisodesCards(response);

        mainContainer.innerHTML = `
            <section class="section">
                <div class="section__text">
                    <h3 class="section__text-title">EPISODES</h3>
                </div>
                <section class="section-container">
                    ${episodesCards}
                </section>
                <div class = "section__more">
                    <button class="section__more-details"> +MORE </button>
                </div>
            </section>
        `;
        addEventsToEpisodeLinks(dataConcat);
    })
}

const getEpisodes = async() => {
    let url = URL_BASE + "/episode/";
    let urlNext =  null;
    let dataAll  = [];

    do{
        let response = (urlNext !== null) ? await fetch(urlNext) : await fetch(url)
        data = await response.json();
        dataPages.push(data)
        console.log(dataPages)

        urlNext = data.info.next

    }while (data.info.next != null)

    dataAll = [...dataAll, ...mapDataEpisodes(dataPages)]
    return dataAll;
}

const mapDataEpisodes = (data) => {
        let dataMapped = []
        let dataSeason = []

        for(let i=0; i<data.length; i++){
            console.log(data[i].results)
            dataSeason = data[i].results.map(idSeason => idSeason.episode.slice(0,3))
            season.push(dataSeason)
        }
        
        console.log(data)
        seasonConcat = season[0].concat(season[1], season[2])
        dataConcat = data[0].results.concat(data[1].results, data[2].results)

        console.log(seasonConcat)
        console.log(dataConcat)
        
        for(let i=1; i<=seasonConcat.length;i++){
            if(seasonConcat[i] != seasonConcat[i-1]){

                dataIdEpisode = dataConcat.filter(id => id.episode.includes(seasonConcat[i-1]))
                console.log(dataIdEpisode)
                dataMapped = dataIdEpisode.map(episode => {
                let object =  {
                    name: episode.name,
                    date: episode.air_date,
                    episode: episode.episode,
                    urlDetails: episode.url
    
                }
                nameEpisode.push(episode.name)
                dateEpisode.push(dataIdEpisode[0].air_date, dataIdEpisode[dataIdEpisode.length-1].air_date)
                idEpisode = dataIdEpisode[dataIdEpisode.length-1].episode.charAt(2)
                return object;
                })

                console.log(dateEpisode)
                console.log(nameEpisode)

                seasonObject = {
                    dateEpisode: dateEpisode, 
                    idEpisode: idEpisode, 
                    nameEpisode: nameEpisode,
                }

                seasonArray.push(seasonObject)

                console.log(seasonArray)

                dateEpisode = []
                idEpisode = 0;
                nameEpisode = []
                seasonObject = new Object()
        }


    }
    return dataMapped;
}
const formatEpisodesCards = (episodes) =>{
    console.log(episodes)
    console.log(seasonArray[0].idEpisode)

    let templatesEpisodes = seasonArray.map((episode) => {
        console.log(episode)
        return `
            <div class="card">
                <div class="card__text--detail2">
                    <h2 class="card__text--detail2-name"> SEASON ${episode.idEpisode}</h2>
                </div>
                <div class="card__container">
                    <div class="card__info-container card__info-container--details2">
                        <div class="card__info">
                            <p class="card__info-title card__info-title--details2">DATE</p>
                            <p class="card__info card__info--details2">${episode.dateEpisode[0]} - ${episode.dateEpisode[1]}</p>
                            <p class="card__info-title card__info-title--details2">EPISODES</p>
                        </div>
                    </div>
                </div>
                ${printNameEpisodes(episode.nameEpisode)}
            </div>
        ` 
    }).join("")
    return templatesEpisodes

}
const printNameEpisodes = (episode) =>{

    console.log(episode)

    let nameEpisode = episode.map((episode, i) => {
        return  `
        <div class="card__more">
            <a class="card__more-link" href="#">${episode}</a>
        </div>`
    }).join("")
    return nameEpisode;
}

const printMoreEpisodes = () => {
       
    getEpisodes().then(response => {
        let episodesCards = formatEpisodesCards(response);

        let sectionContainer = document.getElementsByClassName('section-container')[0];

        sectionContainer.innerHTML += episodesCards;
        
    })
}
const addEventsToEpisodeLinks = (episodes) => {
    let cardLinks = [...document.getElementsByClassName('card__more-link')];
    console.log(cardLinks)
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('TEMPORADAS', episodes[i].url)
        })
    })
}