import { Link, useNavigate } from "react-router-dom";
import "../styles/NotFound.css"

function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <section className="p404">
            <h1 className="p404H1">404</h1>
            <h2 className="p404H2">Diese Seite ist nicht verfügbar</h2>
            <p className="p404Text">Entweder existiert diese Seite nicht oder Sie befindet sich gerade im Aufbau.</p>
            <div className="p404BtnContainer">
                <button className="p404ReturnBtn p404Btn" onClick={handleGoBack}>Zurück zur vorherigen Seite</button>
                <Link className="p404Link" to={"/"}>
                    <button className="p404HomeBtn p404Btn">Zur Startseite</button>
                </Link>
            </div>
        </section> 
    )
};

export { NotFound }
