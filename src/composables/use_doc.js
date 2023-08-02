import {ref} from 'vue'
import { projectFirestore } from '@/firebase/config'

const use_doc = (collection, id) =>
{
    const error = ref(null);
    const pending = ref(false);
    let doc_ref = projectFirestore.collection(collection).doc(id)

    const delete_doc = async()=>
    {
        pending.value = true;
        error.value = null;
        
        
        try 
        {
            const res = await doc_ref.delete();
            pending.value = false;
            return res
            
        } catch (err) 
        {
            console.log(err.message)
        }
    }
    

    const update_doc = async(updates)=>
    {
        pending.value = true;
        error.value = null;
        const res = await doc_ref.update(updates);
        pending.value = false;

        return res
    }
    return {error, pending, delete_doc, update_doc}
}
export default use_doc