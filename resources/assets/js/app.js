require('./bootstrap');

window.Vue = require('vue');
window.axios = require('axios');
window.swal = require('sweetalert2');

const event = {
    bus: null,

    init() {
        if (!this.bus) {
            this.bus = new Vue();
        }

        return this;
    },

    emit(name, ...args) {
        this.bus.$emit(name, ...args);
        return this;
    },

    on() {
        if (arguments.length === 2) {
            this.bus.$on(arguments[0], arguments[1]);
        } else {
            Object.keys(arguments[0]).forEach(key => {
                this.bus.$on(key, arguments[0][key]);
            });
        }

        return this;
    },
}
export { event };
Vue.component('example', require('./components/Example.vue'));
Vue.component('contact', require('./components/Contact.vue'));
Vue.component('cform', require('./components/Form.vue'));
Vue.config.devtools = true;

const app = new Vue({
    el: '#app'
});
