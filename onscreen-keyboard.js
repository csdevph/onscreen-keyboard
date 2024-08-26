const Keyboard = {
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
    keyLayout: [
        ["7", "8", "9", "+"],
        ["4", "5", "6", "backspace"],
        ["1", "2", "3", "0"]
    ],

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

        document.body.addEventListener('click', function (event) {
            if (event.target.matches('input[type="number"],input[type="text"]')) {
                Keyboard.open(event.target.value,
                    currentValue => { event.target.value = currentValue }
                );
            }
        }, true);
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        this.keyLayout.forEach(keyRow => {
            keyRow.forEach(key => {
                const keyElement = document.createElement("button");

                // Add attributes/classes
                keyElement.setAttribute("type", "button");
                keyElement.classList.add("keyboard__key");

                switch (key) {
                    case "backspace":
                        keyElement.innerHTML = createIconHTML("backspace");

                        keyElement.addEventListener("click", () => {
                            this.selectedValue = this.selectedValue.substring(0, this.selectedValue.length - 1);
                            this._triggerEvent("oninput");
                        });
                        break;

                    case "enter":
                        keyElement.innerHTML = createIconHTML("keyboard_return");

                        keyElement.addEventListener("click", () => {
                            this.selectedValue += "\n";
                            this._triggerEvent("oninput");
                        });
                        break;

                    case "done":
                        keyElement.innerHTML = createIconHTML("check_circle");

                        keyElement.addEventListener("click", () => {
                            this.close();
                        });
                        break;

                    default:
                        keyElement.textContent = key;

                        keyElement.addEventListener("click", () => {
                            this.selectedValue += key;
                            this._triggerEvent("oninput");
                        });
                        break;
                }
                fragment.appendChild(keyElement);

            });
            fragment.appendChild(document.createElement("br"));
        });
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] !== "function") {
            console.log(this.eventHandlers[handlerName]);
            return;
        }
        this.eventHandlers[handlerName](this.selectedValue);
    },

    open(initialValue, oninputHandler, oncloseHandler) {
        this.selectedValue = initialValue || "";
        this.eventHandlers.oninput = oninputHandler;
        // this.eventHandlers.onclose = oncloseHandler;
    },

    close() {
        this.selectedValue = "";
        this.eventHandlers.oninput = null;
        // this.eventHandlers.onclose = onclose;
    }
};

setTimeout(function () {
    console.log("###### Keyboard -  The page has loaded succ.");
    Keyboard.init();
}, 500);
