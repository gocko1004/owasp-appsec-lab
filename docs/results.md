# Scan Results Snapshot

This snapshot captures high/critical items and key SAST/DAST flags before remediation.

## Trivy (filesystem, CRITICAL/HIGH only)
See: reports/trivy_fs_high.json

## Trivy (image, CRITICAL/HIGH only)
See: reports/trivy_image_high.json

## Trivy (secrets)
See: reports/trivy_secrets.json

## Gitleaks (secrets)
See: reports/gitleaks_report.json

## Bandit (Python SAST)
See: reports/bandit_report.json

## Semgrep (SAST)
See: reports/semgrep_report.json

## ZAP Baseline (DAST)
See: reports/zap_baseline.html

### Initial interpretation (short)
- Dependencies: expect HIGH/CRITICAL hits on old Node and Python packages.
- Image: expect base OS and Node 14 Alpine CVEs.
- Secrets: fake demo keys should be flagged by Trivy/Gitleaks.
- SAST: eval() and subprocess patterns should be caught (unless already fixed).
- DAST: Juice Shop should show multiple issues (XSS, headers, etc.).

Next step: prioritize fixes, upgrade dependencies, and re-scan to show risk reduction.

## Baseline counts (before fixes)
- Trivy FS High/Critical: PLACEHOLDER_FS_BEFORE
- Trivy Image High/Critical: PLACEHOLDER_IMG_BEFORE

## After fixes
- Trivy FS High/Critical: PLACEHOLDER_FS_AFTER
- Trivy Image High/Critical: PLACEHOLDER_IMG_AFTER

## Checkov severity breakdown (robust)
{
  "UNKNOWN": 15
}
