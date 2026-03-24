#!/usr/bin/env node
/**
 * UI/UX Pro Max Search Bridge
 * Node.js wrapper around the Python BM25 search engine.
 * Called by RuFlo hooks and agents to query design intelligence.
 *
 * Usage:
 *   node ui-ux-search.cjs --query "SaaS dashboard" --domain style
 *   node ui-ux-search.cjs --query "fintech app" --design-system --project "MyApp"
 *   node ui-ux-search.cjs --query "B2B SaaS" --design-system --persist --page "dashboard"
 */

const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const SCRIPTS_DIR = path.join(PROJECT_ROOT, 'src', 'ui-ux-pro-max', 'scripts');
const SEARCH_SCRIPT = path.join(SCRIPTS_DIR, 'search.py');

/**
 * Check if the Python search engine is available
 */
function checkAvailability() {
  if (!fs.existsSync(SEARCH_SCRIPT)) {
    return { available: false, reason: `search.py not found at ${SEARCH_SCRIPT}` };
  }

  // Check Python
  const python = spawnSync('python3', ['--version'], { encoding: 'utf-8' });
  if (python.error) {
    const python2 = spawnSync('python', ['--version'], { encoding: 'utf-8' });
    if (python2.error) {
      return { available: false, reason: 'Python 3 not installed' };
    }
  }

  return { available: true };
}

/**
 * Run a domain search
 * @param {string} query - Search query
 * @param {string} domain - Domain (style, color, typography, product, ux, chart, landing, google-fonts, react, web)
 * @param {number} maxResults - Maximum results to return
 * @returns {object} Search results
 */
function search(query, domain = null, maxResults = 3) {
  const check = checkAvailability();
  if (!check.available) {
    return { error: check.reason };
  }

  const args = ['python3', SEARCH_SCRIPT, query, '-n', String(maxResults)];
  if (domain) args.push('--domain', domain);
  args.push('--json');

  try {
    const result = spawnSync(args[0], args.slice(1), {
      encoding: 'utf-8',
      cwd: PROJECT_ROOT,
      timeout: 30000
    });

    if (result.error) {
      return { error: result.error.message };
    }

    if (result.status !== 0) {
      return { error: result.stderr || 'Search failed' };
    }

    return JSON.parse(result.stdout);
  } catch (err) {
    return { error: err.message };
  }
}

/**
 * Generate a full design system recommendation
 * @param {string} query - Product/project description
 * @param {string} projectName - Project name for output
 * @param {string} format - Output format: 'ascii' or 'markdown'
 * @param {object} options - { persist, page, outputDir }
 * @returns {string} Formatted design system
 */
function generateDesignSystem(query, projectName = null, format = 'ascii', options = {}) {
  const check = checkAvailability();
  if (!check.available) {
    return `[UI-UX-PRO-MAX] Not available: ${check.reason}`;
  }

  const args = ['python3', SEARCH_SCRIPT, query, '--design-system', '--format', format];

  if (projectName) args.push('--project-name', projectName);
  if (options.persist) args.push('--persist');
  if (options.page) args.push('--page', options.page);
  if (options.outputDir) args.push('--output-dir', options.outputDir);

  try {
    const result = spawnSync(args[0], args.slice(1), {
      encoding: 'utf-8',
      cwd: PROJECT_ROOT,
      timeout: 60000
    });

    if (result.error) {
      return `[UI-UX-PRO-MAX] Error: ${result.error.message}`;
    }

    return result.stdout || result.stderr || '[UI-UX-PRO-MAX] No output';
  } catch (err) {
    return `[UI-UX-PRO-MAX] Error: ${err.message}`;
  }
}

/**
 * Search stack-specific guidelines
 * @param {string} query - Search query
 * @param {string} stack - Stack name (react-native)
 * @returns {object} Stack guidelines
 */
function searchStack(query, stack) {
  const check = checkAvailability();
  if (!check.available) {
    return { error: check.reason };
  }

  const args = ['python3', SEARCH_SCRIPT, query, '--stack', stack, '--json'];

  try {
    const result = spawnSync(args[0], args.slice(1), {
      encoding: 'utf-8',
      cwd: PROJECT_ROOT,
      timeout: 30000
    });

    if (result.error) {
      return { error: result.error.message };
    }

    return JSON.parse(result.stdout);
  } catch (err) {
    return { error: err.message };
  }
}

/**
 * Check if a file is a UI file that should trigger design validation
 */
function isUIFile(filePath) {
  const uiExtensions = ['.tsx', '.jsx', '.vue', '.svelte', '.html', '.css', '.scss', '.sass'];
  const ext = path.extname(filePath).toLowerCase();
  return uiExtensions.includes(ext);
}

/**
 * Pre-edit hook: validate design system is available before UI edits
 */
function preEditHook(filePath) {
  if (!isUIFile(filePath)) return { proceed: true };

  const masterPath = path.join(PROJECT_ROOT, 'design-system', 'MASTER.md');
  if (!fs.existsSync(masterPath)) {
    return {
      proceed: true,
      warning: '[UI-UX-PRO-MAX] No design-system/MASTER.md found. Run: python3 src/ui-ux-pro-max/scripts/search.py "<project>" --design-system --persist'
    };
  }

  return { proceed: true };
}

/**
 * Post-edit hook: store successful UI patterns in AgentDB
 */
function postEditHook(filePath, success = true) {
  if (!isUIFile(filePath) || !success) return;

  // Log the pattern for future reference
  console.log(`[UI-UX-PRO-MAX] UI file modified: ${path.basename(filePath)}`);
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--check')) {
    const check = checkAvailability();
    console.log(JSON.stringify(check, null, 2));
    process.exit(check.available ? 0 : 1);
  }

  const queryIdx = args.findIndex(a => a === '--query' || a === '-q');
  if (queryIdx === -1) {
    console.error('Usage: node ui-ux-search.cjs --query "<query>" [--domain <domain>] [--design-system] [--project "Name"]');
    process.exit(1);
  }

  const query = args[queryIdx + 1];
  const domainIdx = args.findIndex(a => a === '--domain' || a === '-d');
  const domain = domainIdx !== -1 ? args[domainIdx + 1] : null;
  const projectIdx = args.findIndex(a => a === '--project' || a === '-p');
  const projectName = projectIdx !== -1 ? args[projectIdx + 1] : null;

  if (args.includes('--design-system') || args.includes('-ds')) {
    const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'ascii';
    const persist = args.includes('--persist');
    const pageIdx = args.findIndex(a => a === '--page');
    const page = pageIdx !== -1 ? args[pageIdx + 1] : null;

    const result = generateDesignSystem(query, projectName, format, { persist, page });
    console.log(result);
  } else {
    const result = search(query, domain);
    console.log(JSON.stringify(result, null, 2));
  }
}

module.exports = { search, generateDesignSystem, searchStack, checkAvailability, preEditHook, postEditHook, isUIFile };
