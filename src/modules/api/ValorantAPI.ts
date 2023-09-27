import useFetch from "../../hooks/useFetch"
import useUsername from "../../hooks/useUsername"
import { AccountResponse } from "../../interfaces/accountResponse"
import { MmrResponse } from "../../interfaces/mmrResponse"

export default class ValorantAPI {
    name: string
    constructor (name: string) {
        this.name = useUsername(name)
    }
    async account(){
        if (!this.name) return
        return await useFetch(`/account/${this.name}`) as Promise<AccountResponse>
    }
    async mmr(){
        if (!this.name) return
        return await useFetch(`/mmr/latam/${this.name}`) as Promise<MmrResponse>
    }
}