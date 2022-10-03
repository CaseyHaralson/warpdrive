import Head from "next/head";

export const siteTitle = 'Warp Drive';

function Layout({
    children,
    home
}: {
    children: React.ReactNode,
    home?: boolean
}) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </div>
    );
}

export default Layout;