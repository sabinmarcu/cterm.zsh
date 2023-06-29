import {
  Builtins,
  Cli,
} from 'clipanion';
import manifest from '../../package.json' assert { type: 'json'};
import { ThemesListCommand } from './Themes.js';
import { ConfigListCommand } from './Configs.js';
import { GenerateCommand } from './Generate.js';
import { UpdateCommand } from './Update.js';
import { ConfigureCommand } from './Configure.js';

const [, app, ...args] = process.argv;
const commands = [
  ThemesListCommand,
  ConfigListCommand,
  GenerateCommand,
  UpdateCommand,
  ConfigureCommand,
  Builtins.HelpCommand,
  Builtins.DefinitionsCommand,
  Builtins.VersionCommand,
];

const cli = new Cli({
  binaryLabel: manifest.name,
  binaryName: `${app.slice(app.lastIndexOf('/') + 1, app.indexOf('.'))}`,
  binaryVersion: manifest.version,
});

for (const command of commands) {
  cli.register(command);
}
cli.runExit(args);
