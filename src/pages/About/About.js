import styles from "./About.module.css"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        <span> Sobre o Sistema de Cadastro</span>
      </h2>
      <p>
        Este projeto consite em ser um Sistema de Cadastramento de Funcionario e
        manipulacao do mesmo. Utiizando{" "}
        <span>React.js, MUI, Firebas, javaScript, e manipulação de PDF</span>
      </p>
      <Link to="/register" className="btn">
        Cadastrar-se
      </Link>
    </div>
  )
}

export default About
