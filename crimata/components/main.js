import "./control/preload.js";
import Demo from "./control/demo.js";
import timeline from "./control/timeline.js";
import { simulateTyping } from "./control/helpers.js";

import App from "./render/components/app.js";
import Note from "./note.js";
import Menu from "./menu.js";

window.path = "./components/render/";

const demo = new Demo(timeline);

const Main =
{
    components: {
        Menu,
        App,
        Note
    },

    setup()
    {
        const notes = Vue.ref([]);

        window.mainApi.on("note", (note) => notes.value.push(note));

        window.mainApi.on("next", () => {

            const actions = demo.next();

            actions.forEach(action => {

                setTimeout(() => {

                    if (action.name == "type") {
                        simulateTyping(action.data);
                        return;
                    }

                    window.mainApi.emit(action.name, action.data);

                }, action.time * 1000);

            });

        });

        window.mainApi.emit("next", false);

        return { notes };
    },

    template: `

        <Menu />

        <div id="main-window">

            <App />

        </div>

        <Note v-for="note in notes" v-bind="note" />

        <div id="main-copyright">Crimata Technologies 2022</div>`
}

export default Main;
