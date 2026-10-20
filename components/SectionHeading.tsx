import Link from "next/link";

export function SectionHeading({
  id,
  title,
  as: Tag = "h2",
  link,
}: {
  id?: string;
  title: string;
  as?: "h1" | "h2";
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <Tag id={id} className="text-[15px] font-semibold">
        {title}
      </Tag>
      {link && (
        <Link href={link.href} className="text-sm text-muted">
          {link.label}
        </Link>
      )}
    </div>
  );
}
