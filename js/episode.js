const printDetailEpisode = (url) => {
    mainContainer.innerHTML = "";
    getEpisode(url).then(response => {
        console.log(response)
        let episodeDetail = formatEpisodeDetail(response)

        mainContainer.innerHTML = `
            <section class="section">
                <div class="section__text">
                    <h3 class="section__text-title">EPISODE DETAIL</h3>
                </div>
                <section class="section-container">
                    ${episodeDetail}
                </section>
            </section>
        `;
        addEventListenerToOptions('personajes', response.characters, 'characte')
    })
}
const getEpisode = async(url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataEpisode(data)
    return data
}

formatDataEpisode = (data) => {
    let dataFormated = {
        name: data.name,
        episode: data.episode,
        airDate: data.air_date,
        character: mapOptions(data.characters, 'character')
    }
    return dataFormated;
}
const formatEpisodeDetail = (episode) => {
    let character = formatOptions(episode, 'characters')

    return `
        <div class="detail detail--episode">
            <div class="detail__container--detail2">
                <h4 class="detail__container-title--detail2"> ${episode.name}</h4>
            </div>
            <div class="detail__info--detail2">
                <div class="detail__info-container">
                    <p class="detail__info-title"> EPISODE </p>
                    <p class="detail__info-description"> ${episode.episode} </p>
                    <p class="detail__info-title"> DATE </p>
                    <p class="detail__info-description"> ${episode.airDate} </p>
                </div>
                ${character}
            </div>
        </div>
    `
}