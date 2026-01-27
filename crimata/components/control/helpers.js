function simulateTyping(text)
{
    const inputEl = document.getElementById("input-text");

    const arr = [...text];
    arr.push("Enter");

    for (let i = 0; i <= arr.length - 1; i++) {
        setTimeout(() => {
            window.dispatchEvent(new KeyboardEvent("keydown", {"key": arr[i]} ))
            inputEl.value += arr[i];
        }, i*100);
    }
}

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

async function loadB64(url)
{
    const data = await toDataURL(url);
    return data.split(",")[1];
}

const contactToHTML = async (name, email, photo) => `
    <ul class='contacts'>
       <li>
           <img src='${await toDataURL(photo)}' />
           <div class='info'><div>${name}</div>
           <div class='email'>${email}</div>
       </li>
   </ul>`


export { simulateTyping, loadB64, contactToHTML };
