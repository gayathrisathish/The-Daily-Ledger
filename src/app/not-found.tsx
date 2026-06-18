import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">404</p>
        <h1 className="text-4xl font-semibold tracking-tight">This page is not part of today\'s edition.</h1>
        <p className="text-muted-foreground">Use the navigation to return to the learning flow.</p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}