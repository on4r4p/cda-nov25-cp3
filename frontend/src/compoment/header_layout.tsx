import Link from "next/link";

export default function HeaderLayout() {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Dev Blob
        </Link>

        <form action="/" method="get" className="w-full max-w-sm">
          <label className="sr-only" htmlFor="header-search">
            search ...
          </label>
          <input
            id="header-search"
            name="title"
            type="search"
            placeholder="search..."
            className="input input-bordered w-full"
          />
        </form>
      </div>
    </header>
  );
}
