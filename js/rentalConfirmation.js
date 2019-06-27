class RentalConfirmation extends HTMLElement {
    constructor () {
        super()
        var shadow = this.attachShadow ({mode: "open"})

        const confirmationTemplate = document.getElementById('rental-confirmation-template')
        shadow.appendChild(
            confirmationTemplate.content.cloneNode(true)
        )

        this.removeElement = function () {
            this.parentNode.removeChild (this)
            document.body.classList.remove("stop-scroling")
        }.bind(this)

        setTimeout(
            this.removeElement,
            5000
        )

    }
}
customElements.define ( "rental-confirmation", RentalConfirmation)