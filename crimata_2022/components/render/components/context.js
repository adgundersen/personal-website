
const Context = 
{
    props: ["modifier", "context", "avatar", "id"],

    setup(props) {
        const playback = Vue.ref(false);

        Vue.onMounted(() => {
            window.mainApi.on("playback", (id, status) => {
                if (id === props.id) {
                    playback.value = status;
                }
            });
        });

        return { playback };
    },

    template: `
        <span :id="'context-' + id" :class="'context ' + modifier + '-context'">

            <img v-show="avatar" class="context-avatar" 
                :class="{ audio: playback }"
                :src="'data:image/png;base64,' + avatar" 
            />

            {{ context }}

        </span> `
}

export default Context;
