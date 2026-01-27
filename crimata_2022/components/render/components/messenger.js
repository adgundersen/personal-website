import onDrop from "./control/drop.js";
import scroll from "./control/scroll.js";

import WS from "./ws.js";
import Input from "./input.js";
import Settings from "./settings.js";
import Message from "./message.js";

const Messenger = {

    components: {
        WS,
        Settings,
        Message,
        Input
    },

    setup()
    {
        const person = Vue.ref("");
        const messages = Vue.ref([]);

        let current = Vue.ref();

        Vue.onMounted(() => {

            window.mainApi.on("message", (update) => {

                if (update.person)
                {
                    person.value = update.person;
                    messages.value = update.messages;
                    current.value = messages.value.at(-1);
                }
                else if (update.name)
                {
                    person.value = update.name;
                }
                else if (update.modifier)
                {
                    messages.value.push(update); 
                    current.value = update;
                }
                else if (update.category)
                {
                    current.value.content.push(update);
                }
                else if (update.context)
                {
                    current.value.context = update.context;
                }
                else
                {
                    current.value.content.at(-1).text = update.text;
                }

                setTimeout(scroll, 10);
                
            });

            window.mainApi.send("messenger");
        });

        return { person, messages, onDrop };
    },

    template: `
        <Settings />
        <WS />
        <Input :person="person" />

        <div id="messenger"
            @drop="onDrop($event)"
            @dragover.prevent
            @dragenter.prevent
        >

            <Message 
                v-for="message in messages" 
                v-bind="message" 
            />
            
        </div>`
}

export default Messenger;
