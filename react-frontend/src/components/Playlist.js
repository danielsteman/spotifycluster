import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import ScatterPlot from './Plot';
import LoadingScreen from './LoadingScreen'
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const ButtonContainer = styled.div`
    position: absolute;
    z-index: 1;
    background-color: black;
    padding: 20px;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

const Playlist = ({ getLabels, labels }) => {

    const models = {
        'K-means': {'params': {'n_clusters': 0}},
        'Affinity Propagation': {'params': {'max_iter': 5000, 'convergence_iter': 150}},
        'Mean Shift': {'params': {'n_jobs': -1}}
    }

    const dimensionOptions = {
        TSNE1: {array: 'TSNE_features', index: 0},
        TSNE2: {array: 'TSNE_features', index: 1},
        TSNE3: {array: 'TSNE_features', index: 2},
        acousticness: {array: 'features', index: 0},
        danceability: {array: 'features', index: 1},
        energy: {array: 'features', index: 2},
        instrumentalness: {array: 'features', index: 3},
        liveness: {array: 'features', index: 4},
        loudness: {array: 'features', index: 5},
        speechiness: {array: 'features', index: 6},
        tempo: {array: 'features', index: 7},
        valence: {array: 'features', index: 8}
    }

    const axes = [
        'X axis',
        'Y axis',
        'Z axis'
    ]

    const [data, setData] = useState([])
    const [selectedDimX, setSelectedDimX] = useState([])
    const [selectedDimY, setSelectedDimY] = useState([])
    const [selectedDimZ, setSelectedDimZ] = useState([])

    const [XButtonTitle, setXButtonTitle] = useState('TSNE1')
    const [YButtonTitle, setYButtonTitle] = useState('TSNE2')
    const [ZButtonTitle, setZButtonTitle] = useState('TSNE3')

    const location = useLocation();

    useEffect(() => {
        setData(location.data)
        setSelectedDimX(location.data.TSNE_features.map(x => x[0]))
        setSelectedDimY(location.data.TSNE_features.map(x => x[1]))
        setSelectedDimZ(location.data.TSNE_features.map(x => x[2]))
    }, [location.data, data])

    const selectDims = (axis, value, dim) => {
        if (axis === 'X axis') {
            setSelectedDimX(data[value.array].map(x => x[value.index]))
            setXButtonTitle(dim)
        } else if (axis === 'Y axis') {
            setSelectedDimY(data[value.array].map(x => x[value.index]))
            setYButtonTitle(dim)
        } else {
            setSelectedDimZ(data[value.array].map(x => x[value.index]))
            setZButtonTitle(dim)
        }
    }

    const buttonTitle = (axis) => {
        if (axis === 'X axis') {
            return XButtonTitle
        } else if (axis === 'Y axis') {
            return YButtonTitle
        } else {
            return ZButtonTitle
        }
    }

    if (data.TSNE_features === undefined) {return <LoadingScreen/>}
    
    return(
        <div>
            <ButtonContainer>
                {axes.map((axis, index) => (
                    <div key={index} style={{color: 'white'}}>
                        {axis}
                        <DropdownButton
                            title={buttonTitle(axis)}
                        >
                            {Object.entries(dimensionOptions).map(([dim, value]) =>
                                <div key={dim}>
                                    <Dropdown.Item 
                                        eventKey={dim} 
                                        onClick={() => {selectDims(axis, value, dim)}}
                                    >{dim}</Dropdown.Item>
                                </div>
                            )}
                        </DropdownButton>
                    </div>
                ))}
                <DropdownButton title='Model Selector'>
                    {Object.keys(models).map((model, index) => (
                        <DropdownItem 
                            eventKey={model}
                            key={index}
                            onClick={() => getLabels(model)}
                        >{model}</DropdownItem>
                    ))}
                </DropdownButton>
            </ButtonContainer>
            <ScatterPlot
                data={data}
                labels={labels} 
                Xdim={selectedDimX}
                Ydim={selectedDimY}
                Zdim={selectedDimZ}
            />
        </div>
    )
}

export default Playlist