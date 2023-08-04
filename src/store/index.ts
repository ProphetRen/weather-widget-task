import {createStore} from 'vuex'
import {getCityByName} from '@/api'
import {foundElement, changeOrder, sortCards} from '@/helpers/commonHelpers'
import {geoRequestFailure, geoRequestSuccess, getCurrentPosition} from "@/helpers/geo";
import {toRaw} from "vue";

export default createStore({
    state: {
        savedCities: [] as any,
        citiesWeather: [] as any,
        message: '' as string,
    },
    mutations: {
        setSavedCities(state, citiesList) {
            state.savedCities = citiesList
        },
        setCitiesWeather(state, citiesWeather) {
            state.citiesWeather = citiesWeather
        },
        addCityWeather(state, cityWeather) {
            const duplicate = foundElement(state.citiesWeather, cityWeather.id)
            if (!duplicate.length) {
                state.citiesWeather.push(cityWeather)
            }
        },
        setMessage(state, message: string) {
            state.message = message
        },
        deleteCity(state, cityToDelete) {
            state.savedCities.splice(cityToDelete, 1)
            state.citiesWeather.splice(cityToDelete, 1)
        },
    },
    actions: {
        sortCities({state, commit}, payload) {
            const changedCitiesWeather = changeOrder(toRaw(state.citiesWeather), payload.dropCard, payload.currentCard)
            const changedSavedCities = changeOrder(toRaw(state.savedCities), payload.dropCard, payload.currentCard)
            commit('setCitiesWeather', changedCitiesWeather.sort(sortCards))
            commit('setSavedCities', changedSavedCities.sort(sortCards))
            window.localStorage.setItem('weatherApp', JSON.stringify({
                citiesList: changedSavedCities.sort(sortCards)
            }))
        },
        loadCitiesWeather({commit, state}) {
            state.savedCities.forEach((city: any) => {
                getCityByName(city.name).then((result) => {
                    return result.json()
                }).then((result) => {
                    commit('addCityWeather', {...result, order: city.order})
                })
            })
        },
        getCurrentLocation({dispatch}) {
            getCurrentPosition()
                .then((resolve) => {
                        geoRequestSuccess(resolve)
                            .then((data) => {
                                const city = {
                                    id: data.id,
                                    name: data.name,
                                    country: data.sys.country,
                                    order: 1
                                }
                                dispatch('setDataToLocalStorage', city)

                            })
                    },
                    (reject) => geoRequestFailure(reject)
                )
        },
        addCityToState({state, dispatch, commit}, cityName: string) {
            getCityByName(cityName).then((response) => {
                return response.json()
            }).then((result) => {
                const city = {
                    id: result.id,
                    name: result.name,
                    country: result.sys.country,
                    order: state.savedCities ? state.savedCities.length + 1 : 1
                }
                let duplicate = foundElement(state.savedCities, city.id)
                if (!duplicate.length) {
                    result.cod !== '404' ? dispatch('setDataToLocalStorage', city) : commit('setMessage', result.message)
                } else {
                    commit('setMessage', 'Weather info already exists')
                }
            })
        },
        setDataToLocalStorage({commit, dispatch}, city) {
            const parsedWeatherApp = JSON.parse(window.localStorage.weatherApp)
            const savedCities = !!parsedWeatherApp?.citiesList ? parsedWeatherApp.citiesList : []
            if (savedCities) {
                savedCities.push(city)
                window.localStorage.setItem('weatherApp', JSON.stringify({
                    citiesList: savedCities
                }))
                commit('setSavedCities', savedCities)
                dispatch('loadCitiesWeather')
            }
        },
        deleteDataFromLocalStorage({state, commit, dispatch}, idToDelete) {
            const parsedWeatherApp = JSON.parse(window.localStorage.weatherApp)
            const savedCities = !!parsedWeatherApp?.citiesList ? parsedWeatherApp.citiesList : []
            let cityToDelete = savedCities.findIndex((city:any) => {
                return city.id === idToDelete
            })
            savedCities.splice(cityToDelete, 1)
            commit('deleteCity', cityToDelete)
            window.localStorage.setItem('weatherApp', JSON.stringify({
                citiesList: savedCities
            }))
            dispatch('loadCitiesWeather')
        }
    },
})
