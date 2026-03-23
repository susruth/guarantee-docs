import React from 'https://esm.sh/react@18.3.1'
import htm from 'https://esm.sh/htm@3.1.1'
import { Link } from 'https://esm.sh/react-router-dom@6.30.1'

const html = htm.bind(React.createElement)

const principles = [
  {
    title: 'Hardware Agnostic',
    text: 'Write standard Rust once. Deploy to Intel SGX, AMD SEV-SNP, or AWS Nitro Enclaves. The abstraction layer handles platform-specific hardware instructions automatically.',
  },
  {
    title: 'Verifiable Attestation',
    text: 'Generate remote attestation quotes natively. Relying parties can cryptographically verify that the specific binary is running on genuine hardware before sending sensitive data.',
  },
  {
    title: 'Memory Safe Foundation',
    text: 'No unsafe C wrappers around legacy SDKs. Guarantee is written in pure Rust, leveraging the compiler to ensure memory safety inside the critical execution boundary.',
  },
]

const installCommands = ['$ cargo add guarantee', '$ cargo add guarantee-build --build']

function SectionHeader({ title, detail, id }) {
  return html`
    <div className="section-header" id=${id}>
      <h3>${title}</h3>
      <span className="mono">${detail}</span>
    </div>
  `
}

function InstallCommand({ command }) {
  const [copied, setCopied] = React.useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return html`
    <div className="install-box mono">
      <span>${command}</span>
      <button type="button" className="copy-pill" aria-label=${`Copy ${command}`} onClick=${onCopy}>
        ${copied ? '[COPIED]' : '[COPY]'}
      </button>
    </div>
  `
}

export function SiteHeader() {
  return html`
    <header className="site-header">
      <div className="header-top">
        <div className="logo-text">GUARANTEE</div>
        <nav className="mono" aria-label="Primary navigation">
          <${Link} to="/docs">Documentation</${Link}>
          <a href="#github">GitHub</a>
          <a href="#crates">Crates.io</a>
        </nav>
      </div>
      <div className="header-bottom">
        <span>Open Source Rust TEE SDK</span>
        <span>v1.0.4 - Stable</span>
      </div>
    </header>
  `
}

export function PrimaryHero() {
  return html`
    <section className="hero">
      <div className="hero-content">
        <h2>Cryptographic Attestation.<br />Zero C Bindings.</h2>
        <p>
          Execute Rust code inside Trusted Execution Environments (TEEs) with mathematically verifiable proof of execution.
          Built for modern cryptographic infrastructure.
        </p>
        <div className="btn-group">
          <a href="#quickstart" className="btn btn-primary">Initialize SDK</a>
          <a href="#architecture" className="btn btn-outline">Architecture Spec</a>
        </div>
      </div>
      <div className="hero-graphic mono" aria-label="Attestation state diagram">
        <div className="graphic-grid">
          <div className="graphic-block graphic-block-lower"></div>
          <div className="graphic-block graphic-block-upper"></div>
        </div>
        <div>STATE: UNTRUSTED_HOST -&gt; SECURE_ENCLAVE</div>
        <div>VERIFICATION: ATTESTED</div>
      </div>
    </section>
  `
}

export function PrinciplesGrid() {
  return html`
    <${React.Fragment}>
      <${SectionHeader} title="Core Principles" detail="01 // ARCHITECTURE" id="architecture" />
      <section className="grid-layout" aria-label="Core principles">
        ${principles.map(
          (principle) => html`
            <article className="grid-item" key=${principle.title}>
              <h3 className="mono">${principle.title}</h3>
              <p>${principle.text}</p>
            </article>
          `,
        )}
      </section>
    </${React.Fragment}>
  `
}

export function QuickstartSection() {
  const code = `// Define the trusted execution boundary
use guarantee::{Enclave, AttestationQuote};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1. Initialize the Secure Enclave
    let enclave = Enclave::init(
        "target/release/libcompute.so",
        guarantee::HardwareMode::Auto
    )?;

    // 2. Generate cryptographically secure quote
    let quote: AttestationQuote = enclave.generate_quote()?;

    // 3. Verify against hardware manufacturer PKI
    if quote.verify_integrity() {
        println!("Attestation verified. Enclave is secure.");
        // Proceed with sensitive computation
    }

    Ok(())
}`

  return html`
    <${React.Fragment}>
      <${SectionHeader} title="Implementation" detail="02 // QUICKSTART" id="quickstart" />
      <section className="tech-section">
        <div className="tech-info">
          <p className="quickstart-copy">
            Add Guarantee to your cargo project. The core crate includes primitives for enclave lifecycle management and
            remote attestation protocols.
          </p>
          ${installCommands.map((command) => html`<${InstallCommand} command=${command} key=${command} />`)}
        </div>
        <div className="code-window">
          <pre><code>${code}</code></pre>
        </div>
      </section>
    </${React.Fragment}>
  `
}

export function SiteFooter() {
  return html`
    <footer>
      <div className="mono">GUARANTEE SDK // 2024</div>
      <div className="footer-links mono">
        <${Link} to="/security">Security Policy</${Link}>
        <a href="#license">License (MIT)</a>
        <a href="#discord">Discord</a>
      </div>
    </footer>
  `
}
