
const WS =
{
    setup() 
    {
        const status = Vue.ref();

        Vue.onMounted(() => {

            window.mainApi.on("ws", (val) => {
                status.value = val;
            });

        }); 

        return { status, window }
    },

    template: `
        <div id="ws">

            <img id="ws-logo" :src="window.path + 'assets/connectLogo.svg'"
                :class="{ move: status }"
            >

            <div id="ws-dots"
                :class="{ move: status }"
            >
                <div class="ws-dot"></div>
            </div>

        </div> `
}

export default WS;