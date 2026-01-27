const Header =
{
    setup() {
        const onNavBar = (command) => window.mainApi.send("nav", command);
        return { onNavBar };
    },

    template: `
    <button id="header-titlebar" />

    <span id="header-menu">
        <button
            class="header-menu-button header-exit-button button"
            @click.prevent="onNavBar('close')"
        />
        <button
            class="header-menu-button header-min-button button"
            @click.prevent="onNavBar('min')"
        />
    </span> `
}

export default Header;