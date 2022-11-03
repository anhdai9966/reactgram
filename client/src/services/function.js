function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function methodName() {
  let number = 1234567890;
  let nf = new Intl.NumberFormat("en-US");
  nf.format(number); // "1,234,567,890"
}

export function numberFormater(n, d) {
  if (n / 1000 < 10) return n.toLocaleString() 
  var x = ("" + n).length,
    p = Math.pow,
    d = p(10, d);
  x -= x % 3;
  return Math.round((n * d) / p(10, x)) / d + " KMGTPE"[x / 3];
}

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  // for negative value is work
  for (i = si.length - 1; i > 0; i--) {
    if (Math.abs(num) >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
