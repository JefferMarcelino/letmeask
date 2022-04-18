import Button from "../components/Button"
import "../styles/auth.scss"

function Home() {
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
                    <Button className="create-room">
                        <img src="" alt="Logo do Google" />
                        Crie sua sala com a Google
                    </Button>
                    <div className="separator">ou entre em um sala</div>
                    <form>
                        <input 
                        type="text"
                        placeholder="Digite o código da sala"
                         />

                         <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Home