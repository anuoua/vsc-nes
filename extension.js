// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-nes" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsc-nes.nesRun', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const panel = vscode.window.createWebviewPanel(
			'nes-runtime', // Identifies the type of the webview. Used internally
			'Nes', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(context.extensionPath, 'dist')
				]
			} // Webview options. More on these later.
		);

		const realPath = path.join(context.extensionPath, 'dist', 'index.html');
		const realJsPath = panel.webview.asWebviewUri(
			vscode.Uri.file(
				path.join(context.extensionPath, 'dist', 'main.js')
			)
		);

		panel.webview.html = fs.readFileSync(realPath).toString().replace('REPLACE_PATH_VARIABLE/main.js', realJsPath);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};
