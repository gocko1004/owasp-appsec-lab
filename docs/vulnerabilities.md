# Seeded Vulnerabilities — What they are and why they matter

This lab deliberately includes vulnerable components so scanners produce realistic findings. Use this page as a map from *finding → risk → fix*.

## 1) Node.js dependencies (src/vuln-node)
- **What:** `lodash@4.17.19` and `minimist@1.2.0` are intentionally old.
- **Risk:** Older versions of popular libraries have known issues (e.g., prototype pollution, unsafe argument parsing). Attackers abuse these to escalate privileges or inject data.
- **Where scanners flag it:** Trivy filesystem scan and Trivy image scan (it reads `package-lock.json` inside the Docker image).
- **Fix plan:**
  - Upgrade to safe versions (e.g., lodash >= 4.17.21, minimist >= latest 1.2.x).
  - Add Dependabot/Renovate to keep deps fresh.
  - Rebuild and re-scan to prove risk reduction.

## 2) Python requirements (src/vuln-py/requirements.txt)
- **What:** Old `urllib3`, `jinja2`, `flask` versions.
- **Risk:** Older web frameworks and templating engines can enable template injection, response splitting, or other exploits.
- **Where scanners flag it:** Trivy filesystem scan (reads `requirements.txt`), Bandit/Semgrep may flag usage patterns.
- **Fix plan:**
  - Pin to maintained versions (e.g., current Flask/Jinja2/urllib3).
  - Re-run Trivy to confirm CVE count drops.
  - Add a pre-commit SCA gate if desired.

## 3) Docker base image (Dockerfile)
- **What:** `FROM node:14-alpine` (older line).
- **Risk:** End-of-life or old base images accumulate unpatched OS packages and runtime vulns.
- **Where scanners flag it:** Trivy image scan.
- **Fix plan:**
  - Move to an LTS base (e.g., a current supported Node LTS).
  - Rebuild and re-scan to verify fewer criticals/highs.

## 4) Demo secrets (secrets/.env.demo)
- **What:** Fake keys for demonstration.
- **Risk (in real life):** Secrets in repos lead to account takeover or supply-chain compromise.
- **Where scanners flag it:** Trivy (secret scanner) and Gitleaks.
- **Fix plan:**
  - Keep real secrets out of Git. Use environment variables or a secrets manager.
  - Keep `.gitignore` rules for `secrets/`.

## 5) DAST targets (OWASP Juice Shop)
- **What:** Intentionally vulnerable app.
- **Risk:** Multiple OWASP Top 10 categories.
- **Where scanners flag it:** OWASP ZAP baseline/active scans.
- **Fix plan:**
  - Document a few example fixes (e.g., better input validation, safer auth flows) and show ZAP before/after deltas.

---

### Reporting Strategy

- Keep raw scanner outputs in `reports/` and publish summaries in `docs/results.md`.
- In PRs, fail on **High/Critical** findings to enforce gates.
- After fixes, re-run scans to prove reduced severity and count.
