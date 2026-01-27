const inputLength = 230;

const metaKeys = [
    "Tab",
    "CapsLock",
    "Shift",
    "Control",
    "Alt",
    "Meta",
    " ",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Enter",
    "Backspace",
    "Escape"
];

function useText(elementId, parentId, left)
{
    let el;
    let parent;

    const show = Vue.ref(false);
    const leftSide = Vue.ref(false);

    const calcSide = () => {
        parent.clientWidth - left.value < inputLength ? leftSide.value = true : leftSide.value = false;
    }

    /* handle user typing */
    Vue.onMounted(() => {

        el = document.getElementById(elementId);
        parent = document.getElementById(parentId);

        window.addEventListener("keydown", (e) => {

            if (!show.value && !metaKeys.includes(e.key) && !e.ctrlKey)
            {
                show.value = true;
            }
            else if (show.value && ((el.value.length === 1 && e.key === "Backspace") || e.key === "Escape"))
            {
                show.value = false;
            }

            if (e.key === "Enter" && el.value)
            {
                if (el.value.length >= 250) {
                    alert("250 character limit")
                    return;
                }

                window.mainApi.send("message", { 
                    category: "text", 
                    text: el.value,
                    blob: null
                });

                show.value = false;
            }
        });

        calcSide();

    });

    Vue.watch(left, calcSide);

    Vue.watch(show, (c, _p) => {
        if (c) { 
            el.focus();
        } else { 
            el.value = "";
            el.blur();
        }
    });

    return { leftSide, show };
}

export default useText;
