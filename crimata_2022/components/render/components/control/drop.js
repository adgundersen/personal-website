const onDrop = async (e) => {
    const file = e.dataTransfer.items[0].getAsFile();

    if (file.size >= 1 * 1000 * 1000) {
        alert("File must be under 1MB.");
        return;
    }

    const buffer = await file.arrayBuffer();
    const b64String = await window.mainApi.invoke("encode", buffer);

    let category = "file";
    if (file.type.startsWith("image/")) {
        category = "image"
    }

    window.mainApi.send("message", {
        category: category,
        text: file.name,
        blob: b64String
    });
}

export default onDrop;
