import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return { title: t("Terms") };
}

export default async function Page() {
  const locale = await getLocale();
  const Content = (await import(`./${locale}.mdx`).catch(async () => {
    if (locale === "zh-TW") {
      return import("./zh.mdx");
    }
    throw new Error("Locale not supported");
  })).default;
  return <Content />;
}
