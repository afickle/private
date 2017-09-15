var stats = [
    {label: 'A', value: 100},
    {label: 'B', value: 100},
    {label: 'C', value: 100},
    {label: 'D', value: 100},
    {label: 'E', value: 100}
];

function valueToPoint(value, index, total) {
    var x = 0;
    var y = -value * 0.8;
    var angle = Math.PI * 2 / total * index;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var tx = x * cos - y * sin + 100;
    var ty = x * sin + y * cos + 100;
    return {
        x: tx,
        y: ty
    }
}

Vue.component('chart', {
    template: '#chart-template',

    props: ['stats'],

    // 计算属性
    computed: {
        points: function() {
            var total = this.stats.length;
            return this.stats.map(function(stat, i) {
                var point = valueToPoint(stat.value, i, total);
                return point.x + ',' + point.y
            }).join(' ')
        }
    },

    components: {
        'axis-label': {
            props: {
                stat: Object,
                index: Number,
                total: Number
            },

            template: '#label-template',

            computed: {
                point: function() {
                    return valueToPoint(
                        + this.stat.value + 10,
                        this.index,
                        this.total
                    )
                }
            }
        }
    }
})

var vm = new Vue({
    el: '#app',

    data: {
        newLabel: '',
        stats: stats
    },

    methods: {
        add: function(e) {
            e.preventDefault();
            if (!this.newLabel) {return;}
            var obj = this.stats.map(function(item) {
                return item.label;
            });
            if (obj.indexOf(this.newLabel) >= 0) {
                this.newLabel = '';
                alert('Already Exist !');
                return;
            }
            this.stats.push({
                label: this.newLabel,
                value: 100
            });
            this.newLabel = '';
        },

        remove: function(stat) {
            if (this.stats.length > 3) {
                this.stats.splice(this.stats.indexOf(stat), 1);
            }
            else {
                alert('Can Not Selete More !');
            }
        }
    }
})