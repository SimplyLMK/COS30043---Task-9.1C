import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const createTable = async (collection, jsonData) => {
  try {
    // Register the Firestore collection reference
    let collectionRef = projectFirestore.collection(collection);

    // Loop through the JSON data and add documents
    for (const item of jsonData) {
      await collectionRef.add(item);
    }

    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

export default createTable;