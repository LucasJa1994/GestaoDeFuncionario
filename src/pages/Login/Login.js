import { TextField, Button, Typography } from "@mui/material"
import { useAuthentication } from "../../hooks/useAuthentication"
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    const user = {
      email,
      password,
    }
    await login(user)
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Entrar
      </Typography>
      <Typography variant="body1" gutterBottom>
        Faça o login para utilizar o sistema
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "calc(100% + 60px)" }} // Aumenta o width em 16px
        />
        <TextField
          label="Senha"
          type="password"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "calc(100% + 60px)" }} // Aumenta o width em 16px
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ borderRadius: "32px", mt: 2 }} // Adiciona margem ao botão
        >
          {loading ? "Aguarde..." : "Entrar"}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </div>
  )
}

export default Login
