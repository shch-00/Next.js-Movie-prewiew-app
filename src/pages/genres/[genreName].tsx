import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import GenrePage from "@/src/components/GenrePage/GenrePage";

const Genre: NextPage = () => {
  const router = useRouter();
  const [path, setPath] = useState(router.asPath);

  useEffect(() => {
    if (router.asPath !== path) {
      router.push(router.asPath);
    }
  }, [router, path]);

  if (router.asPath !== path) {
    return null;
  }

  return <GenrePage />;
};

export default Genre;
