let filesURL = [];
let promises = [];
if (this.state.files_to_upload.length > 0) {
  for (let i = 0; i < this.state.files_to_upload.length; i++) {
    promises.push(this.uploadFilesOnServer(this.state.files_to_upload[i]));
  }

  Promise.all(promises).then(function (result) {
    console.log(result);
    result.map((file) => {
      filesURL.push(file);
    });
  });
  console.log(filesURL);
}
const uploadedFilesURL = filesURL;
console.log(uploadedFilesURL);

uploadFilesOnServer(file);
{
  let files = [];
  let file_id = "";

  const image = file;
  getImageUrl().then((response) => {
    const data = new FormData();
    data.append("file-0", image);
    const { upload_url } = JSON.parse(response);
    console.log(upload_url);

    updateProfileImage(upload_url, data).then((response2) => {
      const data2 = JSON.parse(response2);
      file_id = data2;
      console.log(file_id);
      files.push(file_id);
      console.log(files);
    });
  });
  return files;
}

Promise.all(promises)
  .then(function (result) {
    console.log(result);
    result.map((file) => {
      filesURL.push(file);
    });
    return true; // return from here to go to the next promise down
  })
  .then(() => {
    console.log(filesURL);
    const uploadedFilesURL = filesURL;
    console.log(uploadedFilesURL);
  });
