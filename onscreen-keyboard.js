const Keyboard = {
    keyLayout: [
        ["7", "8", "9", "add"],
        ["4", "5", "6", "backspace"],
        ["1", "2", "3", "0"]
    ],

    functionKeyHandler: null,
    selectedTarget: null,

    init(inputContainer) {
        // Create keyboard elements
        const keysContainer = document.createElement("div");
        keysContainer.classList.add("keyboard");
        keysContainer.addEventListener("click", (e) => { e.stopPropagation() });
        keysContainer.appendChild(this._createKeys());
        document.querySelector('body').appendChild(keysContainer);

        document.addEventListener('click', this.unplug);

        document.querySelector(inputContainer).addEventListener('click', (event) => {
            if (!event.target.matches('.use-keyboard')) return;
            event.stopPropagation();
            event.target.readOnly = true;
            Keyboard.plugInto(event.target);
        });
        console.log("### Keyboard available now...");
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<svg class="svg-icon"><title>${icon_name}</title><use href="sprite.svg#${icon_name}"></use></svg>`;
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
                            if (!this.selectedTarget) return;
                            this.selectedTarget.value = this.selectedTarget.value.substring(0, this.selectedTarget.value.length - 1);
                            this.triggerInputEvent();
                        });
                        break;

                    case "add":
                        keyElement.innerHTML = createIconHTML("add");
                        keyElement.addEventListener("click", this.functionKeyHandler);
                        break;

                    default:
                        keyElement.textContent = key;
                        keyElement.addEventListener("click", () => {
                            if (!this.selectedTarget) return;

                            // si on dépasse la taille maxi on remet le champ à vide 
                            if (this.selectedTarget.maxLength > 0 &&
                                this.selectedTarget.value.length >= this.selectedTarget.maxLength)
                                this.selectedTarget.value = "";

                            this.selectedTarget.value += key;
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

        if (!this.selectedTarget) return;
        this.selectedTarget.dispatchEvent(evt);
    },

    plugInto(target) {
        Keyboard.unplug();
        Keyboard.selectedTarget = target;
        Keyboard.selectedTarget.classList.toggle('input--focus', true);
    },

    unplug() {
        if (Keyboard.selectedTarget)
            Keyboard.selectedTarget.classList.toggle('input--focus', false);
        Keyboard.selectedTarget = null;
    }
};
