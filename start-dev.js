#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const gatsbyPath = path.join(__dirname, 'node_modules', 'gatsby', 'cli.js');
const args = process.argv.slice(2); // Get command line arguments

// Use legacy OpenSSL provider for all commands that involve webpack compilation
// This is needed because some webpack loaders still use older crypto algorithms
const spawnOptions = {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--openssl-legacy-provider'
  }
};

const child = spawn('node', [gatsbyPath, ...args], spawnOptions);

child.on('exit', (code) => {
  process.exit(code);
}); 