export default async function useFetch(endpoint: string): Promise<any> {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
        // if (!response.ok) throw new Error('Valorant API error :(')
        if (response?.status === 429) throw new Error('EXPLOTACIÓN DE LA API MUCHAS LLAMADAS :V')
        return (await response.json()).data
    }
    catch (error) {
        console.error(error)
    }
}