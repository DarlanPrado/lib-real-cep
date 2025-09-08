import fetch from "node-fetch";
import { HttpError } from "./exceptions/api.exeprions";
import type { Cep} from "./types/api/cep";
import type { UF, Municipio } from "./types/api/ibge"

enum URLS_CEP {
    FIND = 'https://opencep.com/v1/',
    UPDATE = 'https://update.opencep.com/'
}

enum URLS_IBGE {
    UF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    MUNICIPIOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios'
}


interface ICepApiResponseLocation { }


interface IAPI {
}
interface ICepApi extends IAPI { }

class API implements IAPI {
    async request<T = unknown>(route: string | { url: URLS_CEP | URLS_IBGE, route?: string }): Promise<T> {
        const fetchUrl = typeof route === "string" ? route : `${route.url}${route.route}`;

        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new HttpError(
                `Request failed: ${response.status} ${response.statusText}`,
                response.status,
                response.statusText,
                fetchUrl
            );
        }

        return response.json() as Promise<T>;
    }
}

export class CepAPi extends API implements ICepApi {

    search(cep: number | string) {
        try{
            return this.request<Cep>({url: URLS_CEP.FIND, route: cep.toString()})
        }catch{
            return this.update(cep.toString())
        }
    }

    update(cep: string) {
        return this.request<Cep>({ url: URLS_CEP.UPDATE, route: cep})
    }
}


export class IbgeApi extends API {
    estados(){
        return this.request<UF[]>({ url: URLS_IBGE.UF})
    }

    municipios(){
        return this.request<Municipio[]>({ url: URLS_IBGE.MUNICIPIOS})
    }
}
