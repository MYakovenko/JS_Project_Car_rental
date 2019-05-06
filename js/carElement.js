class carElement extends HTMLElement {
    constructor() {
        super()
        var shadow = this.attachShadow ({mode: 'open'})

        let carElementTemplate = document.getElementById('car-element')
        shadow.appendChild(
            carElementTemplate.content.cloneNode(true)
        )
      
        function getElements (shadowChildren) {
            let formElem = {}
            let element = Array.from(shadowChildren)
            element.forEach ( item => Object.assign(formElem,  {[item.id]: item})) 
            return formElem
        }

        this.carElements = getElements(shadow.children[0].children)

        this.onclick = function(event) {
            let id = this.getAttribute('id')
            showInformationElement(id)  
        }
     
    }
    setImage (url) {
        this.carElements["car-image"].src = url
    }

    setTitle(text) {
        this.carElements["car-title"].textContent = text
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