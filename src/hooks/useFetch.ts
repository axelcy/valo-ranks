//const API_URL = import.meta.env.VITE_API_URL
const API_URL = 'https://api.henrikdev.xyz/valorant/v1'

export default async function useFetch(endpoint: string) {
    console.log('API', API_URL)
    try {
        const response = await fetch(API_URL + endpoint)
        if (!response.ok) throw new Error('Valorant API error :(')
        return (await response.json()).data
    }
    catch (error) {
        console.error(error)
    }
}