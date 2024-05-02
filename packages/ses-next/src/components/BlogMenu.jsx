import Link from 'next/link';

export const BlogMenu = ({ tags }) => {
  return (
    <div className="mx-auto sm:max-w-none">
      <div className="mb-8 px-6">
        <div className="flex items-center gap-3">
          <Link href="/blog" className="inline-block hover:opacity-80">
            <h1 className="font-title text-base-content text-xl font-extrabold">SES Melbourne Blog</h1>
          </Link>{' '}
          <div className="tooltip tooltip-right" data-tip="RSS">
            <a target="_blank" href="https://daisyui.com/blog/rss.xml" className="hover:text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z"></path>
                <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <ul className="menu menu-horizontal lg:menu-vertical lg:w-56">
        <li className="menu-title">Tags</li>{' '}
        {tags.map((tag) => (
          <li className="menu-item" key={tag}>
            <Link href={`/blog/tag/${tag}`} className="menu-link">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
