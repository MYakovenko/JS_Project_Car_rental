class carInformationElement extends HTMLElement {
    constructor() {
        super()
        var shadow = this.attachShadow ({mode: 'open'})

        let carElementInformationTemplate = document.getElementById('carInformationElement')
        shadow.appendChild(
            carElementInformationTemplate.content.cloneNode(true)
        )

        // let addElement = (tagName, parentNode) => parentNode.appendChild(
        //     document.createElement(tagName)
        // )

        this.findElement = function (tagName) {
            console.dir(shadow)
            console.log(shadow.childNodes)
            let element = Array.from(shadow.children[0].children).find(
                (elem) => elem.tagName === `${tagName.toUpperCase()}`
            )
            return element
        }

        const cancelButton = shadow.children[0].children[2].children[0]

        cancelButton.onclick = function ( event ) {
            let component = this
            component.parentNode.removeChild (component)
            event.preventDefault()
        }.bind(this)
        
        this.overviewElem = shadow.children[0].children[1].children[0]
        this.engineInfoElem = shadow.children[0].children[1].children[1].children[0]
        this.priceElem = shadow.children[0].children[1].children[1].children[1]
    
        const rentButton = shadow.children[0].children[2].children[1]

        rentButton.onclick = function ( event ) {
            this.parentNode.removeChild (this)
            event.preventDefault()
            showRentElement ()
        }.bind(this)

    }
    setInformationElementImage (url) {
        this.findElement('IMG').src = url
    }

    setInformationElementOverview (text) {
        this.overviewElem.textContent = text
    }

    setEngineInfo (text) {
        this.engineInfoElem.textContent = text
    }

    setPrice (text) {
        this.priceElem.textContent = text
    }
}
customElements.define ( "car-information-element", carInformationElement )