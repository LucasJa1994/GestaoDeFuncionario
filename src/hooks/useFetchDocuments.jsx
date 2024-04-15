import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

export const useFetchDocuments = (docCollection) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return
      }

      setLoading(true)

      const collectionRef = collection(db, docCollection)

      try {
        const q = query(collectionRef, orderBy("createdAt", "desc"))

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        })
      } catch (error) {
        console.log(error)
        setError(error.message)
      }

      setLoading(false)
    }

    loadData()

    // Cleanup function
    return () => setCancelled(true)
  }, [docCollection, cancelled])

  return { documents, loading, error }
}
