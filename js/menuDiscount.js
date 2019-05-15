class MenuDiscount extends HTMLElement {
    constructor () {
        super()

        let shadow = this.attachShadow ({mode: "open"})
        let template = document.getElementById("discount-template")
        shadow.appendChild(
            template.content.cloneNode(true)
        )
    }
}
customElements.define ("menu-discount", MenuDiscount)