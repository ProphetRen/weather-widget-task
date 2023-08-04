export const appId = 'c77ede82581e93da5a38c246205bd4a4'

export const apiList = {
    coreApi: `https://api.openweathermap.org/data/2.5/weather?&appid=${appId}&units=metric`,
    coordsApi: `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&units=metric`,
    imagesApi: `https://openweathermap.org/img/wn/`
}

export const getCityByName = async (name) => {
    return await fetch(`${apiList.coreApi}&q=${name}`)
}

export const getCityByCoordinates = async (lon, lat) => {
    return await fetch(`${apiList.coordsApi}&lon=${lon}&lat=${lat}`)
}