var data = {
    name: 'My Tree',
    children: [
        { name: 'hello' },
        { name: 'wat' },
        {
            name: 'child folder',
            children: [
                {
                    name: 'child folder',
                    children: [
                        { name: 'hello' },
                        { name: 'wat' }
                    ]
                },
                { name: 'hello' },
                { name: 'wat' },
                {
                  name: 'child folder',
                  children: [
                        { name: 'hello' },
                        { name: 'wat' }
                    ]
                }
            ]
        }
    ]
}

Vue.component('tree', {
    template: '#tree-template',

    props: {
        model: Object
    },

    data: function() {
        return {
            open: false
        }
    },

    // 计算属性
    computed: {
        isFolder: function() {
            return this.model.children && this.model.children.length
        }
    },

    methods: {
        toggle: function() {
            if (this.isFolder) {
                this.open = !this.open;
            }
        },

        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', []);
                this.addChild();
                this.open = true;
            }
        },

        addChild: function() {
            this.model.children.push({
                name: 'new Stuff'
            })
        }
    }
})

var vm = new Vue({
    el: '#app',

    data: {
        treeData: data
    }
})