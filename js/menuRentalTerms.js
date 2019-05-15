class MenuRentalTerms extends HTMLElement {
    constructor () {
        super()

        let shadow = this.attachShadow ({mode: "open"})
        let template = document.getElementById("rental-terms-template")
        shadow.appendChild(
            template.content.cloneNode(true)
        )
    }
}
customElements.define ("menu-rental-terms", MenuRentalTerms)