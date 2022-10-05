import Head from "next/head";
import Link from 'next/link';

export const siteTitle = 'Warp Drive';

function Layout({
    children,
    home
}: {
    children: React.ReactNode,
    home?: boolean
}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>

            {home ? (
                <div>{children}</div>
            ) : (
                <>
                    <div className="container">
                        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                            <Link href='/'>
                                <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none fw-bold">Warp Drive</a>
                            </Link>
                        </header>
                    </div>
                    <div>{children}</div>
                </>
            )}
        </>
    );
}

export default Layout;