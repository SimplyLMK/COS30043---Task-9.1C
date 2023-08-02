import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const get_documents = (collection) => {

  const documents = ref([]);
  const error = ref(null);

  // Register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection);

  const unsub = collectionRef.onSnapshot(querySnapshot => {
    documents.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    error.value = null;
  }, err => {
    console.log(err.message);
    documents.value = [];
    error.value = 'Could not fetch documents';
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default get_documents;
