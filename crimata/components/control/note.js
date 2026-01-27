function noteControl (id, anchor, x, y, right)
{
    let pin;
    let info;

    const noteX = Vue.ref('0');
    const noteY = Vue.ref('0');

    let anchorEl = document.getElementById(anchor);

    const margin = 15;
    let lastTranslate = 0;

    const anim = (element, right) => {

        const box = element.getBoundingClientRect(); // scaled to 0.3

        // Middle of pin.
        const offset = box.width / 2;

        // Distance to end of expanded info div.
        const end = (box.width / 0.3) + margin; // margin

        // Distance to edge of window.
        let edge = box.left + offset;

        if (right) {
            edge = window.innerWidth - (box.left + box.width);
        }

        // Distance expanded div is away from window edge.
        const criticalDistance = edge - end;

        // How much to translate on expand.
        let move = (offset / 0.3 + margin) * -1;

        if (right) {
            move = offset / 0.3 + margin;
        }

        // Handle for small windows.
        if (criticalDistance < 0) {

            move = ((offset / 0.3 + margin) * -1) - criticalDistance + margin;

            if (right) {
                move = (offset / 0.3 + margin) + criticalDistance - margin;
            }

        }

        anime({
            targets: element,
            opacity: [0, 1],
            translateX: [lastTranslate, move], // from where to where?
            scale: [0.3, 1],
            duration: 500,
            easing: 'easeOutExpo',
        });

        lastTranslate = move;

    };

    // Resize info on window resize.
    const shift = (_event) => {

        // Check the position of info to see if we need to move it.

        // Hove much to adjust x by.
        let move = null;

        // Distances from window edge and pin.
        let edge;
        let home;

        // Position of content and origin box.
        const pinBox = pin.getBoundingClientRect();
        const infoBox = info.getBoundingClientRect();

        if (right) {

            // Set edge and home.
            edge = window.innerWidth - infoBox.right;
            home = infoBox.left - pinBox.right;

            // Is box hitting right edge, move edge distance.
            if (edge <= 0) {
                move = lastTranslate + edge - margin; //<---
            }

            // Is box hitting pin with room to move, move home distance.
            else if ((edge > 0) && (home < 0)) {
                move = lastTranslate + edge - margin; //--->
            }

        }

        // Left side logic, conceptually the same.
        else {

            edge = infoBox.left;
            home = pinBox.left - infoBox.right;

            if (edge <= margin) {
                move = lastTranslate - edge + margin; //--->

            } else if ((edge > margin) && (home < 0)) {
                move = lastTranslate - edge + margin; //<---
            }

        }

        info.style.transform = `translateX(${move}px)`;
        lastTranslate = move;

    };

    const show = () => {
        info.style.display = "block";
        anim(info, right);
        pin.style.cursor = "auto";
        pin.removeEventListener("click", show);
        pin.classList.remove("note-pulse");
        window.addEventListener("resize", shift);
    };

    const next = () => {
        anime({
            targets: pin,
            opacity: [1, 0],
            duration: 500,
            easing: 'easeOutExpo',
            changeComplete: () => {
                window.mainApi.emit("next");
                pin.remove();
            }
        });
    };

    const follow = () => {
        const anchorBox = anchorEl.getBoundingClientRect();
        noteY.value = `${anchorBox.top + y}px`;
        noteX.value = `${anchorBox.left + x}px`;
    };

    Vue.onMounted(() => {

        // Get references to pin, info,, and anchor elements.
        pin = document.getElementById(`note-${id}`);
        info = document.getElementById(`note-info-${id}`);

        // listen for pin clicks
        pin.addEventListener("click", show);

        // update position every 10ms
        setInterval(follow, 10);

    });

    follow(); /* set the position */

    return { next, noteX, noteY };

}

export default noteControl;


