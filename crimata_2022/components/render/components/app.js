import Login from "./login.js";
import Splash from "./splash.js";
import Header from "./header.js";
import Messenger from "./messenger.js";

const account = Vue.ref(null);

const App =
{
    components: {
        Splash,
        Header,
        Messenger,
        Login
    },

    setup()
    {
        return { account };
    },

    template: `
        <div id="app" v-if="account !== null">

            <Header />

            <Messenger v-if="account"/>
            <Login v-else />

        </div>

        <Splash v-else />`
}

window.mainApi.on("account", (value, reason) => {
    if (reason) alert(reason);
    account.value = value;
});

export default App;
export { account };

// Is called when window is about to close or reload
window.onbeforeunload = () => console.log("beforeunload");
