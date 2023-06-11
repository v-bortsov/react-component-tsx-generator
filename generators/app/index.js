'use strict';
const Generator = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');
const rename = require("gulp-rename");
module.exports = class extends Generator {
  prompting() {
    // this.log(
    //   chalk.blue(' ____                 _') + '\n' +
    //   chalk.blue('|  _ \\ ___  __ _  ___| |_') + '\n' +
    //   chalk.blue('| |_) / _ \\/ _` |/ __| __|') + '\n' +
    //   chalk.blue('|  _ <  __/ (_| | (__| |_') + '\n' +
    //   chalk.blue('|_|_\\_\\___|\\__,_|\\___|\\__|                         _') + '\n' +
    //   chalk.blue(' / ___|___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_') + '\n' +
    //   chalk.blue('| |   / _ \\| \'_ ` _ \\| \'_ \\ / _ \\| \'_ \\ / _ \\ \'_ \\| __|') + '\n' +
    //   chalk.blue('| |__| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_') + '\n' +
    //   chalk.blue(' \\____\\___/|_| |_| |_| .__/ \\___/|_| |_|\\___|_| |_|\\__|') + '\n' +
    //   chalk.blue(' / ___| ___ _ __   __|_| __ __ _| |_ ___  _ __\'') + '\n' +
    //   chalk.blue('| |  _ / _ \\ \'_ \\ / _ \\ \'__/ _` | __/ _ \\| \'__|') + '\n' +
    //   chalk.blue('| |_| |  __/ | | |  __/ | | (_| | || (_) | |') + '\n' +
    //   chalk.blue(' \\____|\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|') + '\n'
    // );

    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'First, what is the name of your Component?',
        default: 'My React Component'
      }
    ];

      return this.prompt(prompts)
        .then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
    });
  }

  writing() {
    var props = this.props;
    // this.registerTransformStream(
    //   rename(function(path) {
    //     console.log('its path', path);

    //     path.dirname = path.dirname.replace(/(Component)/gi, props.componentName);
    //     path.basename = path.basename.replace(/(Component)/gi, props.componentName);
    //   })
    // );
    var componentName = _.camelCase(_.deburr(this.props.componentName))
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
    this.fs.copyTpl(
      this.templatePath('_index.ts'), this.destinationPath(this.contextRoot +`/${componentName}/index.ts`), {
        name: componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_Component.tsx'), this.destinationPath(this.contextRoot +`/${componentName}/${componentName}.tsx`), {
        name: componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_Component.module.scss'), this.destinationPath(this.contextRoot +`/${componentName}/${componentName}.module.scss`), {
        name: componentName
      }
    );
    this.fs.copyTpl(
      this.templatePath('tests/_Component.test.tsx'), this.destinationPath(this.contextRoot +`/${componentName}/tests/${componentName}.test.tsx`), {
        name: componentName
      }
    );
    // var componentsRoot = this.fs.read(this.contextRoot + "/components/index.ts")
    // this.fs.write(filePath, content)
    // this.fs.append(this.contextRoot + "/components/index.ts", `export * from './${componentName}';`);

    this.fs.copy(
      this.destinationPath(this.contextRoot + "/index.ts"),
      this.destinationPath(this.contextRoot + "/index.ts"),
      {
        process: function (contents) {
          return contents += '\n' + `export * from './${componentName}';`;
        }
      }
    );
  }

  install() {
    // this.installDependencies();
  }
};
