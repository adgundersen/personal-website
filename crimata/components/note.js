import noteControl from "./control/note.js";

const Note =
{
    props: ["title", "content", "nextWording", "control", "id"],

    setup(props)
    {
        return noteControl(props.id, ...Object.values(props.control));
    },

    template: `
        <div :id="'note-' + id" class="note note-pulse"
            :style="{ top: noteY, left: noteX }"
        >
          
            <div :id="'note-info-' + id" class="note-info">

                <div class="note-title">{{ title }}</div>
                <div class="note-content">{{ content }}</div>

                <button class="next-button button" @click="next">
                    {{ nextWording }}
                </button>

            </div>

        </div>`
}

export default Note;
