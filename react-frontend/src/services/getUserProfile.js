import axios from 'axios';

const getUserProfile = async (authenticationStatus) => {

    if (authenticationStatus) {
        try {
            const res = await axios({
                method: 'get',
                url: '/spotify/user-profile'
            })
            const data = await res.data
            const userProfile = data.user_profile
            return userProfile
        } catch (e) {
            console.log(e)
        }
    } else {
        throw new Error('Get credentials before fetching user profile')
    }

}

export default getUserProfile