import { describe, expect, test } from 'vitest'
import * as RealCep from "../src"

describe("RealCep.Validator.isValid", () => {
  test.each([
    ["01001-000", true],     // válido com hífen
    ["01001000", true],      // válido sem hífen
    ["00000000", false],     // sequência de zeros
    ["11111111", false],     // sequência repetida
    ["12345678", false],     // sequência crescente
    ["87654321", false],     // sequência decrescente
    ["abcdefgh", false],     // letras
    ["1234-567", false],     // tamanho errado
    
    // CEPs existentes validados via api
    ["69914352", true],     // válido AC
    ["57052494", true],     // válido AL
    ["69055729", true],     // válido AM
    ["68905800", true],     // válido AP
    ["41227065", true],     // válido BA
    ["60711120", true],     // válido CE
    ["72016210", true],     // válido DF
    ["29167619", true],     // válido ES
    ["73807365", true],     // válido GO
    ["65058186", true],     // válido MA
    ["38181279", true],     // válido MG
    ["79020915", true],     // válido MS
    ["78068375", true],     // válido MT
    ["66916450", true],     // válido PA
    ["66916450", true],     // válido PB
    ["50080685", true],     // válido PE
    ["64039552", true],     // válido PI
    ["85302160", true],     // válido PR
    ["24110466", true],     // válido RJ
    ["59114168", true],     // válido RN
    ["93330040", true],     // válido RS
    ["76906570", true],     // válido RO
    ["69312255", true],     // válido RR
    ["89027675", true],     // válido SC
    ["49071169", true],     // válido SE
    ["14401261", true],     // válido SP
    ["77015040", true],     // válido TO
  ])("valida se '%s' é %s", (cep, expected) => {
    expect(RealCep.Validator.isValid(cep)).toBe(expected);
  });
});
