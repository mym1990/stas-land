import { AUTHOR, CONTACT_EMAIL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-4 pt-8 pb-14 text-sm text-muted">
      <span>
        &copy; {new Date().getFullYear()} {AUTHOR}
      </span>
      {CONTACT_EMAIL && (
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted">
          Email
        </a>
      )}
    </footer>
  );
}
