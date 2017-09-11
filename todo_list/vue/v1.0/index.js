Vue.filter('sum', function(item) {
    console.log(item)
})

var vm = new Vue({
    el: '#app',

    data: {
        items: [
            { 'text': 'item1' },
            { 'text': 'item2' }
        ],
        checkAll: false,
        showAll: false,
        item: '',
        sum: 0
    },

    methods: {
        addItem: function() {
            var obj = { 'text': this.item.trim() };
            this.items.push(obj);
            this.item = '';
        },

        removeItem: function(index) {
            this.items.splice(index, 1);
        },

        removeAll: function() {
            if (this.sum == this.items.length) {
                this.items = [];
                this.sum = 0;
            }
            else {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].checked) {
                        this.items.splice(i, 1);
                        i--;
                        this.sum--;
                    }
                }
            }
            this.checkAll = false;
            this.showAll = false;
        },

        toggle: function() {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].checked = this.checkAll;
            }
            this.showAll = this.checkAll;
            this.sum = this.checkAll ? this.items.length : 0;
        },

        check: function(item) {
            var len = this.items.length;
            this.sum = item.checked ? this.sum + 1 : this.sum - 1;
            this.checkAll = this.sum == len;
            this.showAll = this.sum > 0;
        },

        // how to keep this.items no change and change all the time
        showItems: function() {
            // all todos
        },

        showActive: function() {
            // undone todos
            var activeItems = [];
            for (var i = 0; i < this.items.length; i++) {
                if (!this.items[i].checked) {
                    activeItems.push(this.items[i]);
                }
            }
            // this.items = activeItems
        },

        showComplete: function() {
            var doneItems = [];
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].checked) {
                    doneItems.push(this.items[i]);
                }
            }
            // this.items = doneItems
        }
    }
})

/*
handler = (function() {
    function toggle() {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].checked = this.checkAll;
        }
    }

    function check() {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i]['checked']) {
                this.checkAll = false;
                return
            }
        }
        this.checkAll = true;
    }

    return { 'toggle': toggle, 'check': check }
}())
handler.toggle() && handler.check()
*/