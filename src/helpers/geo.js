import {getCityByCoordinates} from "@/api";


export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

export const geoRequestSuccess = async (position) => {
    const coordinates = position.coords
    return new Promise((resolve, reject) => {
        getCityByCoordinates(coordinates.longitude, coordinates.latitude).then((response) => {
            return response.json()
        }).then((result) => resolve(result))

    })
}

export const geoRequestFailure = (error) => {
    console.warn(error.message)
}

