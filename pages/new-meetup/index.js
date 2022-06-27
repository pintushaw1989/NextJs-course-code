import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import { useRouter } from "next/router";

export default function newMeetUp() {
    const router = useRouter();

    const addMeetupHandler = async function(newMeetUp) {
        console.log(newMeetUp);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(newMeetUp),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }

    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    );
}