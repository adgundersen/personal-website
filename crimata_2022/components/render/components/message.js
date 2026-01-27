import Bubble from "./bubble.js";
import Context from "./context.js";

const Message = 
{
    components: {
        Bubble,
        Context
    },

    props: ["modifier", "content", "context", "avatar", "id", "seen"],

    setup(props)
    {
        return { calcChild };
    },

    template: `
        <div :id="id" :class="'message ' + modifier + '-message'">

            <Bubble 
                v-for="(c, index) in content"
                :id="'bubble-' + id + '-' + index"
                :category="c.category"
                :text="c.text"
                :html="c.html"
                :blob="c.blob"
                :modifier="modifier"
                :child="calcChild(index, content.length)"
            />

            <Context
                :modifier="modifier"
                :context="context"
                :avatar="avatar"
                :id="id"
            />

        </div> `
}

function calcChild(index, len)
{
  if (len === 1)
  {
    return "none-child";
  } 
  else if (index === 0) 
  {
    return "first-child";
  } 
  else if (index === len - 1) 
  {
    return "last-child";
  } 
  else 
  {
    return "middle-child";
  }
}

export default Message;
