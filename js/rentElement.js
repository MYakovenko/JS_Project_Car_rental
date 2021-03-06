class rentElement extends HTMLElement {
    constructor () {
        super()
        var shadow = this.attachShadow ({mode: "open"})

        const rentElementTemplate = document.getElementById('rent-element')
        shadow.appendChild(
            rentElementTemplate.content.cloneNode(true)
        )

        function getElements (shadowChildren) {
            let formElem = {}
            let element = Array.from(shadowChildren)
            element.forEach ( item => Object.assign(formElem,  {[item.id]: item})) 
            return formElem
        }

        const rentForm = shadow.querySelector("form")
        const rentButtons = shadow.querySelector(".button-wrapper")

        const rentElements = Object.assign({}, 
            getElements(rentForm.children),
            getElements(rentButtons.children)
        )
              
        function addOption (arr, parentElem) {
            arr.forEach(
                place => {
                    let option = document.createElement ( 'option' )
                    parentElem.appendChild ( option )
                    option.value = option.innerHTML = place
                }
            )
        }

        addOption(rentCarCities, rentElements["city-select"])

        rentElements["city-select"].onchange = function (event) {
            rentElements["place-select"].innerHTML = ""
            addOption(rentCarPlaces[event.target.value], rentElements["place-select"])
        }
        
        function checkXSSAtack (text) {
            var result = text.split("<").join("&lt;")
            return result
        }

        function chengeElementStyle (elem) {
            elem.setAttribute("style", `border: 2px solid #F59D9D;`)
        }

        function showError (errorElem, errorText) {
            errorElem.textContent = errorText
        }

        function emailValidation (value) {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            var result = reg.test(value)
            return result
        }

        function phoneValidation (value) {
            var reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
            var result = reg.test(value)
            return result
        }

        function removeElement (elem) {
            elem.parentNode.removeChild (elem)
            document.body.classList.remove("stop-scroling")
        }

        rentElements["input-name"].onchange = function (event) {
            event.target.value = checkXSSAtack(event.target.value)
        }

        rentElements["input-email"].onchange = function (event) {
            event.target.value = checkXSSAtack(event.target.value)
            rentElements["email-error"].textContent = ""
            event.target.setAttribute("style", ``)

            if (emailValidation (event.target.value) === false) {
                chengeElementStyle(event.target)
                showError(rentElements["email-error"], "Enter a valid email")
            }
        }

        rentElements["input-phone"].onchange = function (event) {
            event.target.value = checkXSSAtack(event.target.value)
            rentElements["phone-error"].textContent = ""
            event.target.setAttribute("style", ``) 

            if (phoneValidation (event.target.value) === false) {
                chengeElementStyle(event.target)
                showError(rentElements["phone-error"], "Enter a valid phone number")
            }
        }

       var datаReady = false;

        function formValidation () {
            !(rentElements["input-name" && "input-email" && "input-phone" && "pick-up-date" && "drop-off-date"].value) ? null :
                !emailValidation(rentElements["input-email"].value) ? null :
                    !phoneValidation(rentElements["input-phone"].value) ? null :
                        datаReady = true 
        }
    
        rentElements["cancel-btn"].onclick = function ( event ) {
            removeElement(this)
            event.preventDefault()
        }.bind(this)

        rentElements["process-btn"].onclick = function (event) {
            rentElements["main-error"].textContent = "";
            formValidation()
            if (!datаReady) { 
                showError (rentElements["main-error"], "Fill out all requered filds")
            } else {
                addPostRequest(
                    rentElements["input-name"].value, 
                    rentElements["input-email"].value, 
                    rentElements["input-phone"].value, 
                    rentElements["city-select"].value,
                    rentElements["place-select"].value,
                    rentElements["pick-up-date"].value,
                    rentElements["drop-off-date"].value,
                    rentElements["pick-up-time"].value,
                    rentElements["drop-off-time"].value
                )
                removeElement(this)
                addElem ("rental-confirmation", document.querySelector('.cars-wrapper'))
            }
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
