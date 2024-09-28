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

    selectedTarget: null,
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

        document.addEventListener('click', this.unplug);

        document.querySelector(inputContainer).addEventListener('click', (event) => {
            if (!event.target.matches('.use-keyboard')) return;
            event.stopPropagation();
            event.target.readOnly = true;
            Keyboard.plugInto(event.target);
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
                            this.triggerInputEvent();
                        });
                        break;

                    case "enter":
                        keyElement.innerHTML = createIconHTML("keyboard_return");

                        keyElement.addEventListener("click", () => {
                            this.selectedValue += "\n";
                            this.triggerInputEvent();
                        });
                        break;

                    case "done":
                        keyElement.innerHTML = createIconHTML("check_circle");

                        keyElement.addEventListener("click", () => {
                            this.unplug();
                        });
                        break;

                    default:
                        keyElement.textContent = key;

                        keyElement.addEventListener("click", () => {
                            this.selectedValue += key;
                            this.triggerInputEvent();
                        });
                        break;
                }
                fragment.appendChild(keyElement);

            });
            fragment.appendChild(document.createElement("br"));
        });
        return fragment;
    },

    triggerInputEvent() {
        const evt = new InputEvent("input", {
            bubbles: true,      // default: false
            cancelable: true,   // default: false
            view: window        // default: null
        });

        if (this.selectedTarget === null) return;

        this.selectedTarget.value = this.selectedValue
        this.selectedTarget.dispatchEvent(evt);
    },

    plugInto(target) {
        Keyboard.selectedTarget = target;
        Keyboard.selectedValue = target.value || "";
    },

    unplug() {
        Keyboard.selectedTarget = null;
    }
};
