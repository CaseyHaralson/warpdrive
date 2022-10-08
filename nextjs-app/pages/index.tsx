import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from './components/layout';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

function Home() {

  const tooltipRef = useRef();
  useEffect(() => {
    // we don't get typescript types when using require
    // but bootstrap js stuff needs to be implemented this way...
    // there may be a way around this by using a specific react bootstrap library
    // but I haven't tried it yet
    const {Tooltip} = require("bootstrap");
    var tooltip = new Tooltip(tooltipRef.current, {
      title: `After some research, Apollo Server doesn't seem to be a great choice. 
        There were examples of using Apollo in Next.js, but only with Apollo-micro.
        The developers of Apollo dislike the micro project and wish they hadn't pulled it into their repo.
        There is an official example of using Yoga in Next.js so I chose to go that route instead.
        Sadly, not using Apollo kind of breaks the theme of this project: space and money. Oh well.`,
      placement: 'right',
      trigger: 'hover'
    });
  });


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Warp Drive!
        </h1>

        <div className={styles.description}>
          Next.js with <del ref={tooltipRef}>Apollo</del> Graphql Yoga meets Python Flask
          <div>
            <small>
              Even 
              <a href='https://www.youtube.com/watch?v=VcKp7Iiepsg'
                target='_blank'
                rel='noopener noreferrer'>Zefram Cochrane</a> 
              would enjoy himself!
            </small>
          </div>
        </div>

        <div className={styles.grid}>
          <Link href='/spacex'>
            <a className={styles.card}>
              <h2>SpaceX Launches &rarr;</h2>
              <p>Using a SpaceX GraphQL api and rendering the content server side.</p>
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