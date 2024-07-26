import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export default {
  logo: <b>MiBanco</b>,
  docsRepositoryBase: "https://github.com/AmbossTech/amboss-banco-docs",
  project: {
    link: "https://github.com/AmbossTech/",
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – MiBanco",
      };
    }
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://mibanco.app" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <link rel="icon" href="/docs/favicon.ico" type="image/ico" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "MiBanco"} />
        <meta
          property="og:description"
          content={frontMatter.description || "Banking for the Unbanked"}
        />
      </>
    );
  },
  footer: {
    text: (
      <span>
        AGPLv3 {new Date().getFullYear()} ©{" "}
        <a href="https://mibanco.app" target="_blank">
          MiBanco
        </a>
        .
      </span>
    ),
  },
};
