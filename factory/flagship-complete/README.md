# Meta_Kim Flagship Complete

This directory is the single unified bundle for all 20 hand-polished Meta_Kim flagship agents.

- Use this directory when you want the full polished flagship layer in one place instead of browsing the four batch folders separately.
- The four batch directories still exist for staged editing, but `flagship-complete/` is the easiest place to inspect, import, and package all 20 flagship agents together.
- Each flagship remains tied to the same base department seed while carrying sharper ownership, refusal, tool, and handoff rules.

## Included Flagships

| Industry | Department | Runtime Agent ID | Based On |
| --- | --- | --- | --- |
| Game | Strategy Office | `flagship-game-strategy-office` | `game-strategy-office` |
| Internet Product | Growth & Operations | `flagship-internet-growth-operations` | `internet-growth-operations` |
| Finance | Strategy Office | `flagship-finance-strategy-office` | `finance-strategy-office` |
| AI | Product & Delivery | `flagship-ai-product-delivery` | `ai-product-delivery` |
| Healthcare | Risk & Compliance | `flagship-healthcare-risk-compliance` | `healthcare-risk-compliance` |
| Stocks | Research & Intelligence | `flagship-stocks-research-intelligence` | `stocks-research-intelligence` |
| Investment | Research & Intelligence | `flagship-investment-research-intelligence` | `investment-research-intelligence` |
| Web3 | Risk & Compliance | `flagship-web3-risk-compliance` | `web3-risk-compliance` |
| Creator Media | Growth & Operations | `flagship-media-growth-operations` | `media-growth-operations` |
| E-Commerce | Growth & Operations | `flagship-ecommerce-growth-operations` | `ecommerce-growth-operations` |
| Education | Product & Delivery | `flagship-education-product-delivery` | `education-product-delivery` |
| Legal | Risk & Compliance | `flagship-legal-risk-compliance` | `legal-risk-compliance` |
| Manufacturing | Product & Delivery | `flagship-manufacturing-product-delivery` | `manufacturing-product-delivery` |
| Logistics | Growth & Operations | `flagship-logistics-growth-operations` | `logistics-growth-operations` |
| Real Estate | Strategy Office | `flagship-real-estate-strategy-office` | `real-estate-strategy-office` |
| Energy | Strategy Office | `flagship-energy-strategy-office` | `energy-strategy-office` |
| Automotive | Product & Delivery | `flagship-automotive-product-delivery` | `automotive-product-delivery` |
| Travel & Hospitality | Growth & Operations | `flagship-travel-growth-operations` | `travel-growth-operations` |
| Biotech | Research & Intelligence | `flagship-biotech-research-intelligence` | `biotech-research-intelligence` |
| Public Sector | Strategy Office | `flagship-public-sector-strategy-office` | `public-sector-strategy-office` |

## Layout

```text
factory/flagship-complete/
├─ README.md
├─ index.json
├─ agents/*.md
└─ runtime-packs/
   ├─ claude/agents/*.md
   ├─ codex/agents/*.toml
   └─ openclaw/
      ├─ openclaw.template.json
      └─ workspaces/<agent-id>/*
```
