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
          Next.js with Apollo (Client & <del ref={tooltipRef}>Server</del>) and GraphQL Yoga meets Python Flask
          <div>
            <small>
              Even 
              <a href='https://www.youtube.com/watch?v=VcKp7Iiepsg'
                target='_blank' rel='noopener noreferrer'>Zefram Cochrane</a> 
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

          <Link href='/stocks'>
            <a className={styles.card}>
              <h2>Stock Values &rarr;</h2>
              <p>Using GraphQL Yoga to read a fake database loaded by a Python server. Uses client and server side rendering.</p>
            </a>
          </Link>

          <Link href='/api/graphql'>
            <a className={styles.card}
              target='_blank' rel='noopener noreferrer'>
              <h2>GraphQL Server &rarr;</h2>
              <p>Play with the GraphQL server api.</p>
            </a>
          </Link>
        </div>
      </main>
    </Layout>
  )
}

export default Home;