import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="grid h-screen place-content-center bg-white dark:bg-gray-900 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200 dark:text-gray-700">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Uh-oh!</p>

                <p className="mt-4 text-gray-500 dark:text-gray-400">We can't find that page.</p>

                <Link to='/'
                    className="mt-6 inline-block rounded bg-indigo-600 dark:bg-indigo-500 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
