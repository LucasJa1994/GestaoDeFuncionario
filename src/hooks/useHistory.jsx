import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"

const useHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        const historyCollection = collection(db, "posts")
        const snapshot = await getDocs(historyCollection)
        const historyData = snapshot.docs.map((doc) => {
          console.log("Data do documento:", doc.data()) // Adiciona um log para verificar os dados do documento
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        console.log("Histórico completo:", historyData) // Adiciona um log para verificar o array de histórico completo
        setHistory(historyData)
        setLoading(false)
      } catch (error) {
        console.error("Erro ao buscar histórico:", error)
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  return { history, loading }
}

export default useHistory
