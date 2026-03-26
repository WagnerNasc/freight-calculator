export function getEixoValido(disponiveis: number[], solicitado: number): number {
  if (disponiveis.includes(solicitado)) return solicitado;

  const maiores = disponiveis.filter((e) => e >= solicitado).sort((a, b) => a - b);
  return maiores.length ? maiores[0] : disponiveis[disponiveis.length - 1];
}
