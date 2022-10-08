import Layout, { siteTitle } from "./components/layout";
import Head from 'next/head'
import layoutStyles from '../styles/layout.module.css';

function StocksPage() {
    const pageTitle = `Stock Closing Values - ${siteTitle}`;

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <div className="container">
                <div className={layoutStyles.header}>
                    <h1>Stock Closing Values</h1>
                </div>


            </div>
        </Layout>
    );
}

export default StocksPage;