export const WA_NUMBER = "556635317222";

export function waLink(msg?: string): string {
  return (
    "https://wa.me/" +
    WA_NUMBER +
    "?text=" +
    encodeURIComponent(
      msg || "Vi sobre o novo lançamento no Aquarela das Artes e quero saber mais!"
    )
  );
}
