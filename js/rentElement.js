class rentElement extends HTMLElement {
    constructor () {
        super()
        var shadow = this.attachShadow ({mode: "open"})

        let rentElementTemplate = document.getElementById('rent-element')
        shadow.appendChild(
            rentElementTemplate.content.cloneNode(true)
        )

        this.findFormElement = function (tagName) {
             let element = Array.from(shadow.children[0].children[1].children[0]).filter(
                (elem) => elem.tagName === `${tagName.toUpperCase()}`
            )
            return element
        }

        let citySelect = this.findFormElement("SELECT")[0]
        let placeSelect = this.findFormElement("SELECT")[1]
       
        function addOption (arr, parentElem) {
            arr.forEach(
                place => {
                    let option = document.createElement ( 'option' )
                    parentElem.appendChild ( option )
                    option.value = option.innerHTML = place
                }
            )
        }

        addOption(rentCarCities, citySelect)

        citySelect.onchange = function (event) {
            placeSelect.innerHTML = ""
            event.target.value === "Kiev" ? addOption(rentCarPlaces.Kiev, placeSelect) : 
                event.target.value === "Kharkiv" ? addOption(rentCarPlaces.Kharkiv, placeSelect) : 
                    event.target.value === "Lviv" ? addOption(rentCarPlaces.Lviv, placeSelect) :
                        event.target.value === "Odessa" ? addOption(rentCarPlaces.Odessa, placeSelect) :
                            null
        }

        let nameInput = this.findFormElement("INPUT")[0]
        let emailInput = this.findFormElement("INPUT")[1]
        let phoneInput = this.findFormElement("INPUT")[2]
        let pickUpDate = this.findFormElement("INPUT")[3]
        let dropOffDate = this.findFormElement("INPUT")[4]
        let pickUpTime = this.findFormElement("INPUT")[5]
        let dropOffTime = this.findFormElement("INPUT")[6]
        

        nameInput.onchange = function (event) {
            event.target.value = event.target.value.split("<").join("&lt;")
        }

        emailInput.onchange = function (event) {
            let error = shadow.children[0].children[1].children[0].children[4]
            error.textContent = ""
            event.target.setAttribute("style", ``) 
            event.target.value = event.target.value.split("<").join("&lt;")
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            if (reg.test(event.target.value) === false)  {
                event.target.setAttribute("style", `border: 2px solid #F59D9D;`) 
                error.textContent = "Enter a valid email"
            }
        }.bind(this)

        phoneInput.onchange = function (event) {
            let error = shadow.children[0].children[1].children[0].children[8]
            error.textContent = ""
            event.target.setAttribute("style", ``) 
            event.target.value = event.target.value.split("<").join("&lt;")
            var reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
            if (reg.test(event.target.value) === false)  {
                event.target.setAttribute("style", `border: 2px solid #F59D9D;`) 
                error.textContent = "Enter a valid phone number"
            }
        }.bind(this)

        const cancelButton = shadow.children[0].children[1].children[1].children[0]
        const proceedButton = shadow.children[0].children[1].children[1].children[1]

        cancelButton.onclick = function ( event ) {
            this.parentNode.removeChild (this)
            event.preventDefault()
        }.bind(this)

        proceedButton.onclick = function (event) {
            let error = shadow.children[0].children[1].children[0].children[26]
            error.textContent = ""
            nameInput.value === "" || emailInput.value === "" || phoneInput.value === "" ? 
                error.textContent = "Fill out all requered filds" : null
 
                addPostRequest(
                    nameInput.value, 
                    emailInput.value, 
                    phoneInput.value, 
                    citySelect.value,
                    placeSelect.value,
                    pickUpDate.value,
                    dropOffDate.value,
                    pickUpTime.value,
                    dropOffTime.value
                    )
        }.bind(this)

        function addPostRequest (_name, _email, _phone, _city, _place, _pickUpDate, _dropOffDate, _pickUpTime, _dropOffTime) {
            fetch(` http://localhost:3000/rentalRequests`, {
                method: 'POST',
                body: JSON.stringify({
                    requestCreation: new Date().toLocaleString(),
                    name: _name,
                    email: _email,
                    phone: _phone,
                    city: _city,
                    place: _place,
                    pickUpDate: _pickUpDate,
                    dropOffDate: _dropOffDate,
                    pickUpTime: _pickUpTime,
                    dropOffTime: _dropOffTime
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

    }
}
customElements.define ( "rent-element", rentElement )
