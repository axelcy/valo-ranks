import useFetch from "../../hooks/useFetch"
import useUsername from "../../hooks/useUsername"
import { AccountResponse } from "../../interfaces/accountResponse"
import { MmrResponse } from "../../interfaces/mmrResponse"
// const API_URL = import.meta.env.VITE_API_URL
const API_URL = 'https://api.henrikdev.xyz/valorant/v1'

export default class ValorantAPI {
    name: string
    constructor (name: string) {
        this.name = useUsername(name)
    }
    async account(){
        return await useFetch(`/account/${this.name}`) as Promise<AccountResponse>
    }
    async mmr(){
        return await useFetch(`/mmr/latam/${this.name}`) as Promise<MmrResponse>
    }
}