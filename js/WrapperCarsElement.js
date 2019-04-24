document.body.style = `
    margin:0 auto;
    width:700px;
    height:800px;
    padding:0px;
    
 background: linear-gradient(rgba(0,0,0,0.5),
  rgba(0,0,0,0.5)),
  url('https://img4.goodfon.com/wallpaper/nbig/e/57/need-for-speed-payback-cars-vehicles-nfs-garage-nissan.jpg');
   
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-position:0px;
`

let elem = document.body.appendChild( 
    document.createElement ( 'wrapper-cars-element' )
)


class WrapperCarsElement extends HTMLElement{
    constructor() {
        super()
        this.shadow = this.attachShadow ( { mode: 'open' } )
        let wrapper = document.createElement('div')
        wrapper.className = 'wrapper'
        this.shadow.appendChild('wrapper')

        let addElement = (tagName, parentNode) => `${parentNode}`.appendChild(
            document.createElement(tagName)
        )

        (function getImage () {
                    fetch (``)
                        .then (
                            response => response.json ()
                                .then ( cars => cars.forEach(
                                    car => {
                                        let conteiner = addElement ('div', wrapper)
                                        let img = addElement ('img', conteiner)
                                        let title = addElement ('h3', conteiner)
                                        img.className = 'car-image'
                                        img.setAttribute('src', car.ref)
                                        img.width = "300"
                                        img.height = "200"
                                        title.className = 'car-title'
                                        title.textContent = car.title
                                     })
                                )

                        )
          })()

         let shadowStyles = addElement('style', this.shadow)

          this.shadowStyles.textContent = `
            .car-title {
                 color: blue;

             }

            .car-image {
                 padding: 10px;
                 border: 1px solid blue;
                 overflow: hidden;
             }

             .car-image:hover {
                   box-shadow: inset 3px 3px 5px #00000090;
             }
           `
                                            

    }
}

customElements.define ( "wrapper-cars-element", WrapperCarsElement )