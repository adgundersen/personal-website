
// Basic debounce implentation
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

/**
 * Dynamic form component with auto submission and validation.
 * 
 * props
 *     .fields => List of field objects
 *     .channel => e.g. "/login"
 *     .modifier => Form description
 */
const SmartForm = 
{
    props: ["fields", "channel", "modifier"],

    setup(props)
    {
        // Error log below form
        const log = Vue.ref(props.modifier);

        /**
         * Valid and submit form data to channel.
         */
        const submit = async () => {

            // Validate each field
            for (let field of props.fields) {
                const error = field.valid(field.value);
                if (error) return error;
            }

            // Reduce fields into the form
            const form = props.fields.reduce((v, n) => {
                v[n.name] = n.value;
                return v;
            }, {});

            console.log("Submitting =>", form);
            return await window.mainApi.invoke(props.channel, form);
        }

        /**
         * Wrapper for submit that is debounced and updates UI elements
         */
        const preSub = debounce(async () => {

            const error = await submit();

            log.value = error ? error : props.modifier

        }, 2000);

        return { preSub, log };
    },

    template: `
        <form id="smart-form" class="smart-form" v-on:input="preSub">

            <div v-for="field in fields" style="display:flex">

                <input type="text" class="text-field" 
                    v-model="field.value"
                    :name="field.name"
                    :placeholder="field.placeholder"
                />

            </div>

            <div class="smart-form-logs">{{ log }}</div>

        </form>`
}

export default SmartForm;



