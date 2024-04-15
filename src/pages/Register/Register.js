import { useAuthentication } from "../../hooks/useAuthentication"
import { useState, useEffect } from "react"
import { TextField, Button, Typography } from "@mui/material"

const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const { createUser, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    const user = {
      displayName,
      email,
      password,
    }
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais")
      return
    }
    const res = await createUser(user)
    console.log(res)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "500px", margin: "20px 0" }}>
        <Typography variant="h3" align="center">
          Cadastre-se
        </Typography>
        <Typography variant="body1" align="center">
          Crie seu usuário para manipular o sistema
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <TextField
              label="Nome"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
              sx={{ width: "calc(100% + 80px)" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ width: "calc(100% + 80px)" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Senha"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ width: "calc(100% + 80px)" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Confirme sua senha"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              sx={{ width: "calc(100% + 80px)" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {!loading ? (
              <Button variant="contained" type="submit">
                Cadastrar
              </Button>
            ) : (
              <Button variant="contained" disabled>
                Aguarde...
              </Button>
            )}
          </div>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </form>
      </div>
    </div>
  )
}

export default Register
