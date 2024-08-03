// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import SideBarProvider from './SideBar/SideBarProvide';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('translation-panel.translate', () => {
          // Create and show panel
          const panel = vscode.window.createWebviewPanel(
            'translate-sidebar',
            'Translate',
            vscode.ViewColumn.One,
            {}
          );

          // And set its HTML content
          panel.webview.html = getWebviewContent();
        })
      );

    const provider = new SideBarProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(SideBarProvider.viewType, provider)
    );
}

export function getWebviewContent() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>
      <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
  </body>
  </html>`;
  }
