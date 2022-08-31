import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './routes/'
import "./assets/main.scss"
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-teal/theme.css'
import './assets/styles/layout.scss';

import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import CodeHighlight from './AppCodeHighlight';

//Componnets
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage'
import Toast from 'primevue/Toast'


const mainApp = createApp(App);
mainApp.config.globalProperties.$appState = reactive({ theme: 'lara-light-teal', darkTheme: false });
mainApp.use(PrimeVue, {ripple:true, inputStyle: 'outlined'});
mainApp.use(router);
mainApp.use(ConfirmationService);
mainApp.use(ToastService);
mainApp.directive('tooltip', Tooltip);
mainApp.directive('ripple', Ripple);
mainApp.directive('code', CodeHighlight);
mainApp.directive('badge', BadgeDirective);
mainApp.directive('styleclass', StyleClass);

//components
mainApp.component("Button",Button);
mainApp.component("Checkbox",Checkbox);
mainApp.component("InputText",InputText);
mainApp.component("Password",Password);
mainApp.component("Dialog",Dialog);
mainApp.component("Message",Message);
mainApp.component("InlineMessage",InlineMessage);
mainApp.component("Toast",Toast);

mainApp.mount('#app');