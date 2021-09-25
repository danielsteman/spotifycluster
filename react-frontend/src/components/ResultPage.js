import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const Header = styled.div`
    font-family: 'Mulish', sans-serif;
    font-weight: 700;
    font-size: 4vw;    
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    position: fixed;
    text-align: center;
`

const ButtonContainer = styled.div`
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    text-align: center;
`

const ResultPage = () => {

    let history = useHistory();
    
    return (
        <div>
            <Header>Done!</Header>
            <ButtonContainer>
                <Button size="lg" onClick={() => history.push('/')}>Take me back</Button>
            </ButtonContainer>
        </div>
    )
}

export default ResultPage