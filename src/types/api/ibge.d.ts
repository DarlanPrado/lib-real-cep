interface Regiao {
    id: number,
    sigla: string,
    nome: string,
}

export interface UF {
    id: number,
    sigla: string,
    nome: string,
    regiao: Regiao
}

export interface Mesorregiao {
    id: number,
    nome: string,
}

export interface Microrregiao {
    id: number,
    name: string,
    mesorregiao
}

export interface RegiaoIntermediaria {
    id: number,
    nome: string,
    UF: UF
}

export interface RegiaoImediata{
    id: number,
    nome: string,
    "regiao-intermediaria": RegiaoImediata
}

export interface Municipio {
    id: number,
    nome: string,
    microrregiao: Microrregiao,
    "regiao-imediata": RegiaoImediata
}