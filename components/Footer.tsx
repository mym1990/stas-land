import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
        <p className="text-sm text-text-muted font-caption italic">
          Captured with care, processed with intention.
        </p>
      </div>
    </footer>
  );
}
