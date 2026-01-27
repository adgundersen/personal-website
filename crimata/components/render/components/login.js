import SmartForm from "./form.js";
import { isEmail, isPassword, isName } from "./control/valid.js";

const Login =
{
    components: {
        SmartForm
    },

    setup()
    {
        return { isEmail, isPassword, isName };
    },

    template: `
        <div id="login">

            <SmartForm 
                :fields="[{
                    name: 'email',
                    value: null,
                    placeholder: 'Email',
                    valid: isEmail
                },
                {
                    name: 'password',
                    value: null,
                    placeholder: 'Password',
                    valid: isPassword
                },
                {
                    name: 'name',
                    value: null,
                    placeholder: 'Name',
                    valid: isName
                }]"
                :channel="'auth'"
                :modifier="'Login or enter name to register.'"
            />

        </div>`
}

export default Login;
