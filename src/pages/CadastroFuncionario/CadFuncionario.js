import React, { useState, useId } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInserDocument"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase/config"
import { nanoid } from "nanoid"
const CadFuncionario = () => {
  const { insertDocument } = useInsertDocument("cads")
  const { user } = useAuthValue()
  const navigate = useNavigate()

  // Estados para os campos do formulário
  const [contatoNome, setContatoNome] = useState("")
  const [contatoSexo, setContatoSexo] = useState("")
  const [contatoEndereco, setContatoEndereco] = useState("")
  const [contatoTelefone, setContatoTelefone] = useState("")
  const [contatoFotoPerfil, setContatoFotoPerfil] = useState(null)
  const [contatoDataAniversario, setContatoDataAniversario] = useState("")

  const [funcionarioCargo, setFuncionarioCargo] = useState("")
  const [funcionarioDataAdmissao, setFuncionarioDataAdmissao] = useState("")
  const [funcionarioSetor, setFuncionarioSetor] = useState("")
  const [funcionarioSalario, setFuncionarioSalario] = useState("")
  const [formError, setFormError] = useState("")
  const [telefoneValido, setTelefoneValido] = useState(true)
  // Função para lidar com o envio do formulário

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    // Verificar se os campos obrigatórios estão preenchidos
    if (
      !contatoNome ||
      !funcionarioCargo ||
      !contatoSexo ||
      !contatoEndereco ||
      !contatoTelefone ||
      !contatoDataAniversario ||
      !funcionarioDataAdmissao ||
      !funcionarioSetor ||
      !funcionarioSalario
    ) {
      setFormError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    try {
      let photoUrl = ""
      // Upload da foto de perfil se estiver definida
      const randomId = nanoid()
      if (contatoFotoPerfil) {
        const storageRef = ref(storage, `fotoPerfil/${randomId}`)
        const snapshot = await uploadBytes(storageRef, contatoFotoPerfil)
        photoUrl = await getDownloadURL(snapshot.ref)
      }
      console.log(444, randomId)

      // Construir o objeto de dados
      const data = {
        contato: {
          nome: contatoNome,
          sexo: contatoSexo,
          endereco: contatoEndereco,
          telefone: contatoTelefone,
          fotoPerfil: photoUrl,
          dataAniversario: contatoDataAniversario,
        },
        funcionario: {
          cargo: funcionarioCargo,
          dataAdmissao: funcionarioDataAdmissao,
          setor: funcionarioSetor,
          salario: funcionarioSalario,
        },
        uid: user.uid,
      }

      // Inserir documento no banco de dados
      await insertDocument(data)

      // Limpar campos do formulário após o envio
      setContatoNome("")
      setContatoSexo("")
      setContatoEndereco("")
      setContatoTelefone("")
      setContatoFotoPerfil(null)
      setContatoDataAniversario("")
      setFuncionarioCargo("")
      setFuncionarioDataAdmissao("")
      setFuncionarioSetor("")
      setFuncionarioSalario("")

      // Redirecionar para a página inicial após o envio bem-sucedido
    } catch (error) {
      console.error("Erro ao criar o funcionário:", error)
      setFormError(
        "Ocorreu um erro ao criar o funcionário. Por favor, tente novamente mais tarde."
      )
    }
    navigate("/")
  }

  // Função para lidar com a seleção de arquivo da foto de perfil
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setContatoFotoPerfil(file)
  }
  const handleTelefoneChange = (e) => {
    const telefone = e.target.value
    const telefoneRegex = /^\(\d{2}\)\d{1}-\d{4}-\d{4}$/
    setTelefoneValido(telefoneRegex.test(telefone))
    setContatoTelefone(telefone)
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Typography variant="h6">Informações de Contato</Typography>
      <Grid item xs={12}>
        <Typography variant="h6">Foto de Perfil</Typography>
        <label htmlFor="input-file">
          <Typography
            variant="body1"
            component="span"
            style={{ cursor: "pointer", color: "red" }}
          >
            Clique aqui para selecionar uma imagem
          </Typography>
          <input
            id="input-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
        {contatoFotoPerfil && (
          <img
            src={URL.createObjectURL(contatoFotoPerfil)}
            alt="Foto de Perfil"
            style={{ width: "25%", marginBottom: "10px" }}
          />
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nome"
            name="contatoNome"
            value={contatoNome}
            onChange={(e) => setContatoNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Sexo"
            name="sexo"
            value={contatoSexo}
            onChange={(e) => setContatoSexo(e.target.value)}
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="feminino">Feminino</MenuItem>
            <MenuItem value="outro">Outro</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Endereço"
            name="endereco"
            placeholder="Rua e Numero"
            value={contatoEndereco}
            onChange={(e) => setContatoEndereco(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telefone"
            name="contatoTelefone"
            value={contatoTelefone}
            onChange={handleTelefoneChange}
            error={!setContatoTelefone}
            helperText={
              !telefoneValido && "Formato inválido. Use (xx)x-xxxx-xxxx"
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Data de Aniversário"
            name="contatoDataAniversario"
            value={contatoDataAniversario}
            onChange={(e) => setContatoDataAniversario(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Informações do Funcionário
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cargo"
            name="cargo"
            value={funcionarioCargo}
            onChange={(e) => setFuncionarioCargo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Data de Admissão"
            name="dataAdmissao"
            value={funcionarioDataAdmissao}
            onChange={(e) => setFuncionarioDataAdmissao(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Setor"
            name="setor"
            value={funcionarioSetor}
            onChange={(e) => setFuncionarioSetor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Salário"
            name="salario"
            value={funcionarioSalario}
            onChange={(e) => setFuncionarioSalario(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Enviar
      </Button>
      {formError && <Typography color="error">{formError}</Typography>}
    </form>
  )
}

export default CadFuncionario
