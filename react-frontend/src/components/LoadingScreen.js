import LoadingAnimation from '../assets/demo-loader.svg'
import './LoadingScreen.css'

const LoadingScreen = () => (
    <div className='loadingAnimationContainer'>
        <object type="image/svg+xml" data={LoadingAnimation}>svg-animation</object>
    </div>
)

export default LoadingScreen