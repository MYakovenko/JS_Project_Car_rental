let cars = null
let mainBannerPictures = null

async function start () {
    let promise_1 = fetch ( "json/carsInfo.json" )
        .then ( response => response.json()
          .then ( response => cars = response )
        )
    let promise_2 = fetch ( "json/mainBannerPictures.json" )
        .then ( response => response.json()
          .then ( response => mainBannerPictures = response )
        )
    await Promise.all ( [ promise_1, promise_2 ] )
    showCars ()
    changeMainBannerImage ()
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
            elem.className = "car-conteiner"
            elem.setImage ( item.ref )           
            elem.setTitle ( item.title )

           // elem.onclick
            return elem
        })( item ) )
    })
}

// function changeMainBannerImage () {
//     fetch (`json/mainBannerPictures.json`)
//         .then (
//             response => response.json ()
//                 .then ( cars => cars.forEach(
//                     url => {
                         
//                         setInterval(
//                             url => document.getElementByClassName('main_banner')[0].style.background = `url(${url} center top no-repeat;)`,
//                             3000
//                         )
//                     })
//                 )
//          )
// }