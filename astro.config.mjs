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
          "https://github.com/eauploader/eauploader-docs/edit/main/",
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
        github: "https://github.com/eauploader",
        discord: "https://discord.gg/RhUQPghgMQ",
      },
      sidebar: [
        {
          label: "Guides",
          translations: {
            ja: "ガイド",
            ko: "가이드",
            "zh-CN": "指南",
          },
          items: [
            {
              label: "Introduction",
              translations: {
                ja: "はじめに",
                ko: "소개",
                "zh-CN": "简介",
              },
              slug: "guides/introduction",
            },
            {
              label: "Getting Started",
              translations: {
                ja: "初めての方向けガイド",
                ko: "처음 사용하는 분을 위한 가이드",
                "zh-CN": "新手指南",
              },
              slug: "guides/getting_started",
            },
            {
              label: "Screen Layout",
              translations: {
                ja: "画面の構成",
                ko: "화면 구성",
                "zh-CN": "界面构成",
              },
              slug: "guides/overview",
            },
            {
              label: "Importing and Managing Avatars",
              translations: {
                ja: "アバターのインポートと管理",
                ko: "아바타 가져오기와 관리",
                "zh-CN": "导入和管理Avatar",
              },
              slug: "guides/import",
            },
            {
              label: "Edit Screen",
              translations: {
                ja: "編集画面",
                ko: "편집 화면",
                "zh-CN": "编辑界面",
              },
              slug: "guides/setup",
            },
            {
              label: "Edit Tools",
              translations: {
                ja: "編集ツール",
                ko: "편집 도구",
                "zh-CN": "编辑工具",
              },
              slug: "guides/edit_tools",
            },
            {
              label: "Uploading Avatars",
              translations: {
                ja: "アバターのアップロード",
                ko: "아바타 업로드",
                "zh-CN": "上传Avatar",
              },
              slug: "guides/upload",
            },
            {
              label: "Using VRM Avatars",
              translations: {
                ja: "VRMアバターを使う",
                ko: "VRM 아바타 사용하기",
                "zh-CN": "使用VRM Avatar",
              },
              slug: "guides/vrm",
            },
            {
              label: "Updating and Removing",
              translations: {
                ja: "EAUploaderの更新と削除",
                ko: "EAUploader 업데이트와 삭제",
                "zh-CN": "更新和删除EAUploader",
              },
              slug: "guides/update",
            },
          ],
        },
        {
          label: "F&Q",
          translations: {
            ja: "F&Q",
            ko: "F&Q",
            "zh-CN": "常见问题",
          },
          items: [
            {
              label: "Missing Shader",
              translations: {
                ja: "シェーダーが見つからないエラー",
                ko: "셰이더를 찾을 수 없는 오류",
                "zh-CN": "找不到着色器的错误",
              },
              slug: "faq/missing_shader",
            },
            {
              label: "Troubleshooting",
              translations: {
                ja: "よくある質問とトラブルシューティング",
                ko: "자주 묻는 질문과 문제 해결",
                "zh-CN": "常见问题与故障排除",
              },
              slug: "faq/troubleshooting",
            },
          ],
        },
        {
          label: "For Tool Developers",
          translations: {
            ja: "ツール製作者向け",
            ko: "도구 제작자용",
            "zh-CN": "工具开发者",
          },
          items: [
            {
              label: "Quick Start Guidance",
              translations: {
                ja: "クイックスタートガイダンス",
                ko: "빠른 시작 가이드",
                "zh-CN": "快速入门指南",
              },
              slug: "for_tooldev/extension",
            },
            {
              label: "UI Components",
              translations: {
                ja: "UIコンポーネント",
                ko: "UI 컴포넌트",
                "zh-CN": "UI组件",
              },
              slug: "for_tooldev/ui_components",
            },
          ],
        },
        {
          label: "For Developers",
          translations: {
            ja: "開発者向け",
            ko: "개발자용",
            "zh-CN": "开发者",
          },
          items: [
            {
              label: "Environment Setup",
              translations: {
                ja: "環境構築",
                ko: "환경 구성",
                "zh-CN": "环境搭建",
              },
              slug: "for_dev/environment",
            },
            {
              label: "Construction",
              translations: {
                ja: "構造",
                ko: "구조",
                "zh-CN": "结构",
              },
              slug: "for_dev/construction",
            },
            {
              label: "Editor",
              translations: {
                ko: "Editor",
                "zh-CN": "Editor",
              },
              slug: "for_dev/editor",
            },
            {
              label: "Runtime",
              translations: {
                ko: "Runtime",
                "zh-CN": "Runtime",
              },
              slug: "for_dev/runtime",
            },
            {
              label: "Logging",
              translations: {
                ja: "ログ出力機能仕様書",
                ko: "로그 출력 기능 사양서",
                "zh-CN": "日志输出功能规格",
              },
              slug: "for_dev/logging",
            },
            {
              label: "Localization and Resources",
              translations: {
                ja: "多言語対応とリソース",
                ko: "다국어 지원과 리소스",
                "zh-CN": "多语言支持与资源",
              },
              slug: "for_dev/localization",
            },
          ],
        },
        {
          label: "API Reference",
          translations: {
            ko: "API 레퍼런스",
            "zh-CN": "API参考",
          },
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
