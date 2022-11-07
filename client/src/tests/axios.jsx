import axios from "axios";
import { useRef } from "react";
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
// axios.get('http://103.237.147.34:8888/api/v1/users/1/files')
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

// axios.post('http://103.237.147.34:8888/api/v1/users/1/files', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

function Axios() {
  const inputFileRef = useRef();
  const handleUpload = () => {
    const file = inputFileRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (event) => {
      const url = event.target.result;
      const formData = new FormData();
      formData.append("file", url);
      axios({
        method: "post",
        url: "http://103.237.147.34:8888/api/v1/users/1/files",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((data) => {
        console.log(data.data);
      });
    });
  };

  const handler = (e) => {
    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (event) => {
      const url = event.target.result;
      fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file2 = new File([blob], "File name",{ type: "image/png" })
        console.log(file2)
      })
    });
  };

  return (
    <>
      <input type="file" multiple ref={inputFileRef} onChange={handler} />
      <button onClick={handleUpload}>upload</button>
    </>
  );
}

export default Axios;
