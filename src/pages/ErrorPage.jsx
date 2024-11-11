import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="app">
            <div className="page home">
                <h1 className="home_logo">Oops!</h1>
                <p>
                    Sorry, an unexpected error has occurred.
                    <br />
                    <i>{error.statusText || error.message}</i>
                </p>
                <p>
                    <Link className="btn" to={`/`}>
                        Home
                    </Link>
                </p>
            </div>
        </div>
    );
}
