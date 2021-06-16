import LoadingAnimation from '../assets/demo-loader.svg'
import styled from "styled-components";

const LoadingAnimationContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const LoadingScreen = () => (
    <LoadingAnimationContainer>
        <object type="image/svg+xml" data={LoadingAnimation}>svg-animation</object>
    </LoadingAnimationContainer>
)

export default LoadingScreen