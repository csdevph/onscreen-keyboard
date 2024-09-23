const Keyboard = {
    elements: {
        main: null,
        keysContainer: null
    },
    keyLayout: [
        ["7", "8", "9", "+"],
        ["4", "5", "6", "backspace"],
        ["1", "2", "3", "0"]
    ],

    oninputHandler: null,
    selectedValue: "",

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
        console.log("###### Keyboard available now.");
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
                            this._triggerEvent();
                        });
                        break;
                }
                fragment.appendChild(keyElement);

            });
            fragment.appendChild(document.createElement("br"));
        });
        return fragment;
    },

    _triggerEvent() {
        if (this.oninputHandler === null) return;
        if (typeof this.oninputHandler === "function")
            this.oninputHandler(this.selectedValue);
    },

    open(initialValue, handler) {
        this.selectedValue = initialValue || "";
        this.oninputHandler = handler;
    },

    close() {
        Keyboard.oninputHandler = null;
    }
};
