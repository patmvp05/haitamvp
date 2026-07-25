interface QrImageProps {
  /** base64 PNG data URI produced by lib/qrcode. */
  dataUrl: string;
  alt: string;
  size?: number;
}

/**
 * QR code image. Deliberately a plain <img> (not next/image): the source is a
 * local base64 data URI, so next/image's remote-domain config and optimization
 * pipeline add cost for zero benefit, and a data URI keeps rendering even if the
 * TV's Wi-Fi drops right after page load.
 */
export function QrImage({ dataUrl, alt, size = 140 }: QrImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dataUrl}
      alt={alt}
      width={size}
      height={size}
      className="bg-white p-2"
    />
  );
}
