class carElement extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow ({mode: 'open'})

        let carElementTemplate = document.getElementById('car-element')
        this.shadow.appendChild(
            carElementTemplate.content.cloneNode(true)
        )
      
        this.onclick = function(event) {
            let id = this.getAttribute('id')
            showInformationElement(id)  
        }
     
    }

    static get observedAttributes() {
        return [ 'img', 'title']
    }
    attributeChangedCallback( attrName, oldVal, newVal ){
        attrName === 'img' ? 
                this.shadow.querySelector("#car-image").src = newVal : null
        attrName === 'title' ? 
                this.shadow.querySelector("#car-title").innerText = newVal : null
    }

}
customElements.define ( "car-element", carElement )

function addCarElement (_title, _url, _engine, _price ) {
    fetch(` http://localhost:3000/carsInfo`, {
        method: 'POST',
        body: JSON.stringify({
            title: _title,
            ref: _url,
            engine: _engine,
            price: `${_price} USD`
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(
        resp => resp.json()
            .then(
                resp => console.log(resp)
            )
    )    
}

function deleteCarElement (number) {
    fetch ( `http://localhost:3000/carsInfo/${number}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        }
    })
       .then ( response => console.log ( 'response: ', response ) )    
}

function changeCarInfo (number,_title, _url, _engine, _price) {
    fetch(`http://localhost:3000/carsInfo/${number}`, {
        method: 'PUT',
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({
            title: _title,
            ref: _url,
            engine: _engine,
            price: `${_price} USD`     
        })    
    })    
}