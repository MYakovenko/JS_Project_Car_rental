let cars = null
let mainBannerPictures = null
let rentCarCities = null
let rentCarPlaces = null

async function getData () {
    let promise_1 = fetch ( "json/carsInfo.json" ) //json/carsInfo.json
        .then ( response => response.json()        //http://localhost:3000/carsInfo
          .then ( response => cars = response )
        )
    let promise_2 = fetch ( "json/mainBannerPictures.json" ) //json/mainBannerPictures.json
        .then ( response => response.json()                  //http://localhost:3000/mainBannerPictures
          .then ( response => mainBannerPictures = response )
        )
    let promise_3 = fetch ( "json/rentCarCities.json" ) //json/rentCarCities.json
        .then ( response => response.json()                  //http://localhost:3000/rentCarCities
          .then ( response => rentCarCities = response )
    )
    let promise_4 = fetch ( "json/rentCarPlaces.json" ) //json/rentCarPlaces.json
        .then ( response => response.json()                  //http://localhost:3000/rentCarPlaces
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

location.hash = `#0`
let transport = []
getData ()

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

let showInformationElement = function (id) {
    let infoElement = addElem ("car-information-element", document.querySelector('.cars-wrapper'))
    infoElement.setInformationElementImage(cars[id].ref)
    infoElement.setInformationElementOverview(cars[id].overview)
    infoElement.setEngineInfo(cars[id].engine)
    infoElement.setPrice(cars[id].price)
    infoElement.style.display = "block"
    document.body.classList.add("stop-scroling")
}

let showRentElement = () => addElem ("rent-element", document.querySelector('.cars-wrapper'))

//Переключение меню

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
    location.hash = `#0`
}

menuElements.menuWhatDoWeOffer.onclick = function (event) {
    event.preventDefault()
    location.hash = `#1`
}

menuElements.menuCarRentalTerms.onclick = function (event) {
    event.preventDefault()
    location.hash = `#2`
}

menuElements.menuDiscount.onclick = function (event) {
    event.preventDefault()
    location.hash = `#3`
}

window.onhashchange = function ( event ) {
    switch ( location.hash ) {
        case "#0":  
            window.scrollTo(0,0)          
            saveStorage()
            location.reload()
            break

        case "#1":
            window.scrollTo(0,0)
            menuElements.mainBanner.style.background = `url(${mainBannerPictures[0]}) center center no-repeat`
            hideElements()
            saveStorage ()
            addElem ("what-do-we-offer", menuElements.menuWrapper)
            break

        case "#2":
            window.scrollTo(0,0)
            menuElements.mainBanner.style.background = `url(${mainBannerPictures[6]}) center center no-repeat`
            hideElements()
            saveStorage ()
            addElem ("menu-rental-terms", menuElements.menuWrapper)
            break

        case "#3":
            window.scrollTo(0,0)
            menuElements.mainBanner.style.background = `url(${mainBannerPictures[2]}) center center no-repeat`
            hideElements()
            saveStorage ()
            addElem ("menu-discount", menuElements.menuWrapper)
            break

        default:
            location.hash = "#0"
            break
    }
}