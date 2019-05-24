let cars = null
let mainBannerPictures = null
let rentCarCities = null
let rentCarPlaces = null

async function getData () {
    let promise_1 = fetch ( "json/carsInfo.json" ) 
        .then ( response => response.json()              
          .then ( response => cars = response )
        )
    let promise_2 = fetch ( "json/mainBannerPictures.json" ) 
        .then ( response => response.json()                             
          .then ( response => mainBannerPictures = response )
        )
    let promise_3 = fetch ( "json/rentCarCities.json" ) 
        .then ( response => response.json()                
          .then ( response => rentCarCities = response )
    )
    let promise_4 = fetch ( "json/rentCarPlaces.json" ) 
        .then ( response => response.json()              
          .then ( response => rentCarPlaces = response )
    )
    await Promise.all ( [ promise_1, promise_2, promise_3, promise_4] )
    showCars ()
}

let addElem = function ( tagName, container ) {
    container = container && container.nodeType === 1 ?
                container : document.body
    return container.appendChild (
         document.createElement ( tagName )
    )
}

let transport = []
getData ()

//Creation web components for evailable vehicals (carElement)

let showCars = function () {
    cars.forEach ( ( item, index ) => {
        
        transport.push ( ( function () {                           
            let elem = addElem ( 'car-element', document.querySelector('.cars-wrapper') )
            elem.setAttribute ('id', item.id)
            elem.setAttribute ('img', item.ref)
            elem.setAttribute ('title', item.title)

            return elem
        })( item ) )
    })
}

//Creation a web component with info about chosen car (carInformationElement)

let showInformationElement = function (id) {
    let infoElement = addElem ("car-information-element", document.querySelector('.cars-wrapper'))
    infoElement.setInformationElementImage(cars[id].ref)
    infoElement.setInformationElementOverview(cars[id].overview)
    infoElement.setEngineInfo(cars[id].engine)
    infoElement.setPrice(cars[id].price)
    infoElement.style.display = "block"
    document.body.classList.add("stop-scroling")
}

//Creation a rental form  web component (rentElement)

let showRentElement = () => addElem ("rent-element", document.querySelector('.cars-wrapper'))

//Menu switching 

let menuElements = {
    menuWrapper: document.querySelector('.page-changing'),
    mainBanner: document.querySelector('.main_banner'),
    mainBannerInfo: document.querySelector('.main_banner_info'),
    carsWrapper: document.querySelector('.cars-wrapper'),
    carsWrapperTitle: document.querySelector('.cars-wrapper-title'),
    menuMainPage: document.getElementById('main-page-menu'),
    menuWhatDoWeOffer: document.getElementById('what-do-we-offer-menu'),
    menuCarRentalTerms: document.getElementById('car-rental-terms-menu'),
    menuDiscount: document.getElementById('discount-menu')
}

let removeElement = elem => elem.parentNode.removeChild (elem)

let saveStorage = (function () {
    var boxTime = []
    return function () {
        boxTime.push ({
            pageId: location.hash,
            startTime: new Date().getTime()
        })
        localStorage.setItem ( "history", JSON.stringify (boxTime) )
        console.log ( "hash was changed" )
        console.log ( localStorage.getItem ( "history" ) )
    }
})()

function hideElements () {
    menuElements.carsWrapper.style.display = "none"
    menuElements.carsWrapperTitle.style.display = "none"
    menuElements.mainBannerInfo.style.display = "none"
    menuElements.menuWrapper.innerHTML = ""
}

menuElements.menuMainPage.onclick = function (event) {
    event.preventDefault()
    location.hash = `#main_menu`
}

menuElements.menuWhatDoWeOffer.onclick = function (event) {
    event.preventDefault()
    location.hash = `#what_do_we_offer`
}

menuElements.menuCarRentalTerms.onclick = function (event) {
    event.preventDefault()
    location.hash = `#rental_terms`
}

menuElements.menuDiscount.onclick = function (event) {
    event.preventDefault()
    location.hash = `#discount`
}

window.onhashchange = function ( event ) {
    switch ( location.hash ) {
        case "#main_menu":  
            window.scrollTo(0,0)          
            saveStorage()
            location.reload()
            break

        case "#what_do_we_offer":
            window.scrollTo(0,0)
            menuElements.mainBanner.style = `
                background: url(${mainBannerPictures[9]}) right center no-repeat;
                background-size: cover;
            `
            hideElements()
            saveStorage ()
            addElem ("what-do-we-offer", menuElements.menuWrapper) // web component creation (menuElement)
            break

        case "#rental_terms":
            window.scrollTo(0,0)                  
            menuElements.mainBanner.style = `
                background: url(${mainBannerPictures[0]}) right center no-repeat;
                background-size: cover;
            `
            hideElements()
            saveStorage ()
            addElem ("menu-rental-terms", menuElements.menuWrapper) // web component creation (menuElement)
            break

        case "#discount":
            window.scrollTo(0,0)            
            menuElements.mainBanner.style = `
                background: url(${mainBannerPictures[8]}) center center no-repeat;
                background-size: cover;
            `
            hideElements()
            saveStorage ()
            addElem ("menu-discount", menuElements.menuWrapper) // web component creation (menuElement)
            break

        default:
            location.hash = "#main_menu"
            break
    }
}