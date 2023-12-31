import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'


const useCollection = (collection) => {

  const error = ref(null)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null

    try {
      const res = await projectFirestore.collection(collection).add(doc)
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not send the message'
    }
  }

  return { error, addDoc }

}

export default useCollection