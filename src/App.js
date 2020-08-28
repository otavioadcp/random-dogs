import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactLoading from "react-loading";

const BASE_URL = "https://random.dog";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

const imgExtensions = ["jpg", "JPG", "peg", "png", "gif"];
const videoExtensions = ["mp4", "MP4", "EBM", "ebm"];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DogContainerArea = styled.div`
  display: flex;
  height: 600px;
  width: 800px;
  border: 1px solid white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }
`;

const Title = styled.span`
  color: white;
  font-size: 3rem;
  position: absolute;
  top: 0;
`;

const DogButtons = styled.div`
  display: flex;
  margin: 10px;
`;

const StyledButton = styled.button`
  width: 6rem;
  height: 2.2rem;
  margin: 0px 10px;
`;

const DogContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  :focus {
    outline: none;
  }
`;

const StyledImg = styled.img`
  :focus {
    outline: none;
  }
`;

const StyledVideo = styled.video`
  :focus {
    outline: none;
  }
`;

function App() {
  const [dog, setDog] = useState(null);
  const [previousDog, setPreviousDog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [extension, setExtension] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function teste() {
      const { data } = await api.get("/woof.json");
      setDog(data.url);
    }
    try {
      teste();
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  }, []);

  async function HandleRandomizeDog() {
    setLoading(true);
    setIsPrevious(false);

    try {
      const { data } = await api.get("/woof.json");
      setPreviousDog(dog);
      setDog(data.url);

      setExtension(data.url.slice(data.url.length - 3));
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  }

  async function HandlePreviousDog() {
    setLoading(true);
    setIsPrevious(true);
    try {
      setDog(previousDog);
      setExtension(previousDog.slice(previousDog.length - 3));
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Title>Random Dogs</Title>
      <DogButtons>
        <StyledButton
          disabled={!previousDog || isPrevious}
          onClick={HandlePreviousDog}
        >
          Previous
        </StyledButton>
        <StyledButton onClick={HandleRandomizeDog}>Randomize</StyledButton>
      </DogButtons>
      <DogContainerArea>
        {loading ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={"white"}
            height={100}
            width={100}
          />
        ) : (
          <DogContainer>
            {imgExtensions.includes(extension) ? (
              <StyledImg style={{ width: "100%", height: "100%" }} src={dog} />
            ) : (
              <StyledVideo
                autoplay={true}
                controls={true}
                width="100%"
                height="100%"
              >
                <source
                  src={dog}
                  type={`video/${extension === "ebm" ? "webm" : extension}`}
                />
              </StyledVideo>
            )}
          </DogContainer>
        )}
      </DogContainerArea>
    </Container>
  );
}

export default App;
