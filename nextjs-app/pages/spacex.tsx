import Head from 'next/head'
import Layout, { siteTitle } from './components/layout';
import { GetServerSideProps } from 'next';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import layoutStyles from '../styles/layout.module.css';
import styles from '../styles/spacex.module.css';
import { formatCurrency } from '../util/dataformatter'
import Image from 'next/image';


function Launch({ launch }) {
    return (
        <div className={`row ${styles.launch}`}>
          <div className={`col-4 ${styles.launchPatch}`}>

            {launch.links?.mission_patch_small ? (
              <Image width='1000' height='1000' 
                src={launch.links.mission_patch_small} 
                alt={`${launch.mission_name} mission patch`}></Image>
            ) : (
              <div className={styles.missing}>missing mission patch</div>
            )}

          </div>
          <div className='col-8'>
            <h2>{launch.mission_name}</h2>

            {launch.details ? (
              <div className={styles.description}>{launch.details}</div>
            ): null}

            <div className={styles.launchDetails}>
              <table className='table table-borderless'><tbody>

                {launch.launch_site?.site_name_long ? (
                  <tr>
                    <td className={styles.label}>Where:</td>
                    <td>{launch.launch_site.site_name_long}</td>
                  </tr>
                ) : null}

                {launch.launch_date_local ? (
                  <tr>
                    <td className={styles.label}>When:</td>
                    <td>{new Date(launch.launch_date_local).toUTCString()}</td>
                  </tr>
                ) : null}

                {launch.links?.video_link ? (
                  <tr>
                    <td className={styles.label}>Video:</td>
                    <td>
                      <a href={launch.links.video_link} 
                        target='_blank' rel='noopener noreferrer'>
                          {launch.links.video_link}
                      </a>
                    </td>
                  </tr>
                ) : null}
                
              </tbody></table>

              <hr></hr>

              <table className='table table-borderless'><tbody>
                
                {launch.rocket?.rocket_name ? (
                  <tr>
                    <td className={styles.label}>Rocket:</td>
                    <td>{launch.rocket.rocket_name}</td>
                  </tr>
                ) : null}
                
                {launch.rocket?.rocket?.description ? (
                  <tr>
                    <td className={styles.label}>Description:</td>
                    <td>{launch.rocket.rocket.description}</td>
                  </tr>
                ) : null}

                {launch.rocket?.rocket?.cost_per_launch ? (
                  <tr>
                    <td className={styles.label}>Cost / Launch:</td>
                    <td>{formatCurrency(launch.rocket.rocket.cost_per_launch)}</td>
                  </tr>
                ) : null}

                {launch.rocket?.rocket?.success_rate_pct ? (
                  <tr>
                    <td className={styles.label}>Success %:</td>
                    <td>{launch.rocket.rocket.success_rate_pct}%</td>
                  </tr>
                ) : null}

              </tbody></table>
            </div>

          </div>
        </div>
    );
}


function SpaceXPage({ launches }) {
    const pageTitle = `SpaceX Past Launches - ${siteTitle}`;

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <div className='container'>
              <div className={layoutStyles.header}>
                <h1>SpaceX Past Launches</h1>
              </div>
              
              <div>
                  {launches.map(launch => {
                      return (
                          <Launch key={launch.id} launch={launch}></Launch>
                      );
                  })}
              </div>
            </div>
            
        </Layout>
    );
}


export const getServerSideProps: GetServerSideProps = async () => {
    const client = new ApolloClient({
        uri: 'https://api.spacex.land/graphql/',
        cache: new InMemoryCache()
    });

    const { data } = await client.query({
        query: gql`
      query ExampleQuery {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            mission_patch_small
            video_link
          }
          rocket {
            rocket_name
            rocket {
              cost_per_launch
              description
              success_rate_pct
              wikipedia
            }
          }
          details
          id
        }
      }
      `
    });

    // sometimes the api is returning non-unique results
    // so lets fix that and make sure our data is unique
    let uniqueLaunches = [],
        uniqueLaunchIds = {};
    data.launchesPast.forEach(launch => {
      if (!(launch.id in uniqueLaunchIds)) {
        uniqueLaunches.push(launch);
        uniqueLaunchIds[launch.id] = true;
      }
    });

    return {
        props: {
            launches: uniqueLaunches
        }
    }
}


export default SpaceXPage;