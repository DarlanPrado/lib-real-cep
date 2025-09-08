    import { CepAPi, IbgeApi } from "./api"
import type { MUNICIPIOS } from "./data/municipios"
import { MUNICIPIOS as municipiosData } from "./data/municipios"

const cepApi = new CepAPi()
const ibgeApi = new IbgeApi()

/**
 * Utilitários de validação de CEP
 */
export const Validator = {
  /**
   * Valida se o CEP está no formato válido (com ou sem traço).
   * Exemplos aceitos: "12345678" ou "12345-678"
   * @param cep - CEP no formato string
   * @returns true se válido
   */
  isValid: (cep: string): boolean => {
    const cepLimpo = cep.replace('-', '');

    // Formato: 8 dígitos
    if (!/^\d{8}$/.test(cepLimpo)) return false;

    // Os dois primeiros dígitos nunca são 00
    if (cepLimpo.startsWith('00')) return false;

    // Evita sequências óbvias
    if (/^(\d)\1{7}$/.test(cepLimpo)) return false; // 00000000, 11111111, etc.
    if (/^12345678$/.test(cepLimpo)) return false; // sequência crescente
    if (/^87654321$/.test(cepLimpo)) return false; // sequência decrescente

    return true;
  },
}

/**
 * Serviço de consulta de CEP
 */
export const Cep = {
  /**
   * Busca informações do CEP na API externa
   * @param cep - CEP válido
   * @returns Promise com os dados retornados da API
   */
  search: (cep: string) => cepApi.search(cep),
}

/**
 * Serviço de dados regionais (IBGE + dataset local)
 */
export const Regiao = {
  /**
   * Busca todos os estados disponíveis no IBGE
   */
  findEstados: () => ibgeApi.estados(),

  /**
   * Busca todos os municípios disponíveis no IBGE
   */
  findMunicipios: () => ibgeApi.municipios(),

  /**
   * Dados estáticos de municípios
   */
  municipios: municipiosData,
}

export { MUNICIPIOS }
