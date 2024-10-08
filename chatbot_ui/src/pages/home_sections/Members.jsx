import styled from "styled-components";
import ProfileImg from "../../assets/profile.jpg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  padding: 1rem 0.3rem;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .failed {
    color: red;
    margin: 2rem auto;
    font-size: 0.9rem;
    font-weight: 450;
    text-align: center;

    span {
      cursor: pointer;
      font-size: 1rem;
      border-bottom: solid black 3px;

      &:hover {
        opacity: 0.55;
      }
    }
  }

  div {
    display: flex;
    cursor: pointer;
    width: 100%;
    margin: 0.3rem 1rem;
    justify-content: center;
    align-items: center;
    text-align: left;
    transition: opacity 0.4s ease;
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h4 {
      font-size: 0.95rem;
    }

    p {
      font-weight: 300;
      font-size: 0.85rem;
      color: #999;
    }
  }

  img {
    width: 40px;
    border-radius: 50%;
  }
`;

const Members = () => {
  const user = useSelector((state) => state.user.userDetails);
  const [membersArr, setMembersArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memberTotal, setMembersTotal] = useState(0);
  const [errMsg, setErrMsg] = useState(false);
  const [retry, setRetry] = useState(0);
  const [userDate, setUserDate] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      const URL = import.meta.env.VITE_SERVER_URL;
      setIsLoading(true);
      setErrMsg(false);
      try {
        const response = await axios.get(`${URL}/members`, {
          withCredentials: true,
        });
        const data = response.data;
        setMembersArr(data.members);
        setMembersTotal(data.totalMembers);

        // Set the user's joined date
        const currentUser = data.members.find((member) => member.id === user.id);
        if (currentUser) {
          setUserDate(currentUser.joined);
        }
      } catch (err) {
        console.error(err);
        setErrMsg(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [retry, user.id]);

  return (
    <Container>
      <h2>Nayvee Chat Members</h2>

      {memberTotal > 0 && <p>{memberTotal} users</p>}

      <div>
        <img src={user.image ? user.image : ProfileImg} alt="member profile" />
        <div className="text">
          <h4>{user.name} (You)</h4>
          {userDate && <p>Joined: {userDate}</p>}
        </div>
      </div>
      
      {membersArr
        .filter((member) => member.id !== user.id)
        .map((member) => (
          <div key={member.id}>
            <img
              src={member.image !== null ? member.image : ProfileImg}
              alt="member profile"
            />
            <div className="text">
              <h4>{member.name}</h4>
              <p>Joined: {member.joined}</p>
            </div>
          </div>
        ))}

      {isLoading && (
        <div style={{ width: "80px", margin: '1rem auto' }}>
          {" "}
          <div className="loader"></div>{" "}
        </div>
      )}
      
      {errMsg && (
        <p className="failed">
          Server Connection Error <br />
          <span onClick={() => setRetry(retry + 1)}>Retry</span>
        </p>
      )}
    </Container>
  );
};

export default Members;
