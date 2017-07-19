// 中文
var regChinese = /[\u4e00-\u9fa5]/;
console.log(regChinese.test('wo'));
console.log(regChinese.test('我'));

var fibonacci = function(n) {
    let array = [0, 1];
    for (let i = 2; i <= n; i++) {
        let index = i % 2;
        array[index] = array[0] + array[1];
    }
    return array[n % 2];
}
