class carInformationElement extends HTMLElement {
    constructor() {
        super()
        var shadow = this.attachShadow ({mode: 'open'})

        let carElementInformationTemplate = document.getElementById('car-information-element')
        shadow.appendChild(
            carElementInformationTemplate.content.cloneNode(true)
        )

        function getElements (shadowChildren) {
            let formElem = {}
            let element = Array.from(shadowChildren)
            element.forEach ( item => Object.assign(formElem,  {[item.id]: item})) 
            return formElem
        }

        let elementsWrappers = getElements(shadow.children[0].children[0].children)
        let infoElements = getElements(elementsWrappers['info-conteiner'].children)
        let additionalInfoElements = getElements(infoElements['additional-info'].children)
        let buttons = getElements(elementsWrappers['buttons-conteiner'].children)

        this.carInformationElements = Object.assign({}, 
            elementsWrappers, 
            infoElements,
            additionalInfoElements,
            buttons
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