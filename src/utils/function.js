export function numberFormater(n, d) {
  if (n / 1000 < 10) return n.toLocaleString();
  let x = ("" + n).length,
    p = Math.pow;
  d = p(10, d);
  x -= x % 3;
  return Math.round((n * d) / p(10, x)) / d + " KMGTPE"[x / 3];
}

export function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
}

// ---- function definition ----
export function selectFile(contentType, multiple = false) {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = contentType; // image/* || audio/* || video/* || image/png, image/jpeg || .pdf || .png, .jpg, .jpeg

    input.onchange = (_) => {
      let files = Array.from(input.files);
      if (multiple) resolve(files);
      else resolve(files[0]);
    };

    input.click();
  });
}

export async function dataUrlToFile(
  dataUrl,
  fileName,
  defaultType = "image/png"
) {
  if (typeof window === "undefined") return; // make sure we are in the browser

  let response = await fetch(dataUrl);
  let blob = await response.blob();

  let metadata = {
    type: blob.type || defaultType,
  };

  let file = new File([blob], fileName, metadata);
  return file;
}

export function readFileToDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export function getWidthHeightImage(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
  });
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function getLocationFromHref(href) {
  var l = document.createElement("a");
  l.href = href;
  return `${l.hostname}/${l.pathname}`;
}

export function toSlug(str) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  // str = str.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  // str = str.replace(/-+/g, "-");

  // Xóa ký tự - liên tiếp
  str = str.replace(/\s\s+/g, " ");

  // xóa phần dư - ở đầu & cuối
  // str = str.replace(/^-+|-+$/g, "");

  // xoas khoang trang 2 dau
  str = str.trim();

  // return
  return str;
}

// const getImageUrl = async () => {
//   const dataUrl = editor.getImage().toDataURL()
//   const result = await fetch(dataUrl)
//   const blob = await res.blob()

//   return window.URL.createObjectURL(blob)
// }

// // Usage
// const imageURL = await getImageUrl()

// <img src={imageURL} ... />

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// }
// function methodName() {
//   let number = 1234567890;
//   let nf = new Intl.NumberFormat("en-US");
//   nf.format(number); // "1,234,567,890"
// }
// function nFormatter(num, digits) {
//   var si = [
//     { value: 1, symbol: "" },
//     { value: 1e3, symbol: "K" },
//     { value: 1e6, symbol: "M" },
//     { value: 1e9, symbol: "G" },
//     { value: 1e12, symbol: "T" },
//     { value: 1e15, symbol: "P" },
//     { value: 1e18, symbol: "E" },
//   ];
//   var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
//   var i;
//   // for negative value is work
//   for (i = si.length - 1; i > 0; i--) {
//     if (Math.abs(num) >= si[i].value) {
//       break;
//     }
//   }
//   return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
// }
