import useText from "./control/text.js";
import draggify from "./control/draggify.js";

const Input = 
{
    props: ["person"],

    setup(props)
    {
        const initials = Vue.ref("");

        const recording = Vue.ref(false);

        const { elementX, elementY } =  draggify("input", "app", 15);

        const { leftSide, show } = useText("input-text", "app", elementX);

        window.mainApi.on("record", (status) => recording.value = status);

        Vue.watch(() => props.person, (c, _p) => initials.value = getInitials(c));

        return { initials, elementX, elementY, recording, leftSide, show };
    },

    template: `
        <div id="input" :class="{ audio: recording }"
            :style="{ top: elementY + 'px', left: elementX + 'px' }"
        >

            <div id="input-icon">{{ initials }}</div>

            <input 
                id="input-text" type="text"
                :class="[
                    { leftSide: leftSide }, 
                    { show: show }, 
                    { recording: recording }
                ]"
            />

        </div> `
}

function getInitials(name)
{
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    return (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
}

export default Input;
