var apiURL = 'https://api.github.com/repos/vuejs/vue/commits';

var vm = new Vue({
    el: '#app',

    data: {
        branches:['master', 'dev'],
        currentBranch: 'master',
        perPage: 3,
        commits: null
    },

    created: function() {
        this.fetchData();
    },

    watch: {
        currentBranch: 'fetchData'
    },

    filters: {
        truncate: function(v) {
            var newline = v.indexOf('\n');
            return newline > 0 ? v.slice(0, newline) : v;
        },

        formatDate: function(v) {
            return v.replace(/T|Z/g, ' ');
        }
    },

    methods: {
        fetchData: function() {
            var xhr = new XMLHttpRequest();
            var self = this;

            xhr.open('GET', apiURL + '?per_page=' + self.perPage + '&sha=' + self.currentBranch);
            xhr.onload = function() {
                self.commits = JSON.parse(xhr.responseText);
                console.log(self.commits[0].html_url);
            }
            xhr.send();
        }
    }
})