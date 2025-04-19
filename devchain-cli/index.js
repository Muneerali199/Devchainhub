#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const axios = require('axios');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

// Display banner
console.log(
    chalk.blue(
        figlet.textSync('DevChain CLI', { horizontalLayout: 'full' })
    )
);

program
    .version('1.0.0')
    .description('DevChainHub Command Line Interface');

program
    .command('init <project>')
    .description('Initialize a new blockchain project')
    .option('-c, --chain <chain>', 'Blockchain network (ethereum, polygon, etc.)', 'ethereum')
    .action(async(project, options) => {
        try {
            console.log(chalk.green(`Creating new ${options.chain} project: ${project}`));

            // Call backend API to create project
            const { data } = await axios.post('http://localhost:5000/api/projects', {
                name: project,
                chain: options.chain
            });

            console.log(chalk.green(`Project created successfully!`));
            console.log(`Git Repo: ${data.repoUrl}`);
            console.log(`Contract Address: ${data.contractAddress}`);

            // Initialize local git repo
            if (shell.which('git')) {
                shell.exec('git init');
                shell.exec(`git remote add origin ${data.repoUrl}`);
                console.log(chalk.green(`Git repository initialized`));
            } else {
                console.log(chalk.red('Git is not installed'));
            }
        } catch (err) {
            console.error(chalk.red('Error creating project:'), err.message);
        }
    });

program
    .command('deploy')
    .description('Deploy contracts to blockchain')
    .option('-n, --network <network>', 'Network to deploy to (testnet, mainnet)', 'testnet')
    .action(async(options) => {
        try {
            console.log(chalk.green(`Deploying to ${options.network}...`));

            // Call backend deployment service
            const { data } = await axios.post('http://localhost:5000/api/contracts/deploy', {
                network: options.network
            });

            console.log(chalk.green(`Deployment successful!`));
            console.log(`Transaction Hash: ${data.txHash}`);
            console.log(`Contract Address: ${data.contractAddress}`);
        } catch (err) {
            console.error(chalk.red('Deployment failed:'), err.message);
        }
    });

program.parse(process.argv);