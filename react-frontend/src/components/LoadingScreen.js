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

const LoadingScreen = () => (
    <div>
        <Animation type="image/svg+xml" data={LoadingAnimation}>svg-animation</Animation>
    </div>
)

export default LoadingScreen