const printHome = () => {
    mainContainer.innerHTML = `
        <section class="section-home">
            <p class="section-home__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>

            <nav class="nav">
                <a href="#" class="nav__link">PERSONAJES</a>
                <a href="#" class="nav__link">TEMPORADAS</a>
                <a href="#" class="nav__link">LOCALIZACIONES</a>
            </nav>
        </section>
    `;
    addEventsToHomeList();
}

const addEventsToHomeList = () =>{
    const homeLinks = [...document.getElementsByClassName('nav__link')];
    homeLinks.forEach(element => {
        element.addEventListener('click', () => {
            printPage(element.textContent.toUpperCase());
        })
    })
}