import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import SearchPage from "@/src/components/SearchPage/SearchPage";

const Search: NextPage = () => {
  const router = useRouter();
  const [path, setPath] = useState(router.asPath);

  useEffect(() => {
    if (router.asPath !== path) {
      router.push(router.asPath);
      setPath(router.asPath);
    }
  }, [router, path]);

  if (router.asPath !== path) {
    return null;
  }
  return <SearchPage />;
};

export default Search;
