class MenuWhatDoWeOffer extends HTMLElement {
    constructor () {
        super()
        var shadow = this.attachShadow({mode: 'open'})

        let menuTemplate = document.getElementById('template-offer')
        shadow.appendChild(
            menuTemplate.content.cloneNode(true)
        )
    }
}
customElements.define ( "what-do-we-offer", MenuWhatDoWeOffer )