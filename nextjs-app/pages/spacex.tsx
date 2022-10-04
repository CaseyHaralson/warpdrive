import Head from 'next/head'
import Layout, { siteTitle } from './components/layout';
import { GetServerSideProps } from 'next';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

function Launch({ launch }) {
    return (
        <div id={launch.id}>
          <img src={launch.links.mission_patch_small}></img>
          <div>{launch.mission_name}</div>
          <div>{launch.details}</div>
          <div>{launch.launch_site.site_name_long}</div>
          <div>{launch.launch_date_local}</div>
          <div>Rocket</div>
          <div>{launch.rocket.rocket_name}</div>
          <div>{launch.rocket.rocket.cost_per_launch}</div>
          <div>{launch.rocket.rocket.description}</div>
          <div>{launch.rocket.rocket.success_rate_pct}</div>
          <div>{launch.rocket.rocket.wikipedia}</div>
        </div>
    );
}

function SpaceXPage({ launchesUpcoming }) {
    const pageTitle = `SpaceX Upcoming Launches - ${siteTitle}`;

    return (
        <Layout>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <h1>SpaceX Upcoming Launches</h1>
            <div>
                {launchesUpcoming.map(launch => {
                    return (
                        <Launch launch={launch}></Launch>
                    );
                })}
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
        launchesUpcoming(limit: 10) {
          id
          is_tentative
          details
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            mission_patch_small
          }
          mission_name
          rocket {
            rocket_name
            rocket {
              cost_per_launch
              country
              description
              success_rate_pct
              wikipedia
            }
          }
        }
      }
      `
    });

    // sometimes the api is returning non-unique results
    // so lets fix that and make sure our data is unique
    let uniqueLaunches = [],
      uniqueLaunchIds = {};
    data.launchesUpcoming.forEach(launch => {
      if (!(launch.id in uniqueLaunchIds)) {
        uniqueLaunches.push(launch);
        uniqueLaunchIds[launch.id] = true;
      }
    });

    return {
        props: {
            launchesUpcoming: uniqueLaunches
        }
    }
}

export default SpaceXPage;