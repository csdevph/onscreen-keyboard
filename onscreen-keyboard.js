const Keyboard = {
    selectedElement: null,
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: ""
    },

    init() {
        // Create main elements
        Keyboard.elements.main = document.createElement("div");
        Keyboard.elements.keysContainer = document.createElement("div");

        // Setup main elements
        Keyboard.elements.main.classList.add("keyboard");
        Keyboard.elements.keysContainer.classList.add("keyboard__keys");

        // Keyboard.elements.keys = Keyboard.elements.keysContainer.querySelectorAll(".keyboard__key");
        Keyboard._setupKeyboard();
        Keyboard.elements.main.appendChild(Keyboard.elements.keysContainer);
        document.querySelector('body').appendChild(Keyboard.elements.main);

        document.addEventListener('click', function (event) {
            if (event.target.matches('input[type="number"],input[type="text"]')) {
                // Keyboard._setupKeyboard();
                Keyboard.selectedElement = event.target;
                Keyboard.open(event.target.value, currentValue => {
                    event.target.value = currentValue;
                });
            }
        }, true);
    },

    _setupKeyboard() {
        Keyboard.elements.keysContainer.innerHTML = "";
        Keyboard.elements.keysContainer.appendChild(Keyboard._createKeys());
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            ["7", "8", "9", "backspace"],
            ["4", "5", "6", "done"],
            ["1", "2", "3", "0"]
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(keyRow => {
            keyRow.forEach(key => {
                const keyElement = document.createElement("button");

                // Add attributes/classes
                keyElement.setAttribute("type", "button");
                keyElement.classList.add("keyboard__key");

                switch (key) {
                    case "backspace":
                        // keyElement.classList.add("backspace-btn");
                        keyElement.innerHTML = createIconHTML("backspace");

                        keyElement.addEventListener("click", () => {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                            this._triggerEvent("oninput");
                        });
                        break;

                    case "enter":
                        // keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("keyboard_return");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this._triggerEvent("oninput");
                        });
                        break;

                    case "done":
                        keyElement.classList.add("keyboard__key--dark");
                        keyElement.innerHTML = createIconHTML("check_circle");

                        keyElement.addEventListener("click", () => {
                            this.close();
                            this._triggerEvent("onclose");
                        });
                        break;

                    default:
                        keyElement.textContent = key;
                        keyElement.addEventListener("click", () => {
                            this.properties.value += key;
                            this._triggerEvent("oninput");

                            // Propagate Keyboard event
                            this._fireKeyEvent();
                        });
                        break;
                }
                fragment.appendChild(keyElement);

            });
            fragment.appendChild(document.createElement("br"));
        });
        return fragment;
    },

    _fireKeyEvent() {
        let evt = new KeyboardEvent("input", {
            bubbles: true,
            cancelable: true,
            view: window
        });

        // Create and dispatch keyboard simulated Event
        if (this.selectedElement !== null) Keyboard.selectedElement.dispatchEvent(evt);
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            console.log(this.eventHandlers[handlerName]);
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        // this.elements.main.classList.remove("keyboard--hidden");

    },

    close() {
        this.properties.value = "";
        this.selectedElement = null;
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        // this.elements.main.classList.add("keyboard--hidden");
    }
};

setTimeout(function () {
    console.log("###### Keyboard -  The page has loaded succ.");
    Keyboard.init();
}, 500);
