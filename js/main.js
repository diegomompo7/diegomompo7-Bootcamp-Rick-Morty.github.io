const mainContainer = document.querySelector(".main");
const URL_BASE = "https://rickandmortyapi.com/api"

window.onload = () => {
    printPage('HOME');
}

const printPage = (section, url) => {
    adaptHeader(section);

    console.log(section)
    console.log(url)

    switch(section){
        case 'HOME':
            printHome();
        break;
        case 'PERSONAJES':
            url ? printDetailCharacter(url) : printCharacters();
        break;
        case 'LOCALIZACIONES':
            url ? printDetailLocation(url) : printLocations();
        break;
        case 'TEMPORADAS':
            url ? printDetailEpisode(url) : printEpisodes();
        break;
        default:
            printHome();
        break;
    }

}

const adaptHeader = (section) => {
    const header = document.querySelector('header');
    if(section == 'HOME'){
        header.classList.add('header--home')
    }
    else{
        header.classList.remove('header--home')
    }
}