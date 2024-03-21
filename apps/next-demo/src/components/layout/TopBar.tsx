import { APP_NAME } from "@/utils/constents";
import { DiGithubBadge } from "react-icons/di";

const TopBar = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-4 border-b border-slate-900/10 py-3 lg:mx-0 lg:border-0 lg:px-8 dark:border-slate-300/10">
        <div className="relative flex items-center">
          <h1 className="my-0 py-0 text-2xl font-bold leading-5">
            <a className="flex-none" href="/">
              {APP_NAME}
            </a>
          </h1>

          <div className="flex-0 ml-auto">
            <a href="https://github.com/yanickrochon/i18n" target="_blank">
              <DiGithubBadge size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
