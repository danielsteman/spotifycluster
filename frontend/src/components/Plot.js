const Plot = () => (
    <Plot
        data={[
            {
                x: featureData.map(x => x[0]).map(x => x[0]),
                y: featureData.map(x => x[0]).map(x => x[1]),
                z: featureData.map(x => x[0]).map(x => x[2]),
                type: 'scatter3d',
                mode: 'markers',
                marker: {color: 'red'},
            }
        ]}
        layout={ {width: 750, height: 750, title: 'Feature space'} }
    />
)

export default Plot
