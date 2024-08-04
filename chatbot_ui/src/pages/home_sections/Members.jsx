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

  useEffect(() => {
    const fetchMember = async () => {
      const URL = import.meta.env.VITE_SERVER_URL;
      setIsLoading(true);
      try {
        const response = await axios.get(`${URL}/members`, {
          withCredentials: true,
        });
        const data = response.data;
        setMembersArr(data.members);
        setMembersTotal(data.totalMembers);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, []);

  return (
    <Container>
      <h2>Nayvee Chat Members</h2>

      <div>
        <img src={user.image ? user.image : ProfileImg} alt="member profile" />
        <div className="text">
          <h4>{user.name}</h4>
          <p>Joined: 2024</p>
        </div>
      </div>
      {membersArr.map((member) => {
        if (member.id === user.id) {
          return;
        }
        return (
          <div key={member.id}>
            <img
              src={member.image !== null ? member.image : ProfileImg}
              alt="member profile"
            />
            <div className="text">
              <h4>{member.name}</h4>
              <p>Joined: 2024</p>
            </div>
          </div>
        );
      })}
      {memberTotal - membersArr.length > 0 && (
        <p>+ {memberTotal - membersArr.length} more</p>
      )}
      {isLoading && (
        <div style={{ width: "80px", margin: '1rem auto' }}>
          {" "}
          <div className="loader"></div>{" "}
        </div>
      )}
    </Container>
  );
};

export default Members;
