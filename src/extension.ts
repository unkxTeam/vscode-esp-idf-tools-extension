// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SerialPort } from "serialport";
import * as fs from 'fs'
import * as path from 'path'
// https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-sample/package.json

let selectPortCOM = "PORT";
let selectESPIDFTarget = "esp32";
let get_idf_cmd = "get_idf.bat";

const unkxTerminalOptions = {
    name: "unkx: esp-idf-tools",
    //shellPath: "/bin/bash",
	shellPath: 'cmd',
    shellArgs: [],
	//strictEnv: true,
    cwd: "${workspaceFolder}",// vscode.workspace.workspaceFolders
    env: {
      get_idf: "unkx",
    },
  };

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
//export function activate({ subscriptions }: vscode.ExtensionContext) {
export function activate(context: vscode.ExtensionContext) {

	const myCommandIdSelectPort_0 = 'esp-idf.selectPort';
	const myCommandIdSetTarget_1 = 'esp-idf.setTarget';
	const myCommandIdMenuconfig_2 = 'esp-idf.menuconfig';
	const myCommandIdBuild_3 = 'esp-idf.build';
	const myCommandIdFlash_4 = 'esp-idf.flash';
	const myCommandIdBuildFlash_5 = 'esp-idf.buildFlash';
	const myCommandIdFullclean_6 = 'esp-idf.fullclean';
	const myCommandIdMonitor_7 = 'esp-idf.monitor';
	const myCommandIdBuildFlashMonitor_8 = 'esp-idf.buildFlashMonitor';
	const myCommandIdHelp = 'esp-idf.help';
	
	let myStatusBarItemSelectPort_0: vscode.StatusBarItem;
	let myStatusBarItemSetTarget_1: vscode.StatusBarItem;
	let myStatusBarItemMenuconfig_2: vscode.StatusBarItem;
	let myStatusBarItemSetBuild_3: vscode.StatusBarItem;
	let myStatusBarItemSetFlash_4: vscode.StatusBarItem;
	let myStatusBarItemBuildFlash_5: vscode.StatusBarItem;
	let myStatusBarItemFullclean_6: vscode.StatusBarItem;
	let myStatusBarItemMonitor_7: vscode.StatusBarItem;
	let myStatusBarItemBuildFlashMonitor_8: vscode.StatusBarItem;
	let myStatusBarItemdHelp: vscode.StatusBarItem;

	// Create terminal
	updateParameter();
	let unkxTerminal = createUnkxTerminal();	

	// Register a command that is invoked when the status bar
	// https://code.visualstudio.com/api/references/icons-in-labels
	// 0. Select Port to Use(COM, tty), plug,  
	// 1. ESP-IDF-Tools: Set Espressif device target(IDF_TAGET), chip, idf.py set-target esp32
	// 2. ESP-IDF-Tools: SDK Configuration Editor(menuconfig), notebook-render-output, idf.py menuconfig
	// 3. ESP-IDF-Tools: Build project(build), notebook-kernel-select, idf.py build
	// 4. ESP-IDF-Tools: Flash to Espressif device(flash), zap, idf.py -p PORT flash
	// 5. ESP-IDF-Tools: Build and Flash(build,flash), github-action, idf.py -p PORT flash monitor
	// 6. ESP-IDF-Tools: Full clean(fullclean), notebook-delete-cell, idf.py fullclean
	// 7. ESP-IDF-Tools: Open Monitor Device(monitor), vm-connect, idf.py -p <PORT> monitor
	// 8. ESP-IDF-Tools: Build,Flash and Monitor(build,flash,monitor), rocket, idf.py -p PORT flash monitor
	// TODO: Monitor idf.py -p <PORT> monitor

	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdSelectPort_0, () => {
		pickSerialPort().then(portPath => {
			selectPortCOM = `${portPath}`;
			myStatusBarItemSelectPort_0.text = `$(plug) ` + selectPortCOM;
			if(!portPath){
				vscode.window.showErrorMessage(`${portPath}`);
				return;
			}
			else{
				vscode.window.showInformationMessage(`ESP-IDF-Tools: Serial Port is: ${selectPortCOM}`);
			}
		});
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdSetTarget_1, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		
		vscode.window.showInputBox({
            ignoreFocusOut: false,
            password: false,
            prompt: "Please input esp-idf target. Can be: esp32,esp32s2,esp32c3,esp32s3,esp32c2,esp32c6,esp32h2,esp32p4,linux,esp32c5,esp32c61, etc.",
            value: selectESPIDFTarget,
            valueSelection: [3, -2],
        }).then(value => {
            if (!value || !value?.trim()) {
                //vscode.window.showErrorMessage("Invalid value!");
                return;
            };
			selectESPIDFTarget = value.trim();
            vscode.window.showInformationMessage(`ESP-IDF-Tools: esp-idf target is ${value.trim()}`);

			unkxTerminal.show();
			unkxTerminal.sendText("idf.py set-target "+selectESPIDFTarget);
        });
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdMenuconfig_2, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		unkxTerminal.show();
		unkxTerminal.sendText("idf.py menuconfig");
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdBuild_3, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		unkxTerminal.show();
		unkxTerminal.sendText("idf.py build");
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdFlash_4, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		unkxTerminal.show();
		unkxTerminal.sendText("idf.py -p "+selectPortCOM+" flash");
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdBuildFlash_5, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		unkxTerminal.show();
		unkxTerminal.sendText("idf.py -p "+selectPortCOM+" flash");
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdFullclean_6, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		unkxTerminal.show();
		unkxTerminal.sendText("idf.py fullclean");
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdMonitor_7, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		unkxTerminal.show();
		unkxTerminal.sendText("idf.py -p "+selectPortCOM+" monitor");
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdBuildFlashMonitor_8, () => {
		if (unkxTerminal.exitStatus) {
			unkxTerminal = createUnkxTerminal();
			unkxTerminal.sendText(get_idf_cmd);
		}
		unkxTerminal.show();
		unkxTerminal.sendText("idf.py -p "+selectPortCOM+" flash monitor");
	}));
	context.subscriptions.push(vscode.commands.registerCommand(myCommandIdHelp, () => {
		const panel = vscode.window.createWebviewPanel(
        'ESP-IDF-Tools Help document',
        'ESP-IDF-Tools 帮助文档',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      const htmlPath = path.join(
        context.extensionPath,
        'assets/help.html'
      );
      let html = fs.readFileSync(htmlPath, 'utf-8');
      panel.webview.html = html;
      
	}));

	// create a new status bar item that we can now manage
	// myCommandIdSelectPort_0
	myStatusBarItemSelectPort_0 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	//myStatusBarItemSelectPort_0 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItemSelectPort_0.text = `$(plug) `+selectPortCOM;// 文本和图标
	//myStatusBarItemSelectPort_0.text = "$(loading~spin) loading..."; // 文本和图标(动画)
	myStatusBarItemSelectPort_0.tooltip = "ESP-IDF-Tools: Select Port to Use(COM, tty)"; // 鼠标的悬浮提示
	//myStatusBarItemSelectPort_0.backgroundColor = new vscode.ThemeColor("myStatusBarItemSelectPort_0.warningBackground"); // 背景颜色(只支持 warningBackground | errorBackground)
	myStatusBarItemSelectPort_0.command = myCommandIdSelectPort_0;

	// myCommandIdSelectPort_1
	myStatusBarItemSetTarget_1 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemSetTarget_1.text = `$(chip) ESP32`;// 文本和图标
	myStatusBarItemSetTarget_1.tooltip = "ESP-IDF-Tools: Set Espressif device target(IDF_TAGET)"; // 鼠标的悬浮提示
	myStatusBarItemSetTarget_1.command = myCommandIdSetTarget_1;

	// myCommandIdMenuconfig_2
	myStatusBarItemMenuconfig_2 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemMenuconfig_2.text = `$(notebook-render-output)`;// 文本和图标
	myStatusBarItemMenuconfig_2.tooltip = "ESP-IDF-Tools: SDK Configuration Editor(menuconfig)"; // 鼠标的悬浮提示
	myStatusBarItemMenuconfig_2.command = myCommandIdMenuconfig_2;

	// myCommandIdSetBuild_3
	myStatusBarItemSetBuild_3 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemSetBuild_3.text = `$(notebook-kernel-select)`;// 文本和图标
	myStatusBarItemSetBuild_3.tooltip = "ESP-IDF-Tools: Build project(build)"; // 鼠标的悬浮提示
	myStatusBarItemSetBuild_3.command = myCommandIdBuild_3;

	// myCommandIdSetFlash_4
	myStatusBarItemSetFlash_4 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemSetFlash_4.text = `$(zap)`;// 文本和图标
	myStatusBarItemSetFlash_4.tooltip = "ESP-IDF-Tools: Flash to Espressif device(flash)"; // 鼠标的悬浮提示
	myStatusBarItemSetFlash_4.command = myCommandIdFlash_4;

	// myCommandIdBuildFlash_5
	myStatusBarItemBuildFlash_5 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemBuildFlash_5.text = `$(github-action)`;// 文本和图标
	myStatusBarItemBuildFlash_5.tooltip = "ESP-IDF-Tools: Build and Flash"; // 鼠标的悬浮提示
	myStatusBarItemBuildFlash_5.command = myCommandIdBuildFlash_5;

	// myCommandIdFullclean_6
	myStatusBarItemFullclean_6 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemFullclean_6.text = `$(notebook-delete-cell)`;// 文本和图标
	myStatusBarItemFullclean_6.tooltip = "ESP-IDF-Tools: Full clean(fullclean)"; // 鼠标的悬浮提示
	myStatusBarItemFullclean_6.command = myCommandIdFullclean_6;

	// myCommandIdmonitor_7
	myStatusBarItemMonitor_7 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemMonitor_7.text = `$(vm-connect)`;// 文本和图标
	myStatusBarItemMonitor_7.tooltip = "ESP-IDF-Tools: Open Monitor Device"; // 鼠标的悬浮提示
	myStatusBarItemMonitor_7.command = myCommandIdMonitor_7;

	// myCommandIdBuildFlashMonitor_8
	myStatusBarItemBuildFlashMonitor_8 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemBuildFlashMonitor_8.text = `$(rocket)`;// 文本和图标
	myStatusBarItemBuildFlashMonitor_8.tooltip = "ESP-IDF-Tools: Build,Flash and Monitor"; // 鼠标的悬浮提示
	myStatusBarItemBuildFlashMonitor_8.command = myCommandIdBuildFlashMonitor_8;

	// myStatusBarItemdHelp
	myStatusBarItemdHelp = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemdHelp.text = `$(question)`;// 文本和图标)
	myStatusBarItemdHelp.tooltip = "ESP-IDF-Tools: Help document"; // 鼠标的悬浮提示
	myStatusBarItemdHelp.command = myCommandIdHelp;

	// update status bar item once at start
	myStatusBarItemSelectPort_0.show();
	myStatusBarItemSetTarget_1.show();
	myStatusBarItemMenuconfig_2.show();
	myStatusBarItemSetBuild_3.show();
	myStatusBarItemSetFlash_4.show();
	myStatusBarItemBuildFlash_5.show();
	myStatusBarItemFullclean_6.show();
	myStatusBarItemMonitor_7.show();
	myStatusBarItemBuildFlashMonitor_8.show();
	myStatusBarItemdHelp.show();
	
	context.subscriptions.push(myStatusBarItemSelectPort_0);
	context.subscriptions.push(myStatusBarItemSetTarget_1);
	context.subscriptions.push(myStatusBarItemMenuconfig_2);
	context.subscriptions.push(myStatusBarItemSetBuild_3);
	context.subscriptions.push(myStatusBarItemBuildFlash_5);
	context.subscriptions.push(myStatusBarItemFullclean_6);
	context.subscriptions.push(myStatusBarItemMonitor_7);
	context.subscriptions.push(myStatusBarItemBuildFlashMonitor_8);
	context.subscriptions.push(myStatusBarItemdHelp);
	//context.subscriptions.push(disposable);

	unkxTerminal.show();
	unkxTerminal.sendText(get_idf_cmd);
}

// This method is called when your extension is deactivated
export function deactivate() {
	//closeTerminal();
}

async function closeTerminal() {
	const myTerminal = vscode.window.terminals.find(t => t.name === "unkx: esp-idf-tools");
	if (myTerminal) {
		myTerminal.dispose();
		return Promise.resolve(undefined);
	}

	//if(vscode.window.activeTerminal)
	//{
	//	vscode.window.activeTerminal?.dispose();
	//}
}

function updateParameter() {
	if(process.platform === 'win32'){
		unkxTerminalOptions.shellPath = 'cmd';
		get_idf_cmd = "get_idf.bat";
		selectPortCOM = "COM1";
	}
	else if(process.platform === 'linux'){
		unkxTerminalOptions.shellPath = 'bash';
		get_idf_cmd = "get_idf";
		selectPortCOM = "/dev/ttyUSB0";
	}
}

function createUnkxTerminal(): vscode.Terminal {
	let terminal = vscode.window.terminals.find(t => t.name === unkxTerminalOptions.name);

	if(!terminal)
	{
		terminal = vscode.window.createTerminal(unkxTerminalOptions); 
	}

	return terminal;
} 

async function pickSerialPort(): Promise<string | undefined> {
    const serialPortItems: Thenable<vscode.QuickPickItem[]> = new Promise((resolve, reject) => {
        listSerialPort().then((ports) => {
            const portItems: vscode.QuickPickItem[] = ports.map((port) => {
                return { label: port.path, description: port.manufacturer };
            });
            resolve(portItems);
        }).catch((error) => {
            reject(error);
        });
    });

    let port = await vscode.window.showQuickPick(serialPortItems);
    return port ? port.label : undefined;
}

async function listSerialPort() {
    return SerialPort.list();
}
