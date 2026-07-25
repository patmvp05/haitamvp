import Image from 'next/image';

/**
 * Haita's real facade at dusk. The dedicated portrait column is close enough
 * to the source aspect ratio that a direct crop feels photographic rather
 * than padded or artificially extended.
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
        sizes="33vw"
        className="object-cover object-[50%_46%]"
      />
    </div>
  );
}
