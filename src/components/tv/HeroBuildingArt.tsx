import Image from 'next/image';

/**
 * Haita's real facade at dusk. The portrait photo is kept fully visible in
 * the landscape TV panel, with a darkened copy filling the side space so the
 * composition stays immersive without cropping the hotel.
 */
export function HeroBuildingArt() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[color:var(--ground)]"
    >
      <Image
        src="/images/haita-facade.png"
        alt=""
        fill
        priority
        sizes="42vw"
        className="scale-110 object-cover opacity-45 blur-2xl saturate-75"
      />
      <div className="absolute inset-0 bg-[color:var(--ground)] opacity-35" />
      <Image
        src="/images/haita-facade.png"
        alt=""
        fill
        priority
        sizes="42vw"
        className="object-contain"
      />
    </div>
  );
}
