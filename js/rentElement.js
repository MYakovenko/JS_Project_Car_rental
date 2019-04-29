class rentElement extends HTMLElement {
    constructor () {
        super()
        var shadow = this.attachShadow ({mode: "open"})

        let rentElementTemplate = document.getElementById('rent-element')
        shadow.appendChild(
            rentElementTemplate.content.cloneNode(true)
        )

        const cancelButton = shadow.children[0].children[1].children[1]
        const proceedButton = shadow.children[0].children[1].children[2]

        cancelButton.onclick = function ( event ) {
            this.parentNode.removeChild (this)
            event.preventDefault()
        }.bind(this)

        // proceedButton.onclick = function (event) {

        //     addPostRequest()
        // }.bind(this)

        // function addPostRequest (_title, _url, _engine, _price ) {
        //     fetch(` http://localhost:3000/rentalRequests`, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             title: _title,
        //             ref: _url,
        //             engine: _engine,
        //             price: `${_price} USD`
        //         }),
        //         headers: {
        //             "Content-type": "application/json"
        //         }
        //     }).then(
        //         resp => resp.json()
        //             .then(
        //                 resp => console.log(resp)
        //             )
        //     )    
        // }

    }
}
customElements.define ( "rent-element", rentElement )
