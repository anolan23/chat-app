import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Row from '../../components/Row';

import { getUser } from '../../api';

function User() {
  const [userProfile, setUserProfile] = useState(null);
  const params = useParams();
  useEffect(() => {
    start();
    async function start() {
      if (!params.id) return;
      const user = await getUser(params.id);
      setUserProfile(user);
    }
  }, [params.id]);

  if (!userProfile) return <div>Loading...</div>;

  console.log(userProfile);
  const { name, photo, email, phone, bio } = userProfile;

  return (
    <div className="user">
      <div className="user__headings">
        <h1>Personal info</h1>
        <h2>Basic info, like your name and photo</h2>
      </div>
      <Container>
        <div className="user__heading-row">
          <div className="user__heading-row__text">
            <span className="user__heading-row__text__main">Profile</span>
            <span className="user__heading-row__text__sub">
              Some info may be visible to other people
            </span>
          </div>
          <div className="user__heading-row__action">
            <Button className="user__heading-row__action__btn">Edit</Button>
          </div>
        </div>
        <Row label="Photo">
          <Avatar className="user__avatar" src={photo} />
        </Row>
        <Row label="Name">
          <span>{name}</span>
        </Row>
        <Row label="Bio">
          <span>{bio}</span>
        </Row>
        <Row label="Phone">
          <span>{phone}</span>
        </Row>
        <Row label="Email">
          <span>{email}</span>
        </Row>
        <Row label="Password">
          <span>**********</span>
        </Row>
      </Container>
    </div>
  );
}

export default User;
