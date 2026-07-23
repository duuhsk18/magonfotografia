import Image from "next/image";

interface BrandMarkProps {
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

export function BrandMark({ tone = "light", className = "", priority = false }: BrandMarkProps) {
  const src = tone === "dark" ? "/brand/magonfotografia-black-crop.png" : "/brand/magonfotografia-white-crop.png";

  return (
    <Image
      src={src}
      alt="Magon Fotografia & Audiovisual"
      width={640}
      height={246}
      priority={priority}
      sizes="(max-width: 768px) 180px, 320px"
      className={`object-contain ${className}`}
    />
  );
}
