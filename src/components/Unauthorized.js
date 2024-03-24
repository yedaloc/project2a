import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>No tienes acceso a la pagina</h1>
            <br />
            <p>Por favor contacte con la administracion . Puede que su usuario haya sido eliminado o no tengas acceso a la pagina</p>
            <div className="flexGrow">
                <button onClick={goBack}>Volver</button>
            </div>
        </section>
    )
}

export default Unauthorized
