import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Container,
} from "@mui/material"

const EditeCadFuncionario = () => {
  const { id } = useParams()
  const { document: cad } = useFetchDocument("cads", id)
  const { updateDocument, response } = useUpdateDocument("cads")
  const navigate = useNavigate()

  const [contatoNome, setContatoNome] = useState("")
  const [contatoEndereco, setContatoEndereco] = useState("")
  const [contatoTelefone, setContatoTelefone] = useState("")
  const [contatoSexo, setContatoSexo] = useState("")
  const [contatoFotoPerfil, setContatoFotoPerfil] = useState(null)
  const [contatoDataAniversario, setContatoDataAniversario] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (cad) {
      setContatoNome(cad.contato.nome)
      setContatoEndereco(cad.contato.endereco)
      setContatoTelefone(cad.contato.telefone)
      setContatoDataAniversario(cad.contato.dataAniversario)
      setContatoFotoPerfil(cad.contato.fotoPerfil)
      setContatoSexo(cad.contato.sexo)
    }
  }, [cad])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      contato: {
        nome: contatoNome,
        sexo: contatoSexo,
        endereco: contatoEndereco,
        telefone: contatoTelefone,
        fotoPerfil: contatoFotoPerfil,
        dataAniversario: contatoDataAniversario,
      },
    }
    const result = await updateDocument(id, data)

    if (result && result.response && result.response.error) {
      console.error("Erro ao atualizar documento:", result.response.error)
      setFormError("Erro ao atualizar documento. Por favor, tente novamente.")
    } else {
      console.error("Erro ao atualizar documento: resposta indefinida")
      setFormError("Erro ao atualizar documento. Por favor, tente novamente.")
    }
    navigate("/dashboard")
  }

  return (
    <Container maxWidth="sm">
      {cad && (
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Editar Cadastro de Funcionário
          </Typography>
          <Typography paragraph>
            Altere os dados do cadastro como desejar.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome do Contato"
              required
              value={contatoNome}
              onChange={(e) => setContatoNome(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Endereço"
              required
              value={contatoEndereco}
              onChange={(e) => setContatoEndereco(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Telefone"
              required
              value={contatoTelefone}
              onChange={(e) => setContatoTelefone(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Data de Aniversário"
              required
              value={contatoDataAniversario}
              onChange={(e) => setContatoDataAniversario(e.target.value)}
              margin="normal"
            />
            {!response.loading && (
              <Button variant="contained" color="primary" type="submit">
                Editar
              </Button>
            )}
            {response.loading && <CircularProgress />}
            {response.error && (
              <Typography color="error" mt={2}>
                {response.error}
              </Typography>
            )}
          </form>
        </Box>
      )}
    </Container>
  )
}

export default EditeCadFuncionario
