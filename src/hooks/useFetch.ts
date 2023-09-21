//const API_URL = import.meta.env.VITE_API_URL
const API_URL = 'https://api.henrikdev.xyz/valorant/v1'

export default async function useFetch(endpoint: string) {
    try {
        const response = await fetch(API_URL + endpoint)
        // if (!response.ok) throw new Error('Valorant API error :(')
        if (response?.status === 429) throw new Error('EXPLOTACIÓN DE LA API MUCHAS LLAMADAS :V')
        return (await response.json()).data
    }
    catch (error) {
        console.error(error)
    }
}