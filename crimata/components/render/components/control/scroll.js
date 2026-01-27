let el;

const scroll = () => {
    if (!el) {
        el = document.getElementById("messenger");
        window.addEventListener('resize', scroll);
    }
    el.scrollTo({
      top: el.scrollHeight - el.clientHeight,
      behavior: 'smooth'
    });
}

export default scroll;

// const isBottom = () => {
//   if (el) {
//     return el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
//   }
// }