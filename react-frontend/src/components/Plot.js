import Plot from 'react-plotly.js';
import useWindowDimensions from '../hooks/useWinDims'

const ScatterPlot = ( {data, labels, Xdim, Ydim, Zdim} ) => {

    // use custom hook to retrieve fullscreen measurements
    const { height, width } = useWindowDimensions()

    const axesStyle = {
        tick0: 0,
        tickcolor: "#D3D3D3",
        tickwidth: 2,
        
        gridcolor: "#D3D3D3",
        gridwidth: 2,
        
        zerolinecolor: "#D3D3D3",
        zerolinewidth: 2
    }

    return (
        <Plot
            style={{transform: 'scale(1.3)'}}
            config={{displayModeBar: false}}
            data={[
                {
                    x: Xdim,
                    y: Ydim,
                    z: Zdim,
                    type: 'scatter3d',
                    mode: 'markers',
                    marker: {color: labels, symbol: 'circle'},
                    hoverlabel: {bgcolor: 'grey'},
                    hoverinfo: 'text',
                    text: data.dataPointLabels
                }
            ]}
            layout={ {
                displayModeBar: false,
                margin: {pad: 20},
                width: width, 
                height: height,
                paper_bgcolor: 'black',
                scene: {
                    aspectmode: 'auto',
                    yaxis: axesStyle,
                    xaxis: axesStyle,
                    zaxis: axesStyle
                }
            } }
        />
    )
}

export default ScatterPlot