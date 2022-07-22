const admin = require("firebase-admin");
const serviceAccount = require("./app-geslic-firebase-adminsdk-7vtkz-6e5988f4ce.json");


const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "app-geslic.appspot.com",
});

const firebaseStorage = app.storage().bucket();

const uploadFile = async (filename,directory,buffer ) => {

  const ref = `documents/${directory}/${filename}`;
  const fileRef = firebaseStorage.file(ref);
  const savedFile = await fileRef.save(buffer)
  return makeFilePublc(savedFile|| fileRef)
};
const makeFilePublc = async (reference) =>{
  return reference.makePublic()
}
module.exports = {
  uploadFile,
};
