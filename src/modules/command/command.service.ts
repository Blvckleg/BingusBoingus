import { Injectable } from '@nestjs/common';
import { Collection } from 'discord.js';
import { PingPongCommand } from './commands/pingpong';
import { CBDCommand } from './commands/cbd';
import { HelloCommand } from './commands/hello';
import { ACommand } from './command.abstract';
import { ReportedCommand } from './commands/reported';

@Injectable()
export class CommandService {
  private commands: Collection<string, ACommand> = new Collection();

  constructor(
    pingpongModule: PingPongCommand,
    helloModule: HelloCommand,
    cbdModule: CBDCommand,
    reportedModule: ReportedCommand,
  ) {
    const commands: ACommand[] = [pingpongModule, helloModule, cbdModule, reportedModule];
    commands.forEach((command) => {
      if (command.data.name && command.execute) {
        console.log('command-name: ' + command.data.name);
        this.commands.set(command.data.name, command);
      } else {
        console.error("couldn't read command:");
        console.error(this);
      }
    });
  }

  public getCommand(commandName: string): ACommand {
    if (this.commands.has(commandName)) return this.commands.get(commandName);
    return null;
  }

  getAllCommands() {
    return this.commands;
  }
}
