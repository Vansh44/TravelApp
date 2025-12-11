import "./Profile.css";
import userPic from "../../assets/portrait.png";

const Profile = () => {
  return (
    <div className="profile-wrapper">
      <h2 className="profile-heading">Your Profile</h2>

      <div className="profile-box">
        <img src={userPic} alt="Profile" className="profile-photo" />

        <div className="profile-text">
          <h3 className="profile-name">Vansh Gupta</h3>
          <p className="profile-email">vansh.gupta@email.com</p>

          <a href="#" className="profile-manage">
            Manage Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
