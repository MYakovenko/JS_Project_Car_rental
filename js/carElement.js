class carElement extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow ({mode: 'open'})

        let addElement = (tagName, parentNode) => parentNode.appendChild(
            document.createElement(tagName)
        )

        this.img = addElem('img', this)
        this.img.className = "car-image"
        this.img.width = "300"
        this.img.height = "200"
        this.title = addElem('div', this)
        this.title.className = "carTitle"

        // this.setImage (url) = function () {
        //     img.setAtribute('src', url)
        // }
    
        // this.setTitle(text) = function () {
        //     title.textContent = text
        // }

        
        this.styles = addElement('style', this.shadow)
        this.styles.textContent = `
            .car-conteiner {
                display:flex;
                flex-direction: column;
                text-align: center;
                backgorud-color: #f6f1bf;
                margin: 20px;
            }
            .car-title {
                color: #000000;
                font: 16px/20px "Raleway", "Arial", "Helvetica Neue", sans-serif;
                font-weight: 800;
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
    setImage (url) {
        this.img.src = url
    }

    setTitle(text) {
        this.title.textContent = text
    }

}
customElements.define ( "car-element", carElement )