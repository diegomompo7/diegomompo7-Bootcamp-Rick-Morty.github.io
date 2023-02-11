let image;

const mapEpisode = (options, option) => {
    let optionFormated = [];
  
    options.forEach((element, i) => {
      const StringParts = element.split("/");
      let idEpisode = StringParts[StringParts.length -1];
      let auxObject = {
        urlFetch: element,
        number: idEpisode,
      }
      optionFormated.push(auxObject)
    });
    return optionFormated;
  }
  const formatEpisode = (option, options) => {
    let htmlStructure = "";

    console.log(options)
  
    options.forEach(element => {
        htmlStructure += `<button class="detail__options detail__options-${option}">${element.number}</button>`
  
        });
  
      htmlStructure = `
      <p class="detail__info-title">${option.toUpperCase()}</p>
      <div class="detail__episode">
          ${htmlStructure}
      </div>  
      `  
    return htmlStructure;
  }
  const addEventListenerToOptions = (callBack, options, option) => {
    console.log(options)
    let optionLinks = [...document.getElementsByClassName(`detail__options-${option}`)];
    optionLinks.forEach((element, i) => {
       element.addEventListener('click', () => {
         printPage(callBack.toUpperCase(), options[i].urlFetch);
       })
    });
 }

 const mapOptions = (options, option) => {
    let optionFormated = [];
    console.log(options)

    options.forEach((element, i) => {

      const StringParts = element.split("/");
      let idOption = StringParts[StringParts.length -1];

            image = {
            urlImg: "https://rickandmortyapi.com/api/" + option + '/avatar/' + idOption + '.jpeg',
            urlFetch: element
            }
          optionFormated.push(image);
      });


    console.log(optionFormated.length)

    return optionFormated
 }

 const getImage = (url) => {

  fetch(url)
  .then(response => response.json())
  .then(data => {
    image = {
      urlImg: data.image,
      urlFetch: url
    }
    return auxObject
  });

 }

 const formatOptions = (options, option) => {

  let htmlStructure = "";
  console.log(options.character.length)
  console.log(options)


    for(let i=0; i<options.character.length; i++){
      console.log(options.character[i])
      htmlStructure += `<img class="detail__options detail__options-${option}" src="${options.character[i].urlImg}">`
    }

    htmlStructure = `
    <p class="detail__info-title">${option.toUpperCase()}</p>
    <div class="detail__residents">
        ${htmlStructure}
    </div>  
    `  
  return htmlStructure;
    
 }