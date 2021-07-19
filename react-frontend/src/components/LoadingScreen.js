import LoadingAnimation from '../assets/loading_animation_v1.svg'
import styled from "styled-components";

const Animation = styled.object`
    height: 15vh;
    width: 15vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    position: fixed;
`

const LoadingCaption = styled.div`
    top: 60%;
    left: 50%;
    transform: translate(-50%);
    font-size: 1.5vh;
    position: absolute;
    color: white;
    font-weight: 700;
`

const LoadingScreen = ({ loadingCaption }) => (
    <div>
        <Animation type="image/svg+xml" data={LoadingAnimation}>svg-animation</Animation>
        <LoadingCaption>{loadingCaption}</LoadingCaption>
    </div>
)

export default LoadingScreen