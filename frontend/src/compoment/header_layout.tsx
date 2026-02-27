import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HeaderLayout() {
  const router = useRouter();
  const currentTitle = typeof router.query.title === "string" ? router.query.title : "";

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Dev Blob
        </Link>

        <div className="flex w-full max-w-xl items-center gap-2">
          <form action="/search" method="get" className="flex-1">
            <label className="sr-only" htmlFor="header-search">
              Search articles
            </label>
            <div className="relative">
              <input
                id="header-search"
                name="title"
                type="text"
                placeholder="Search articles..."
                defaultValue={currentTitle}
                className="input input-bordered w-full pr-11"
              />
              <button
                type="submit"
                aria-label="Search articles"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1"
              >
                <Image src="/google.png" alt="" width={18} height={18} aria-hidden="true" />
              </button>
            </div>
          </form>

          <Link href="/articles/new" className="btn btn-primary whitespace-nowrap">
            Write an article
          </Link>
        </div>
      </div>
    </header>
  );
}
