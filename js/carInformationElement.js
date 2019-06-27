class carInformationElement extends HTMLElement {
    constructor() {
        super()
        var shadow = this.attachShadow ({mode: 'open'})

        const carElementInformationTemplate = document.getElementById('car-information-element')
        shadow.appendChild(
            carElementInformationTemplate.content.cloneNode(true)
        )

        function getElements (shadowChildren) {
            let formElem = {}
            let element = Array.from(shadowChildren)
            element.forEach ( item => Object.assign(formElem,  {[item.id]: item})) 
            return formElem
        }

        const carInfoWrapper = shadow.querySelector(".car-info-wrapper")
        const infoComteiner = shadow.querySelector("#info-conteiner")
        const additionalInfo = shadow.querySelector("#additional-info")
        const buttons = shadow.querySelector("#buttons-conteiner")

        this.carInformationElements = Object.assign({}, 
            getElements(carInfoWrapper.children),
            getElements(infoComteiner.children),
            getElements(additionalInfo.children),
            getElements(buttons.children)
        )

        this.carInformationElements["btn-cancel"].onclick = function ( event ) {
            let component = this
            component.parentNode.removeChild (component)
            document.body.classList.remove("stop-scroling")
            event.preventDefault()
        }.bind(this)

        this.carInformationElements["btn-rent"].onclick = function ( event ) {
            this.parentNode.removeChild (this)
            event.preventDefault()
            showRentElement ()
        }.bind(this)

    }
    setInformationElementImage (url) {
        this.carInformationElements["car-img"].src = url
    }

    setInformationElementOverview (text) {
        this.carInformationElements["overview"].textContent = text
    }

    setEngineInfo (text) {
        this.carInformationElements["engine-info"].textContent = text
    }

    setPrice (text) {
        this.carInformationElements["price-info"].textContent = text
    }
}
customElements.define ( "car-information-element", carInformationElement )