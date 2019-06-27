function createMenuComponent (templateID) {
    return class MenuElement extends HTMLElement {
            constructor () {
                super()
                var shadow = this.attachShadow({mode: 'open'})

                const menuTemplate = document.getElementById(templateID)
                shadow.appendChild(
                    menuTemplate.content.cloneNode(true)
                )
            }
    }
}

customElements.define ( "what-do-we-offer", createMenuComponent('template-offer') )
customElements.define ( "menu-rental-terms", createMenuComponent('rental-terms-template') )
customElements.define ( "menu-discount", createMenuComponent('discount-template') )