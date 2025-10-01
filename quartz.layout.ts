import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// ---------------------------------------------
// Custom Footer Text
// ---------------------------------------------
const copyrightText = `© ${new Date().getFullYear()} WIMS – What’s in My Stack`

// ---------------------------------------------
// Shared components (shown on every page)
// ---------------------------------------------
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],

  // 🌟 Custom Footer (no Quartz branding)
  footer: Component.Footer({
    links: {
      [copyrightText]: "#", // not clickable
      GitHub: "https://github.com/your-github-user", // change to yours
      LinkedIn: "https://www.linkedin.com/in/your-id/",
      Contact: "mailto:hello@wims.dev", // change email
    },
    showCopyright: false, // hides default Quartz text
  }),
}

// ---------------------------------------------
// Layout for single-note pages
// ---------------------------------------------
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    // ❌ Removed Graph View
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// ---------------------------------------------
// Layout for tag / folder list pages
// ---------------------------------------------
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
