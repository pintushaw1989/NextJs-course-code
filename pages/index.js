// import { useEffect, useState } from 'react';
import { MongoClient } from "mongodb";
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//     {
//         'id':'m1',
//         'image':'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//         'title':'First Meetup in Germany',
//         'address':'Germany',
//         'description': 'First Meetup in Germany'
//     },
//     {
//         'id':'m2',
//         'image':'https://images.unsplash.com/photo-1473090826765-d54ac2fdc1eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
//         'title':'Second Meetup in US',
//         'address':'US',
//         'description':'First Meetup in US',
//     },
//     {
//         'id':'m3',
//         'image':'https://images.unsplash.com/photo-1543832923-44667a44c804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=744&q=80',
//         'title':'Third Meetup in England',
//         'address':'England',
//         'description':'First Meetup in England',
//     }
// ];

export default function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     // fetch meetups

    //     // assign to loadMeetups
    //     setLoadedMeetups(DUMMY_MEETUP);
    // }, []);

    return (
        <MeetupList meetups={props.meetups}></MeetupList>
    )
}

// this function will fetch the data in server side
export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://Pintushaw1989:Pintu1234@mycluster.kbbia.mongodb.net/nextjs-meetup?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

// export function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }