class carElement extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow ({mode: 'open'})

        let addElement = (tagName, parentNode) => parentNode.appendChild(
            document.createElement(tagName)
        )

        let img = addElem('img', document.querySelector('.car-element'))
        img.className = "car-image"
        img.width = "300"
        img.height = "200"
        let title = addElem('div', document.querySelector('.car-element'))
        title.className = "car-title"
        
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
    this.setImage (url) = function () {
        img.setAtribute('src', url)
    }

    this.setTitle(text) = function () {
        title.textContent = text
    }
}
customElements.define ( "car-element", carElement )