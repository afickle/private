Vue.component('modal', {
    template: '#modal-template'
})

var vm = new Vue({
    el: '#app',

    data: {
        showModal: false
    }
})