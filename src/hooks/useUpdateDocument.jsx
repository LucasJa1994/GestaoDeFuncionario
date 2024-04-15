import { useState, useEffect, useReducer } from "react"
import { db } from "../firebase/config"
import { updateDoc, doc } from "firebase/firestore"

const initialState = {
  loading: null,
  error: null,
}

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null }
    case "UPDATED_DOC":
      return { loading: false, error: null }
    case "ERROR":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState)
  console.log(456, docCollection)
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action)
    }
  }
  const updateDocument = async (uid, data) => {
    console.log("qualquer coisa")

    // checkCancelBeforeDispatch({
    //    type: "LOADING",
    //  payload: updateDocument,
    //})
    try {
      console.log("123", data, db, docCollection, uid)
      const docRef = await doc(db, docCollection, uid)
      console.log("123", data, db, docCollection, uid)

      const updateDocument = await updateDoc(docRef, data)

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updateDocument,
      })
      return { response: { error: null } } // Retorna um objeto de resposta sem erro
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      })
      return { response: { error: error.message } } // Retorna um objeto de resposta com o erro
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])
  return { updateDocument, response }
}
