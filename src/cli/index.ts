import {
  Builtins,
  Cli,
} from 'clipanion';
import manifest from '../../package.json' assert { type: 'json'};
import { ThemesListCommand } from './theme/Themes.js';
import { ConfigListCommand } from './config/Configs.js';
import { GenerateCommand } from './theme/Generate.js';
import { UpdateCommand } from './theme/Update.js';
import { ConfigureCommand } from './theme/Configure.js';

const args = process.argv.slice(2);
const commands = [
  ThemesListCommand,
  ConfigListCommand,
  GenerateCommand,
  UpdateCommand,
  Builtins.HelpCommand,
  Builtins.DefinitionsCommand,
  Builtins.VersionCommand,
  ConfigureCommand,
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
