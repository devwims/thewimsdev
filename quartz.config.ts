import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// 👇 import our custom CSS overrides
import "./styles/custom.css"

/**
 * Quartz 4 Configuration – Customized
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "What’s in My Stack?",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "wims.dev", // 👈 your domain
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",

    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f9fafb", // page background
          lightgray: "#e5e7eb", // borders
          gray: "#9ca3af", // muted text
          darkgray: "#374151", // headings
          dark: "#111827", // body text
          secondary: "#2563eb", // blue-600 accent
          tertiary: "#10b981", // emerald-500 accent
          highlight: "rgba(37,99,235,0.12)", // subtle blue highlight
          textHighlight: "#10b98188", // emerald text highlight
        },
        darkMode: {
          light: "#1f2937", // main dark background
          lightgray: "#374151", // sidebar & code blocks
          gray: "#9ca3af",
          darkgray: "#e5e7eb", // headings in dark mode
          dark: "#f9fafb", // main text
          secondary: "#60a5fa", // blue-400 accent
          tertiary: "#34d399", // emerald-400 accent
          highlight: "rgba(96,165,250,0.12)",
          textHighlight: "#34d39988",
        },
      },
    },
  }, // <-- ADDED THIS to close "configuration"

  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
