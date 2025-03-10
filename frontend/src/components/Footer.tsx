import Image from "next/image";

export const Footer = () => {
  return (
    <div className="w-full">
      <Image
        src="/footer.png"
        alt="Footer"
        width={1920}
        height={200}
        className="w-full h-auto"
        priority={false}
      />
    </div>
  );
};
