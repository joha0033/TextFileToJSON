const fs = require('file-system')

const files = ['./orders2.txt', './orders.txt']

var output = files.map((file) => {
  return fs.readFileSync(file, 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split('\t'))
  .reduce((customers, line) => {

    customers[line[0]] = customers[line[0]] || []
    customers[line[0]].push({
      name: line[1],
      price: line[2],
      quantity: line[3]
    })
    return customers
  }, {})
}).reduce((acc, x) => {
  
  for (let key in x)
    !acc[key]
      ? acc[key] = x[key]
      : acc[key] = acc[key].concat(x[key])

  return acc
}, {});

console.log(JSON.stringify(output, null, 2));
