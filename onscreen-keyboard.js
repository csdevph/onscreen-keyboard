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

    init(inputContainer) {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.addEventListener("click", (e) => { e.stopPropagation() });
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");

        // setup Keyboard
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.main.appendChild(this.elements.keysContainer);
        document.querySelector('body').appendChild(this.elements.main);

        document.body.addEventListener('click', this.close);

        document.querySelector(inputContainer).addEventListener('click', function (event) {
            if (event.target.matches('.use-keyboard')) {
                event.stopPropagation();
                Keyboard.open(event.target.value,
                    currentValue => { event.target.value = currentValue }
                );
            }
        });
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
        // console.log('key event', this.eventHandlers[handlerName]);
        if (this.eventHandlers[handlerName] === null) return;
        if (typeof this.eventHandlers[handlerName] === "function")
            this.eventHandlers[handlerName](this.selectedValue);
    },

    open(initialValue, oninputHandler, oncloseHandler) {
        this.selectedValue = initialValue || "";
        this.eventHandlers.oninput = oninputHandler;
    },

    close() {
        // console.log('close');
        Keyboard.eventHandlers.oninput = null;
    }
};

console.log("###### Keyboard - The page has loaded succ.");
Keyboard.init('.mb-3');
