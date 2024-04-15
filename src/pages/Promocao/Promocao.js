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

const Promocao = () => {
  const { id } = useParams()
  const { document: cad } = useFetchDocument("cads", id)
  const { updateDocument, response } = useUpdateDocument("cads")

  const navigate = useNavigate()
  const [funcionarioCargo, setFuncionarioCargo] = useState("")
  const [funcionarioDataAdmissao, setFuncionarioDataAdmissao] = useState("")
  const [funcionarioSetor, setFuncionarioSetor] = useState("")
  const [funcionarioSalario, setFuncionarioSalario] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (cad) {
      setFuncionarioCargo(cad.funcionario.cargo)
      setFuncionarioSalario(cad.funcionario.salario)
      setFuncionarioDataAdmissao(cad.funcionario.dataAdmissao)
      setFuncionarioSetor(cad.funcionario.setor)
    }
  }, [cad])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      funcionario: {
        cargo: funcionarioCargo,
        salario: funcionarioSalario,
        dataAdmissao: funcionarioDataAdmissao,
        setor: funcionarioSetor,
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
            Promoção de Funcionario
          </Typography>
          <Typography paragraph>
            Altere os dados do cadastro como desejar.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Novo Cargo"
              required
              value={funcionarioCargo}
              onChange={(e) => setFuncionarioCargo(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Novo Salário"
              required
              placeholder="R$"
              value={funcionarioSalario}
              onChange={(e) => setFuncionarioSalario(e.target.value)}
              margin="normal"
            />
            <Box mt={2}>
              {!response.loading && (
                <Button variant="contained" color="primary" type="submit">
                  Promover
                </Button>
              )}
              {response.loading && <CircularProgress />}
              {response.error && (
                <Typography color="error" mt={2}>
                  {response.error}
                </Typography>
              )}
            </Box>
          </form>
        </Box>
      )}
    </Container>
  )
}

export default Promocao
