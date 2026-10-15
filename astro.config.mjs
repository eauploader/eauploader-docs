import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";

// https://astro.build/config
export default defineConfig({
  site: "https://eauploader-docs.uslog.tech",
  integrations: [
    starlight({
      plugins: [starlightImageZoom()],
      title: "EAUploader Docs",
      logo: {
        src: "./public/favicon.svg",
      },
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.svg",
          },
        },
      ],
      customCss: [
        "@fontsource/lexend-deca",
        "@fontsource/noto-sans-jp",
        "./src/styles/custom.css",
      ],
      editLink: {
        baseUrl:
          "https://github.com/Project-EAUploader/eauploader-docs/edit/main/",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "日本語",
          lang: "ja",
        },
        en: {
          label: "English",
        },
        "zh-cn": {
          label: "简体中文",
          lang: "zh-CN",
        },
        ko: {
          label: "한국어",
          lang: "ko",
        },
      },
      social: {
        github: "https://github.com/Project-EAUploader",
        discord: "https://discord.gg/RhUQPghgMQ",
      },
      sidebar: [
        {
          label: "Guides",
          translations: {
            ja: "ガイド",
          },
          items: [
            {
              label: "Introduction",
              translations: {
                ja: "はじめに",
              },
              slug: "guides/introduction",
            },
            {
              label: "Getting Started",
              translations: {
                ja: "初めての方向けガイド",
              },
              slug: "guides/getting_started",
            },
            {
              label: "Screen Layout",
              translations: {
                ja: "画面の構成",
              },
              slug: "guides/overview",
            },
            {
              label: "Importing and Managing Avatars",
              translations: {
                ja: "アバターのインポートと管理",
              },
              slug: "guides/import",
            },
            {
              label: "Setup",
              translations: {
                ja: "セットアップ（アバターの調整）",
              },
              slug: "guides/setup",
            },
            {
              label: "Uploading Avatars",
              translations: {
                ja: "アバターのアップロード",
              },
              slug: "guides/upload",
            },
            {
              label: "Using VRM Avatars",
              translations: {
                ja: "VRMアバターを使う",
              },
              slug: "guides/vrm",
            },
            {
              label: "Updating and Removing",
              translations: {
                ja: "EAUploaderの更新と削除",
              },
              slug: "guides/update",
            },
          ],
        },
        {
          label: "F&Q",
          translations: {
            ja: "F&Q",
          },
          items: [
            {
              label: "Missing Shader",
              translations: {
                ja: "シェーダーが見つからないエラー",
              },
              slug: "faq/missing_shader",
            },
            {
              label: "Troubleshooting",
              translations: {
                ja: "よくある質問とトラブルシューティング",
              },
              slug: "faq/troubleshooting",
            },
          ],
        },
        {
          label: "For Tool Developers",
          translations: {
            ja: "ツール製作者向け",
          },
          items: [
            {
              label: "Quick Start Guidance",
              translations: {
                ja: "クイックスタートガイダンス",
              },
              slug: "for_tooldev/extension",
            },
            {
              label: "UI Components",
              translations: {
                ja: "UIコンポーネント",
              },
              slug: "for_tooldev/ui_components",
            },
          ],
        },
        {
          label: "For Developers",
          translations: {
            ja: "開発者向け",
          },
          items: [
            {
              label: "Environment Setup",
              translations: {
                ja: "環境構築",
              },
              slug: "for_dev/environment",
            },
            {
              label: "Construction",
              translations: {
                ja: "構造",
              },
              slug: "for_dev/construction",
            },
            {
              label: "Editor",
              slug: "for_dev/editor",
            },
            {
              label: "Runtime",
              slug: "for_dev/runtime",
            },
            {
              label: "Logging",
              translations: {
                ja: "ログ出力機能仕様書",
              },
              slug: "for_dev/logging",
            },
            {
              label: "Localization and Resources",
              translations: {
                ja: "多言語対応とリソース",
              },
              slug: "for_dev/localization",
            },
          ],
        },
        {
          label: "API Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
