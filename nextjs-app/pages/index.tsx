import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from './components/layout';
import Link from 'next/link';

function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Warp Drive!
        </h1>

        <p className={styles.description}>
          Next.js with Apollo Graphql meets Python Flask
          <div>
            <small>
              Even 
              <a href='https://www.youtube.com/watch?v=VcKp7Iiepsg'
                target='_blank'
                rel='noopener noreferrer'>Zefram Cochrane</a> 
              would enjoy himself!
            </small>
          </div>
        </p>

        <div className={styles.grid}>
          <Link href='/spacex'>
            <a className={styles.card}>
              <h2>SpaceX Upcoming &rarr;</h2>
              <p>Using the SpaceX GraphQL api and rendering the content server side.</p>
            </a>
          </Link>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Apollo Server &rarr;</h2>
            <p>Some sort of GraphQL server made from open data?</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Python Flask Api &rarr;</h2>
            <p>Probably just a simple api communication from the Next server to the Flask server.</p>
          </a>
        </div>
      </main>
    </Layout>
  )
}

export default Home;