const Bubble =
{
    props: ["category", "text", "html", "blob", "modifier", "child"],

    setup(props)
    {
        const getUrl = () => {
            return `data:${props.category};base64,${props.blob}`;
        }

        Vue.onMounted(() => {

            const el = document.getElementById("messenger");

            setTimeout(() => {

                el.dispatchEvent(new CustomEvent('adjust-scroll'));

            }, 100);

        });

        if (!props.text) props.text = "..."; 

        return { getUrl };
    },

    template: `
        <div :class="'bubble ' + modifier + '-bubble ' + modifier +'-'+ child">

            <small class="bubble-notify" v-if="modifier=='ai'"></small>

            <p v-if="category=='text'">{{ text }}</p>

            <p v-else-if="category=='audio'">{{ text }}</p>

            <div v-else-if="category=='html'" v-html="html"></div>

            <img v-else-if="category == 'image'" :src="getUrl()" />

            <a v-else :download="text" :href="getUrl()">{{ text }}</a>

        </div>`
};

export default Bubble;

// TODO: should include other styling/actions for audio bubbles
