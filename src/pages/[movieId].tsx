import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import AboutPage from "../components/AboutPage/AboutPage";

const About: NextPage = () => {
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
  return <AboutPage />;
};

export default About;
