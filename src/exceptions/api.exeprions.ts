export class HttpError extends Error {
  public status: number;
  public statusText: string;
  public url: string;

  constructor(message: string, status: number, statusText: string, url: string) {
    // adiciona prefixo da sua lib na mensagem
    super(`[REAL-CNPJ] ${message}`);

    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
    this.url = url;

    // garante que o stack trace é capturado corretamente
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  get location(): string | null {
    // tenta extrair a linha/arquivo do stack trace
    if (!this.stack) return null;
    const stackLines = this.stack.split("\n");
    // geralmente a 2ª ou 3ª linha contém o local onde foi lançado
    const caller = stackLines[2]?.trim();
    return caller ?? null;
  }
}
