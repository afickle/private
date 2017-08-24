function fix0(v) {
    return (v <= 9) ? ('0' + v) : v;
}
/**
 * timestamp to yyyy-mm-dd hh:mm:ss
 * @param  {[type]} t         [timestamp]
 * @param  {[type]} date_only [1 -> yyyy-mm-dd]
 */
function conv_time(t, date_only) {
    // var d = new Date( Number(t) );
    if (!t || t.toString().indexOf('-') >= 0) return t;

    var d = new Date(t);
    var date = d.getFullYear() + '-' +
        fix0(d.getMonth() + 1) + '-' +
        fix0(d.getDate());
    var time = fix0(d.getHours()) + ':' +
        fix0(d.getMinutes()) + ':' +
        fix0(d.getSeconds());
    // time = time.slice(0, time.indexOf("."));
    return date_only ? date : (date + ' ' + time);
}

function timestamp(data, fields, date_only) {
    // if (angular.isArray(data)) {
    //     for (var i in data) {
    //         for (var j in fields) {
    //             data[i][fields[j]] = conv_time(data[i][fields[j]], date_only);
    //         }
    //     }
    // } else {
        return conv_time(data, !!fields)
    // }
}
