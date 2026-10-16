// Lists production and development dependency licenses of the current package as a Markdown report,
// e.g. for the GitHub Actions job summary. Run it through `yarn run` so license-checker-rseidelsohn is on PATH.
// Usage: node ../scripts/licenses-report.mjs
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const formatLicenses = (licenses) => (Array.isArray(licenses) ? licenses.join(' OR ') : licenses || 'UNKNOWN');

const getPackages = (dependencyType) => {
  const output = execFileSync(
    'license-checker-rseidelsohn',
    ['--excludePrivatePackages', `--${dependencyType}`, '--json'],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );

  return JSON.parse(output);
};

const renderSection = (title, packages) => {
  const entries = Object.entries(packages).sort(([a], [b]) => a.localeCompare(b));
  const counts = new Map();

  for (const [, info] of entries) {
    const license = formatLicenses(info.licenses);
    counts.set(license, (counts.get(license) ?? 0) + 1);
  }

  const lines = [
    `## ${title} licenses (${entries.length} packages)`,
    '',
    '| License | Packages |',
    '| --- | ---: |',
    ...[...counts].sort(([, a], [, b]) => b - a).map(([license, count]) => `| ${license} | ${count} |`),
    '',
    '<details>',
    `<summary>All ${title.toLowerCase()} packages</summary>`,
    '',
    '| Package | License | Repository |',
    '| --- | --- | --- |',
    ...entries.map(([name, info]) => `| ${name} | ${formatLicenses(info.licenses)} | ${info.repository ?? ''} |`),
    '',
    '</details>',
    '',
  ];

  return lines.join('\n');
};

const sections = [
  renderSection('Production', getPackages('production')),
  renderSection('Development', getPackages('development')),
];

process.stdout.write(`${sections.join('\n')}\n`);
