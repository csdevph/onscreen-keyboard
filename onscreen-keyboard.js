const Keyboard = {
    selectedElement: null,
    selectedValue: "",
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },

    init() {
        // Create main elements
        Keyboard.elements.main = document.createElement("div");
        Keyboard.elements.keysContainer = document.createElement("div");

        // Setup main elements
        Keyboard.elements.main.classList.add("keyboard");
        Keyboard.elements.keysContainer.classList.add("keyboard__keys");

        // Keyboard._setupKeyboard();
        Keyboard.elements.keysContainer.appendChild(Keyboard._createKeys());
        Keyboard.elements.main.appendChild(Keyboard.elements.keysContainer);
        document.querySelector('body').appendChild(Keyboard.elements.main);

        document.addEventListener('click', function (event) {
            if (event.target.matches('input[type="number"],input[type="text"]')) {
                Keyboard.selectedElement = event.target;
                Keyboard.open(event.target.value,
                    currentValue => {
                        event.target.value = currentValue;
                    });
            }
        }, true);
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
                            this.selectedValue = this.selectedValue.substring(0, this.selectedValue.length - 1);
                            this._triggerEvent("oninput");
                        });
                        break;

                    case "enter":
                        // keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHTML("keyboard_return");

                        keyElement.addEventListener("click", () => {
                            this.selectedValue += "\n";
                            this._triggerEvent("oninput");
                        });
                        break;

                    case "done":
                        keyElement.classList.add("keyboard__key--dark");
                        keyElement.innerHTML = createIconHTML("check_circle");

                        keyElement.addEventListener("click", () => {
                            this.close();
                            // this._triggerEvent("onclose");
                        });
                        break;

                    default:
                        keyElement.textContent = key;
                        keyElement.addEventListener("click", () => {
                            this.selectedValue += key;
                            this._triggerEvent("oninput");

                            // Propagate Keyboard event ???
                            // this._fireKeyEvent();
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
        console.log(handlerName);
        console.log(this.eventHandlers[handlerName]);
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.selectedValue);
        }
    },

    open(initialValue, oninput, onclose) {
        this.selectedValue = initialValue || "";
        this.eventHandlers.oninput = oninput;
        // this.eventHandlers.onclose = onclose;
    },

    close() {
        this.selectedValue = "";
        this.selectedElement = null;
        this.eventHandlers.oninput = null;
        // this.eventHandlers.onclose = onclose;
    }
};

setTimeout(function () {
    console.log("###### Keyboard -  The page has loaded succ.");
    Keyboard.init();
}, 500);
