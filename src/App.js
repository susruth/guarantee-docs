import React from 'https://esm.sh/react@18.3.1'
import htm from 'https://esm.sh/htm@3.1.1'
import { NavLink, Route, Routes } from 'https://esm.sh/react-router-dom@6.30.1'
import { PrimaryHero, PrinciplesGrid, QuickstartSection, SiteFooter, SiteHeader } from './components/GuaranteeLanding.js'

const html = htm.bind(React.createElement)

function HomePage() {
  return html`
    <div className="page-shell">
      <div className="container">
        <${SiteHeader} />
        <main>
          <${PrimaryHero} />
          <${PrinciplesGrid} />
          <${QuickstartSection} />
        </main>
        <${SiteFooter} />
      </div>
    </div>
  `
}

function PlaceholderPage({ title, eyebrow, body }) {
  return html`
    <div className="page-shell">
      <div className="container alt-page">
        <div className="section-header">
          <h3>${title}</h3>
          <span className="mono">${eyebrow}</span>
        </div>
        <section className="placeholder-panel">
          <p>${body}</p>
          <${NavLink} className="btn btn-outline" to="/">Back to SDK Overview</${NavLink}>
        </section>
      </div>
    </div>
  `
}

export default function App() {
  return html`
    <${Routes}>
      <${Route} path="/" element=${html`<${HomePage} />`} />
      <${Route}
        path="/docs"
        element=${html`<${PlaceholderPage}
          title="Documentation"
          eyebrow="03 // DOCS"
          body="Reference material, architecture notes, and integration guides would live here in a larger docs experience."
        />`}
      />
      <${Route}
        path="/security"
        element=${html`<${PlaceholderPage}
          title="Security Policy"
          eyebrow="04 // GOVERNANCE"
          body="Security disclosures, reporting contacts, and release hardening guidance would be surfaced on this route."
        />`}
      />
    </${Routes}>
  `
}
