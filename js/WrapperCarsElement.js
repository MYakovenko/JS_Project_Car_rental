// document.body.style = `
//     margin:0 auto;
//     width:700px;
//     height:800px;
//     padding:0px;
    
//  background: linear-gradient(rgba(0,0,0,0.5),
//   rgba(0,0,0,0.5)),
//   url('https://img4.goodfon.com/wallpaper/nbig/e/57/need-for-speed-payback-cars-vehicles-nfs-garage-nissan.jpg');
   
//     background-repeat:no-repeat;
//     background-attachment:fixed;
//     background-position:0px;
// `

// let elem = document.body.appendChild( 
//     document.createElement ( 'wrapper-cars-element' )
// )


// class WrapperCarsElement extends HTMLElement{
//     constructor() {
//         super()
//         this.shadow = this.attachShadow ( { mode: 'open' } )
//         let wrapper = document.createElement('div')
//         wrapper.className = 'wrapper'
//         this.shadow.appendChild(wrapper)

//         let addElement = (tagName, parentNode) => parentNode.appendChild(
//             document.createElement(tagName)
//         );

//         function getImage () {
//                     fetch (`json/carsInfo.json`)
//                         .then (
//                             response => response.json ()
//                                 .then ( cars => cars.forEach(
//                                     car => {
//                                         let conteiner = addElement ('div', wrapper)
//                                         let img = addElement ('img', conteiner)
//                                         let title = addElement ('div', conteiner)
//                                         conteiner.className = 'car-conteiner'
//                                         img.className = 'car-image'
//                                         img.setAttribute('src', car.ref)
//                                         img.width = "300"
//                                         img.height = "200"
//                                         title.className = 'car-title'
//                                         title.textContent = car.title
//                                      })
//                                 )
//                         )
//           }
//           getImage ()

//          this.shadowStyles = addElement('style', this.shadow)

//           this.shadowStyles.textContent = `
//            .wrapper {
//     display: flex;
//     flex-wrap: wrap;
//     width: 80%;
//            }

//            .car-conteiner {
//             display:flex;
//             flex-direction: column;
//             text-align: center;
//             backgorud-color: #f6f1bf;
//             margin: 20px;

//            }
//             .car-title {
//                  color: #000000;
//                  font: 16px/20px "Raleway", "Arial", "Helvetica Neue", sans-serif;
//                  font-weight: 800;
//              }

//             .car-image {
//                  padding: 10px;
//                  border: 1px solid blue;
//                  overflow: hidden;
//              }

//              .car-image:hover {
//                    box-shadow: inset 3px 3px 5px #00000090;
//              }
//            `
//            this.addCarr = function (_title, url, _engine, _price ) {
       
//        fetch('https://github.com/MYakovenko/JS_Project_Car_rental/blob/gh-pages/json/carsInfo.json', { 
//      method: 'PUT',
//      body: JSON.stringify({
//                title: _title,
//             ref : url,
//             engine: _engine,
//             price: `${_price} USD`
       
//      })
//     })
//     getImage()
//            }
                                       

//     }
// }

// customElements.define ( "wrapper-cars-element", WrapperCarsElement )

/*
 var car = document.querySelector ( 'wrapper-cars-element' )

 car.addCar('Mercedes-Benz G-Class G63 AMG', 
  'https://stat.overdrive.in/wp-content/odgallery/2018/10/47462_2019_Mercedes_benz_G63AMG.jpg'
  '4.0L V8 biturbo 563 HP',
  90)
*/