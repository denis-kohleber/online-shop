import { useParams } from 'react-router-dom';

function Category() {
    const { id } = useParams();

    return (
        <>
            <h1>Category Seite</h1>
            <p>Hallo {id}</p>
            <p>Hallo {id}</p>
        </>
    );
}

export { Category };
