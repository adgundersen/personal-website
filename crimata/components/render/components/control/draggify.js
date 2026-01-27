const saveLocation = "input_item_position";
const defaultPosition = { x: 15, y: 400 };

//---Dragabble Helper Funcs--------------------------------------

// Calculate distance to nearest side.
function calcSideProximity (elementX, elementLength, winW) {

  // Calc right short.
  let short = winW - elementX - elementLength;

  // See if it's left short.
  if (elementX + 20 < winW / 2) {
    short = elementX
  }

  return short
}

// Update elementX or elementY value on window resize
function calcPosition (elementPosition, elementLength, percent, short, win) {

    // Is it close to the right/bottom side?
    if (percent > 0.75) {
        elementPosition = win - short - elementLength;
    }

    // Is it not close to a side?
    if (percent < 0.75 && percent > 0.25) {
        elementPosition = win * percent
    }

    return elementPosition
}

function draggify(elementId, parentId, margin) {

    let element;
    let parent;

    /* only compatible with elements having equal width and height */
    let elementLength;

    // Cords of inputItem.
    const elementX = Vue.ref();
    const elementY = Vue.ref();

    // Position of inputItem on terms of percentage of window.
    let percentX;
    let percentY;

    // How close inputItem is to closest X or Y side.
    let xShort;
    let yShort;

    //---Reposition Anime-----------------------------------------------

    // Move element to target smoothly.
    const repositionAnime = (xChange, yChange) => {

        const xStep = xChange / 1000;
        const yStep = yChange / 1000;

        for (let i = 1; i <= 1000; i++) {

          setTimeout(() => {
            elementX.value += xStep;
            elementY.value += yStep;
          }, 30) // 60fps

        }
    }

    //---Event Handlers-----------------------------------------------

    // Update the position of inputItem on mouse dragging.
    const onMouseMove = (e) => {
      e.preventDefault();

      elementX.value = element.offsetLeft + e.movementX;
      elementY.value = element.offsetTop + e.movementY;
    }

    // Add an event listener for dragging.
    const onMouseDown = (e) => {
      e.preventDefault();
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    // Update position references when user is done moving targetEl.
    const onMouseUp = (e) => {
      e.preventDefault();

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      // See if and calculate reposition.
      let x = 0; // vector change
      let y = 0;

      const winW = parent.clientWidth;
      const winH = parent.clientHeight;

      if (elementX.value < 0) {
        x = (elementX.value - margin)*-1
      }

      if (elementX.value > winW - elementLength) {
        const b = winW - elementLength - margin;
        x = (elementX.value - b)*-1
      }

      // Reposition y
      if (elementY.value < 0) {
        y = (elementY.value - margin)*-1
      }

      if (elementY.value > winH - elementLength) {
        const d = winH - elementLength - margin;
        y = (elementY.value - d)*-1
      }

      // Reposition if needed.
      if (x !== 0 || y !== 0) repositionAnime(x, y);

      xShort = calcSideProximity(elementX.value, elementLength, winW);
      yShort = calcSideProximity(elementY.value, elementLength, winH);

      // Update percentages.
      percentX = elementX.value / winW;
      percentY = elementY.value / winH;

      // Save position.
      savePosition();
    }

    // Update position of targetEl on windowResize.
    const onWindowResize = (_e) => {

      elementX.value = calcPosition(elementX.value, elementLength, percentX, xShort, parent.clientWidth);
      elementY.value = calcPosition(elementY.value, elementLength, percentY, yShort, parent.clientHeight);

      savePosition();
    }

    const savePosition = () => {
      window.localStorage.setItem(saveLocation, JSON.stringify({
        x: elementX.value,
        y: elementY.value
      }));
    }

    //---------------------------------------------------------------

    Vue.onMounted(() => {

      element = document.getElementById(elementId);
      parent = document.getElementById(parentId);

      elementLength = element.offsetWidth;

      // Initialize the positional references.
      percentX = elementX.value / parent.clientWidth;
      percentY = elementY.value / parent.clientHeight;

      xShort = calcSideProximity(elementX.value, elementLength, parent.clientWidth);
      yShort = calcSideProximity(elementX.value, elementLength, parent.clientHeight);

      // Then, we can listen for window resize (and mousedown).
      element.addEventListener("mousedown", onMouseDown);
      parent.addEventListener('resize', onWindowResize)
    });

    // remove event listeners on component dismount.
    Vue.onUnmounted(() => {
        element.removeEventListener('mousedown', onMouseDown);
        parent.removeEventListener('resize', onWindowResize)
        parent.removeEventListener('mouseup', onMouseUp)
        parent.removeEventListener('mousemove', onMouseMove);
    });

    // Try loading initPosition, otherwise set default values
    let initPosition;
    const rawData = window.localStorage.getItem("saveLocation")
    rawData ? initPosition = JSON.parse(rawData) : initPosition = defaultPosition;

    elementX.value = initPosition.x;
    elementY.value = initPosition.y;

    return { elementX, elementY };

}

export default draggify;
