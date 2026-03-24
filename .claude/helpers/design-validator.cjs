#!/usr/bin/env node
/**
 * Design System Validator
 * Pre/post-edit hook that validates UI files against design system rules.
 * Checks for common anti-patterns and enforces token usage.
 *
 * Used by RuFlo's hook system:
 *   Pre-edit: warns if design system is missing
 *   Post-edit: checks for anti-patterns in modified UI files
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// Anti-patterns to detect in UI code
const ANTI_PATTERNS = [
  {
    name: 'hardcoded-hex',
    pattern: /#([0-9A-Fa-f]{3,8})\b/g,
    severity: 'HIGH',
    message: 'Hardcoded hex color found. Use CSS tokens: var(--color-primary)',
    exclude: ['design-system/', '.css', 'MASTER.md', 'SKILL.md', '.md']
  },
  {
    name: 'emoji-icon',
    pattern: /[^\w\s][\u{1F300}-\u{1F9FF}]|[\u{1F300}-\u{1F9FF}]/gu,
    severity: 'MEDIUM',
    message: 'Emoji detected in UI. Use SVG icons (Lucide, Heroicons) instead',
    exclude: ['SKILL.md', '.md', 'README']
  },
  {
    name: 'missing-cursor-pointer',
    pattern: /onClick|onPress/g,
    checkAbsence: /cursor[:-]\s*pointer/,
    severity: 'MEDIUM',
    message: 'Interactive element may be missing cursor-pointer',
    exclude: ['.md', 'SKILL.md']
  },
  {
    name: 'small-touch-target',
    pattern: /(?:width|height|w-|h-)(\d+)(?:px)?/g,
    severity: 'LOW',
    message: 'Check touch target size — minimum 44px required',
    exclude: ['.md', 'SKILL.md']
  }
];

// UI file extensions to validate
const UI_EXTENSIONS = ['.tsx', '.jsx', '.vue', '.svelte', '.html', '.css', '.scss'];

/**
 * Check if a file is a UI file
 */
function isUIFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return UI_EXTENSIONS.includes(ext);
}

/**
 * Check if a path should be excluded from validation
 */
function shouldExclude(filePath, excludePatterns) {
  return excludePatterns.some(pattern => filePath.includes(pattern));
}

/**
 * Validate a UI file for design system compliance
 * @param {string} filePath - Path to file to validate
 * @returns {object} Validation result with issues found
 */
function validateFile(filePath) {
  if (!isUIFile(filePath)) {
    return { valid: true, skipped: true, reason: 'Not a UI file' };
  }

  if (!fs.existsSync(filePath)) {
    return { valid: true, skipped: true, reason: 'File does not exist' };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];

  for (const rule of ANTI_PATTERNS) {
    if (shouldExclude(filePath, rule.exclude || [])) continue;

    const matches = [...content.matchAll(rule.pattern)];
    if (matches.length > 0) {
      issues.push({
        rule: rule.name,
        severity: rule.severity,
        message: rule.message,
        count: matches.length,
        examples: matches.slice(0, 3).map(m => m[0])
      });
    }
  }

  return {
    valid: issues.filter(i => i.severity === 'CRITICAL').length === 0,
    file: path.basename(filePath),
    issues
  };
}

/**
 * Check if design system MASTER.md exists
 */
function checkDesignSystem() {
  const masterPath = path.join(PROJECT_ROOT, 'design-system', 'MASTER.md');
  const exists = fs.existsSync(masterPath);

  return {
    exists,
    path: masterPath,
    message: exists
      ? `Design system found at ${masterPath}`
      : 'No design-system/MASTER.md. Generate with: python3 src/ui-ux-pro-max/scripts/search.py "<project>" --design-system --persist'
  };
}

/**
 * Get page-specific override if it exists
 */
function getPageOverride(pageName) {
  if (!pageName) return null;

  const slug = pageName.toLowerCase().replace(/\s+/g, '-');
  const pagePath = path.join(PROJECT_ROOT, 'design-system', 'pages', `${slug}.md`);

  if (fs.existsSync(pagePath)) {
    return {
      exists: true,
      path: pagePath,
      content: fs.readFileSync(pagePath, 'utf-8')
    };
  }

  return { exists: false, path: pagePath };
}

/**
 * Pre-edit hook handler
 */
function preEdit(filePath) {
  if (!isUIFile(filePath)) {
    return { proceed: true };
  }

  const dsCheck = checkDesignSystem();
  const result = {
    proceed: true,
    file: path.basename(filePath),
    designSystem: dsCheck
  };

  if (!dsCheck.exists) {
    result.warning = `[DESIGN VALIDATOR] ${dsCheck.message}`;
    console.warn(result.warning);
  }

  return result;
}

/**
 * Post-edit hook handler
 */
function postEdit(filePath) {
  if (!isUIFile(filePath)) {
    return { skipped: true };
  }

  const validation = validateFile(filePath);

  if (validation.issues && validation.issues.length > 0) {
    const critical = validation.issues.filter(i => i.severity === 'CRITICAL');
    const high = validation.issues.filter(i => i.severity === 'HIGH');

    if (critical.length > 0) {
      console.error(`[DESIGN VALIDATOR] CRITICAL issues in ${validation.file}:`);
      critical.forEach(i => console.error(`  - ${i.message} (${i.count} occurrences)`));
    }

    if (high.length > 0) {
      console.warn(`[DESIGN VALIDATOR] HIGH priority issues in ${validation.file}:`);
      high.forEach(i => console.warn(`  - ${i.message} (${i.count} occurrences)`));
    }
  } else {
    console.log(`[DESIGN VALIDATOR] ${path.basename(filePath)} - No issues found`);
  }

  return validation;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--check-ds')) {
    const result = checkDesignSystem();
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.exists ? 0 : 1);
  }

  if (args.includes('--pre-edit')) {
    const fileIdx = args.indexOf('--file');
    const filePath = fileIdx !== -1 ? args[fileIdx + 1] : args[args.indexOf('--pre-edit') + 1];
    const result = preEdit(filePath);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  if (args.includes('--post-edit')) {
    const fileIdx = args.indexOf('--file');
    const filePath = fileIdx !== -1 ? args[fileIdx + 1] : args[args.indexOf('--post-edit') + 1];
    const result = postEdit(filePath);
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.valid ? 0 : 1);
  }

  // Validate a file directly
  if (args[0] && !args[0].startsWith('--')) {
    const result = validateFile(args[0]);
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.valid ? 0 : 1);
  }

  console.log('Usage:');
  console.log('  node design-validator.cjs <file>           Validate a file');
  console.log('  node design-validator.cjs --check-ds       Check design system');
  console.log('  node design-validator.cjs --pre-edit <file>');
  console.log('  node design-validator.cjs --post-edit <file>');
}

module.exports = { validateFile, checkDesignSystem, getPageOverride, preEdit, postEdit, isUIFile };
