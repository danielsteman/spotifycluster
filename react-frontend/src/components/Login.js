import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const LoginTitle = styled.div`
    color : white;
    font-size: 7vw;
    font-family: 'Mulish', sans-serif;
    font-weight: 700;
`

const typing = keyframes`
    0% { width: 0 }
    20% { width: 0% }
    30% { width: 100% }
    70% { width: 100% }
    80% { width: 0 }
    100% { width: 0 }
`

const blinkCaret = keyframes`
    from, to { border-color: transparent }
    50% { border-color: #11FD4C; }
`

const LoginTypewriter = styled.div`
    display: inline-block;
    color : white;
    font-size: 7vw;
    font-family: 'Mulish', sans-serif;
    font-weight: 700;

    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: .15em solid #11FD4C; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */

    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    animation: 
        ${typing} 5s steps(15, end) infinite,
        ${blinkCaret} .75s step-end infinite;
`

const LoginTypewriterContainer = styled.div`
    width: max-content;
`

const LoginContainer = styled.div`
    margin: 3em;
`

const Login = ( {login} ) => {

    const [activeIndex, setActiveIndex] = useState(0)

    const models = ['K-means', 'Mean Shift', 'Affinity Propagation']

    const nextModel = () => {
        if (activeIndex < models.length - 1) {
            setActiveIndex(activeIndex + 1)
        } else {
            setActiveIndex(0)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            nextModel()
        }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex])

    return (
        <LoginContainer>
            <LoginTitle>Find clusters in your Spotify playlists using...</LoginTitle>
            <LoginTypewriterContainer>
                <LoginTypewriter>{models[activeIndex]}</LoginTypewriter>
            </LoginTypewriterContainer>
            <Button size="lg" style={{marginTop: "2em"}}onClick={() => {
                login()
            }}>Login</Button>
        </LoginContainer>
    )
}

export default Login