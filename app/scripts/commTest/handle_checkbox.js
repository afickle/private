/**
 * 选中checkbox
 * @return {[type]} [description]
 */
vm.handler = (function() {
    function toggle() {
        var isCheck = paras.checkall;
        // console.log(isCheck)
        for (var i in vm.data) {
            vm.data[i]['checked'] = isCheck;
            // selectedId.push(vm.data[i].id);
        }
    }


    function check() {
        for (var i in vm.data) {
            if (!vm.data[i]['checked']) {
                paras.checkall = false;
                return;
            }
        }
        paras.checkall = true;
    }

    return { 'toggle': toggle, 'check': check }
}());