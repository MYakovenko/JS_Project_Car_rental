let cars = null
let mainBannerPictures = null

async function start () {
    let promise_1 = fetch ( "json/carsInfo.json" ) //json/carsInfo.json
        .then ( response => response.json()                     //http://localhost:3000/carsInfo
          .then ( response => cars = response )
        )
    let promise_2 = fetch ( "json/mainBannerPictures.json" ) //json/mainBannerPictures.json
        .then ( response => response.json()                             //http://localhost:3000/mainBannerPictures
          .then ( response => mainBannerPictures = response )
        )
    await Promise.all ( [ promise_1, promise_2 ] )
    showCars ()
    // changeMainBannerImage ()
}

function addElem ( tagName, container ) {
    container = container && container.nodeType === 1 ?
                container : document.body
    return container.appendChild (
         document.createElement ( tagName )
    )
}

let transport = []

start ()

function showCars () {
    cars.forEach ( ( item, index ) => {
        transport.push ( ( function () {
                                        
            let elem = addElem ( 'car-element', document.querySelector('.cars-wrapper') )
            elem.setImage ( item.ref )           
            elem.setTitle ( item.title )
            elem.setAttribute ('id', item.id)

            return elem
        })( item ) )
    })
}

function showInformationElement (id) {
    let infoElement = addElem ("car-information-element", document.querySelector('.cars-wrapper'))
    infoElement.setInformationElementImage(cars[id].ref)
    infoElement.setInformationElementOverview(cars[id].overview)
    infoElement.setEngineInfo(cars[id].engine)
    infoElement.setPrice(cars[id].price)
}

function showRentElement () {
    let rentElement = addElem ("rent-element", document.querySelector('.cars-wrapper'))
}

//Изменение главной картинки

// let changeClass = ( classname, styleString ) => Array.from(document.styleSheets)
//     .filter(
//          sheet => !sheet.href
//     ).forEach(
//         sheet => Array.from(sheet.cssRules)
//             .filter(
//                 rule => rule.selectorText === classname
//             ).forEach(
//                 rule => rule.style[styleString.split(':')[0]] = styleString.split(':')[1]
//             )
//     )

// function changeMainBannerImage () {
//     mainBannerPictures.forEach(                     
//        (item, index) => setTimeout(
//             changeClass("main_banner", `background: url(${item});`),
//             3000 * index
//         )
//     )               
// }

// //проверка
// var styleSheetList = Array.from( document.styleSheets)
//     .forEach ((sheet) => console.log(sheet)
//     )