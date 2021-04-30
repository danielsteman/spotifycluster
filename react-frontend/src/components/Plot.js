import Plot from 'react-plotly.js';
import useWindowDimensions from '../hooks/useWinDims'

const ScatterPlot = ( {data, Xdim, Ydim, Zdim} ) => {

    // first item in tuple in data.titles is the song name, the second item is the artist
    const artistsAndTitles = data.titles.map(track => `${track[0]} - ${track[1]}`)

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
            config={{displayModeBar: false}}
            data={[
                {
                    x: Xdim,
                    y: Ydim,
                    z: Zdim,
                    type: 'scatter3d',
                    mode: 'markers',
                    marker: {color: data.labels, symbol: 'circle'},
                    hoverlabel: {bgcolor: 'grey'},
                    hoverinfo: 'text',
                    text: artistsAndTitles,
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