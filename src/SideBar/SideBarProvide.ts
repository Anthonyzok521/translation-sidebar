import * as vscode from 'vscode';

class SideBarProvider implements vscode.WebviewViewProvider {

    public static readonly viewType: string = 'translate-sidebar';

    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri
    ) { }

    public async resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken) {

        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = await this._getHtmlForwebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(data => {
            switch (data) {
                case 'chat':
                    {
                        console.log("Char:", data.message);
                        vscode.commands.executeCommand('translation-sidebar.translate', { text: data.message });
                        break;
                    }
            }
        });
    }

    private async _getHtmlForwebview(webview: vscode.Webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'main.js'));
        const style = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'style.css'));
        const image = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'icon.svg'));
        const copy = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'copy.svg'));
        const nonce = getNonce();

        let html: string = `
        <!DOCTYPE html>
        <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Translation Sidebar</title>
    <link rel="stylesheet" type="text/css" href="${style}" nonce="{nonce}">
</head>

<body>
    <div class="container">
      <div class="image">
        <img src="${image}" />
      </div>
      <div class="languages">
        <div class="lang select" id="lang1">English</div>
        <span class="space"></span>
        <div class="lang" id="lang2">Spanish</div>
      </div>
      <div class="boxs">
        <textarea aria-multiline="true" id="input"> </textarea>
        <div class="space"></div>
        <div class="out">
            <textarea readonly aria-multiline="true" id="output"> </textarea>
            <div class="loader"></div>
            <img class="copy" src="${copy}">
        </div>
        <div class="langs-code">
            <div class="code anim">En</div>
            <div class="code anim">Es</div>
        </div>
      </div>
      <div class="action-btn">
        <button id="btn">Translate</button>
      </div>
    </div>
    <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
</body>

</html>
        `;

        return html;
    }

}

function getNonce() {
    let text = '';

    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export default SideBarProvider;
