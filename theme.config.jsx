import { useRouter } from "next/router";

export default {
  logo: <b>BANCO</b>,
  docsRepositoryBase: "https://github.com/AmbossTech/amboss-banco-docs",
  project: {
    link: "https://github.com/AmbossTech/",
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Banco",
      };
    }
  },
  footer: {
    text: (
      <span>
        AGPLv3 {new Date().getFullYear()} ©{" "}
        <a href="https://mibanco.app" target="_blank">
          Banco
        </a>
        .
      </span>
    ),
  },
};
