import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Title from '../../components/Title';

import { getUser } from '../../api';
import { useAuth } from '../../hooks/useAuth';

function User() {
  const [userProfile, setUserProfile] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const { authorized } = useAuth();
  useEffect(() => {
    start();
    async function start() {
      if (!params.id) return;
      const user = await getUser(params.id);
      setUserProfile(user);
    }
  }, [params.id]);

  function renderEditButton() {
    if (!authorized) return null;
    return (
      <Button
        className="user__heading-row__action__btn"
        onClick={() => {
          navigate(`/users/${id}/edit`);
        }}
      >
        Edit
      </Button>
    );
  }

  const { name, photo, email, phone, bio, id } = userProfile;

  return (
    <div className="user">
      <div className="user__headings">
        <h1>Personal info</h1>
        <h2>Basic info, like your name and photo</h2>
      </div>
      <Container>
        <div className="user__heading-row">
          <Title
            main="Profile"
            sub="Some info may be visible to other people"
          />
          <div className="user__heading-row__action">{renderEditButton()}</div>
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
