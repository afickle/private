function.call(thisArg, arg1, arg2, ...)

JSON.parse('{"p": "fg", "q": 5, "z": [{"x": 1}]}', (key, value) =>
  typeof value === 'number'
    ? value * 2 
    : value  
);

function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}
var foo = {foundation: 'Mozilla', week: 45, transport: 'car', month: 7};
JSON.stringify(foo, replacer);