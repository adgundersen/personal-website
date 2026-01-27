
const Settings = 
{
    setup() {
        const active = Vue.ref(false);

        function hideSettings(e) {
            if (e.key == "Escape") {
                active.value = false;
                window.removeEventListener("keydown", hideSettings);
            }
        }

        function showSettings() {
            active.value = true;
            window.addEventListener("keydown", hideSettings);
        }

        const logout = async () => {
            await window.mainApi.send("logout");
        }

        return { showSettings, active, logout, window };
    },

    template: `
        <div v-if="active" id="settings">

            <button class="settings-logout-button button" @click="logout">
                Logout
            </button>

        </div>

        <button v-else class="settings-icon">
            <img :src="window.path + 'assets/settingsIcon.svg'">
        </button>`
}

export default Settings;