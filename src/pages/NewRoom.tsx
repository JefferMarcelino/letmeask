import Button from "../components/Button"
import "../styles/auth.scss"

function NewRomm() {
    return(
        <div id="page-auth">
            <aside>
                <img src="" alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src="" alt="Letmeask logo" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input 
                        type="text"
                        placeholder="Nome da sala"
                         />

                         <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <a href="#">Clique aqui</a></p>
                </div>
            </main>
        </div>
    )
}

export default NewRomm