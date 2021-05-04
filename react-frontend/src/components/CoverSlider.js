import styled from "styled-components";
import { useState, useEffect } from "react";

const Scene = styled.div`
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15%;
  position: relative;
  perspective: 500px;
`;

const Carousel = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateZ(-1714px);
  transform-style: preserve-3d;
  transition: transform 1s;
`;

const CarouselCell = styled.div`
  background-color: lightblue;
  position: absolute;
  width: 250px;
  height: 250px;
  border: 2px solid black;
  line-height: 150px;
  font-size: 80px;
  font-weight: bold;
  color: black;
  text-align: center;
  transition: all 1s;
  ${(props) =>
    `{ transform: rotateY(${props.position}deg) translateZ(1714px);}`}
`;

const SwipeButtons = styled.div`
  position: absolute;
  background-color: black;
  padding: 20px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
`
  
const CoverSlider = ({ images, selectPlaylist, userInfo, ids }) => {
  const [positions, setPositions] = useState([]);
  
  useEffect(() => {
    setPositions(Array.from({ length: images.length }, (_, i) => i * 10 - Math.floor(images.length / 2) * 10))
  }, [images])

  const handlePrev = (values) => {
    if (values[0] === 0) {
      setPositions(values);
    } else {
      const array = values.map((x) => x + 10);
      setPositions(array);
    }
  };

  const handleNext = (values) => {
    if (values[values.length - 1] === 0) {
      setPositions(values);
    } else {
      const array = values.map((x) => x - 10);
      setPositions(array);
    }
  };

  return (
    <div>
      <p style={{color:"white"}}>testestest</p>
      <Scene>
        <Carousel>
          {positions.map((position, index) => (
            <CarouselCell position={position} positions={positions} key={index}>
              <img 
                src={images[index]}
                alt="Playlist cover" 
                width="250"
                height="250"
                onClick={() => selectPlaylist(ids[index])}
              />
            </CarouselCell>
          ))}
        </Carousel>
      </Scene>
      <SwipeButtons>
        <button onClick={() => handlePrev(positions)}>prev</button>
        <button onClick={() => handleNext(positions)}>next</button>
      </SwipeButtons>
    </div>
  );
  
};

export default CoverSlider;
