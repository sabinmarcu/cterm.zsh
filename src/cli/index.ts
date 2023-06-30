import {
  Builtins,
  Cli,
} from 'clipanion';
import manifest from '../../package.json' assert { type: 'json'};
import { ConfigListCommand } from './config/Configs.js';
import { themeCommands } from './theme/index.js';
import { keymapCommands } from './mapping/index.js';

const args = process.argv.slice(2);
const commands = [
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
