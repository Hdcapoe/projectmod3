import MailingList from "../components/MailingList";

function Profile({ username, email }) {
    return ( 
        <div>
            <h1>Profile</h1>
            <p>username: {username}</p>
            <p>email: {email}</p>
            <br></br>
            <MailingList />
        </div>
        
     );
}

export default Profile;