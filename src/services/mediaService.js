import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "~/configs";

export function uploadImage(file, fileName) {
  return new Promise(function (resolve, reject) {
    try {
      const storageRef = ref(storage, fileName);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(url => {
          resolve(url);
        })
      });
    } catch (error) {
      reject(error);
    }
  });
}
