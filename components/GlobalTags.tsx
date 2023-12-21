import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Facebook metatags */}
      <meta property="og:url" content="https://teciplast.deco.site" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Teciplast - Tecidos e Decorações" />
      <meta
        property="og:description"
        content="A Teciplast está há mais de 30 anos no mercado, fornecendo produtos de altíssima qualidade e preço justo para a sua casa. "
      />
      <meta
        property="og:image"
        content="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2821/4944938b-a424-4d80-97cd-eced7deb5746"
      />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="teciplast.deco.site" />
      <meta property="twitter:url" content="https://teciplast.deco.site" />
      <meta name="twitter:title" content="Teciplast - Tecidos e Decorações" />
      <meta
        name="twitter:description"
        content="A Teciplast está há mais de 30 anos no mercado, fornecendo produtos de altíssima qualidade e preço justo para a sua casa. "
      />
      <meta
        name="twitter:image"
        content="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2821/4944938b-a424-4d80-97cd-eced7deb5746"
      />

      {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
