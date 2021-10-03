import { storageFirebase } from "./firebase";

export default class FirebaseUtils {
  static uploadImage = async (file, pathImage) => {
    const ref = storageFirebase.ref(pathImage);
    const uploadTask = ref.put(file);
    await Promise.all([
      uploadTask.on("state_changed", console.log, console.error, async () => {
        // urlFirebase = await ref.getDownloadURL();
        let urlFirebase = await storageFirebase.ref(pathImage).getDownloadURL();
        return urlFirebase;
      }),
    ]);
  };
}
