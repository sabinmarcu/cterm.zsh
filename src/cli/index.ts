import {
  Builtins,
  Cli,
} from 'clipanion';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { ConfigListCommand } from './config/Configs.js';
import { themeCommands } from './theme/index.js';
import { keymapCommands } from './mapping/index.js';
import { DefaultCommand } from './Default.js';

const manifestPath = fileURLToPath(new URL('../../package.json', import.meta.url));

const manifest = JSON.parse(
  fs.readFileSync(
    manifestPath,
    'utf8',
  ),
) as Record<string, any>;

const args = process.argv.slice(2);
const commands = [
  DefaultCommand,
  ConfigListCommand,
  ...themeCommands,
  ...keymapCommands,
  Builtins.HelpCommand,
  Builtins.VersionCommand,
];

const cli = new Cli({
  binaryLabel: manifest.name,
  binaryName: manifest.name,
  binaryVersion: manifest.version,
});

for (const command of commands) {
  cli.register(command);
}
cli.runExit(args);
