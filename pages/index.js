import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return(
    <Fragment>
      <Head>
        <title>Meetups Tour</title>
        <meta name="description" content="meetups for tourist"/>
      </Head>
  <MeetupList meetups={props.meetups} />
  </Fragment>
  )
}

export async function getStaticProps() {
  // fetch data from an api
  const client = await MongoClient.connect(
    "mongodb+srv://SCRAM:broken@cluster0.6abayt7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
