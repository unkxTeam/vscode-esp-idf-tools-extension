// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-sample/package.json

let selectPortCOM = "COM1";
let selectESPIDFTarget = "esp32";
let get_idf_cmd = "get_idf.bat";

const terminalOptions = {
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
export function activate({ subscriptions }: vscode.ExtensionContext) {
// export function activate(context: vscode.ExtensionContext) {

	const myCommandIdSelectPort_0 = 'esp-idf.selectPort';
	const myCommandIdSetTarget_1 = 'esp-idf.setTarget';
	const myCommandIdMenuconfig_2 = 'esp-idf.menuconfig';
	const myCommandIdBuild_3 = 'esp-idf.build';
	const myCommandIdFlash_4 = 'esp-idf.flash';
	const myCommandIdBuildFlash_5 = 'esp-idf.buildFlash';
	const myCommandIdFullclean_6 = 'esp-idf.fullclean';
	const myCommandIdMonitor_7 = 'esp-idf.monitor';
	const myCommandIdBuildFlashMonitor_8 = 'esp-idf.buildFlashMonitor';

	let myStatusBarItemSelectPort_0: vscode.StatusBarItem;
	let myStatusBarItemSetTarget_1: vscode.StatusBarItem;
	let myStatusBarItemMenuconfig_2: vscode.StatusBarItem;
	let myStatusBarItemSetBuild_3: vscode.StatusBarItem;
	let myStatusBarItemSetFlash_4: vscode.StatusBarItem;
	let myStatusBarItemBuildFlash_5: vscode.StatusBarItem;
	let myStatusBarItemFullclean_6: vscode.StatusBarItem;
	let myStatusBarItemMonitor_7: vscode.StatusBarItem;
	let myStatusBarItemBuildFlashMonitor_8: vscode.StatusBarItem;

	// Create terminal
	updateParameter();
	//const terminal = vscode.window.createTerminal(terminalOptions);
	let terminal = vscode.window.createTerminal(terminalOptions);
	terminal.show();

	function createTerminal() {
		terminal = vscode.window.createTerminal(terminalOptions);
		terminal.show();
	}

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
	
	subscriptions.push(vscode.commands.registerCommand(myCommandIdSelectPort_0, () => {
		// 打开一个 input
        vscode.window.showInputBox({
            ignoreFocusOut: true, // 当焦点移动到编辑器的另一部分或另一个窗口时, 保持输入框打开
            password: false, // 为 true 就表示是密码类型
            prompt: "Please input Serial Port. Example: COM4, /dev/ttyUSB0", // 文本输入提示
            value: selectPortCOM, // 默认值, 默认全部选中
            valueSelection: [3, -1],  // 指定选中的范围
        }).then(value => {
            if (!value || !value?.trim()) {
                vscode.window.showErrorMessage("Invalid value!");
                return;
            };
			selectPortCOM = value.trim();
			myStatusBarItemSelectPort_0.text = `$(plug) `+selectPortCOM;
            vscode.window.showInformationMessage(`ESP-IDF-Tools: Serial Port is ${value.trim()}`);
        });

	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdSetTarget_1, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		
		vscode.window.showInputBox({
            ignoreFocusOut: true,
            password: false,
            prompt: "Please input esp-idf target. Can be: esp32|esp32s2|esp32c3|esp32s3|esp32c2|esp32c6|esp32h2|esp32p4|linux|esp32c5|esp32c61",
            value: selectESPIDFTarget,
            valueSelection: [3, -2],
        }).then(value => {
            if (!value || !value?.trim()) {
                vscode.window.showErrorMessage("Invalid value!");
                return;
            };
			selectESPIDFTarget = value.trim();
            vscode.window.showInformationMessage(`ESP-IDF-Tools: esp-idf target is ${value.trim()}`);

			terminal.show();
			terminal.sendText("idf.py set-target "+selectESPIDFTarget);
        });
	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdMenuconfig_2, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		terminal.show();
		terminal.sendText("idf.py menuconfig");
	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdBuild_3, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		terminal.show();
		terminal.sendText("idf.py build");
	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdFlash_4, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		terminal.show();
		terminal.sendText("idf.py -p "+selectPortCOM+" flash");
	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdBuildFlash_5, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		terminal.show();
		terminal.sendText("idf.py -p "+selectPortCOM+" flash");
	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdFullclean_6, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		terminal.show();
		terminal.sendText("idf.py fullclean");
	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdMonitor_7, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		terminal.show();
		terminal.sendText("idf.py -p "+selectPortCOM+" monitor");
	}));
	subscriptions.push(vscode.commands.registerCommand(myCommandIdBuildFlashMonitor_8, () => {
		if (terminal.exitStatus) {
			terminal = vscode.window.createTerminal(terminalOptions);
			terminal.sendText(get_idf_cmd);
		}
		terminal.show();
		terminal.sendText("idf.py -p "+selectPortCOM+" flash monitor");
	}));

	// create a new status bar item that we can now manage
	// myCommandIdSelectPort_0
	myStatusBarItemSelectPort_0 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	//myStatusBarItemSelectPort_0 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItemSelectPort_0.text = `$(plug) `+selectPortCOM;// 文本和图标
	//myStatusBarItemSelectPort_0.text = "$(loading~spin) loading..."; // 文本和图标(动画)
	myStatusBarItemSelectPort_0.tooltip = "ESP-IDF-Tools: Select Port to Use(COM, tty)"; // 鼠标的悬浮提示
	//myStatusBarItemSelectPort_0.backgroundColor = new vscode.ThemeColor("myStatusBarItemSelectPort_0.warningBackground"); // 背景颜色(只支持 warningBackground | errorBackground)
	myStatusBarItemSelectPort_0.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemSelectPort_0.command = myCommandIdSelectPort_0;

	// myCommandIdSelectPort_1
	myStatusBarItemSetTarget_1 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemSetTarget_1.text = `$(chip) ESP32`;// 文本和图标
	myStatusBarItemSetTarget_1.tooltip = "ESP-IDF-Tools: Set Espressif device target(IDF_TAGET)"; // 鼠标的悬浮提示
	myStatusBarItemSetTarget_1.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemSetTarget_1.command = myCommandIdSetTarget_1;

	// myCommandIdMenuconfig_2
	myStatusBarItemMenuconfig_2 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemMenuconfig_2.text = `$(notebook-render-output)`;// 文本和图标
	myStatusBarItemMenuconfig_2.tooltip = "ESP-IDF-Tools: SDK Configuration Editor(menuconfig)"; // 鼠标的悬浮提示
	myStatusBarItemMenuconfig_2.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemMenuconfig_2.command = myCommandIdMenuconfig_2;

	// myCommandIdSetBuild_3
	myStatusBarItemSetBuild_3 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemSetBuild_3.text = `$(notebook-kernel-select)`;// 文本和图标
	myStatusBarItemSetBuild_3.tooltip = "ESP-IDF-Tools: Build project(build)"; // 鼠标的悬浮提示
	myStatusBarItemSetBuild_3.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemSetBuild_3.command = myCommandIdBuild_3;

	// myCommandIdSetFlash_4
	myStatusBarItemSetFlash_4 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemSetFlash_4.text = `$(zap)`;// 文本和图标
	myStatusBarItemSetFlash_4.tooltip = "ESP-IDF-Tools: Flash to Espressif device(flash)"; // 鼠标的悬浮提示
	myStatusBarItemSetFlash_4.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemSetFlash_4.command = myCommandIdFlash_4;

	// myCommandIdBuildFlash_5
	myStatusBarItemBuildFlash_5 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemBuildFlash_5.text = `$(github-action)`;// 文本和图标
	myStatusBarItemBuildFlash_5.tooltip = "ESP-IDF-Tools: Build and Flash"; // 鼠标的悬浮提示
	myStatusBarItemBuildFlash_5.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemBuildFlash_5.command = myCommandIdBuildFlash_5;

	// myCommandIdFullclean_6
	myStatusBarItemFullclean_6 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemFullclean_6.text = `$(notebook-delete-cell)`;// 文本和图标
	myStatusBarItemFullclean_6.tooltip = "ESP-IDF-Tools: Full clean(fullclean)"; // 鼠标的悬浮提示
	myStatusBarItemFullclean_6.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemFullclean_6.command = myCommandIdFullclean_6;

	// myCommandIdmonitor_7
	myStatusBarItemMonitor_7 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemMonitor_7.text = `$(vm-connect)`;// 文本和图标
	myStatusBarItemMonitor_7.tooltip = "ESP-IDF-Tools: Open Monitor Device"; // 鼠标的悬浮提示
	myStatusBarItemMonitor_7.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemMonitor_7.command = myCommandIdMonitor_7;

	// myCommandIdBuildFlashMonitor_8
	myStatusBarItemBuildFlashMonitor_8 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItemBuildFlashMonitor_8.text = `$(rocket)`;// 文本和图标
	myStatusBarItemBuildFlashMonitor_8.tooltip = "ESP-IDF-Tools: Build,Flash and Monitor"; // 鼠标的悬浮提示
	myStatusBarItemBuildFlashMonitor_8.command = "learn-vscode-extends.statusClick"; // 绑定点击的命令
	myStatusBarItemBuildFlashMonitor_8.command = myCommandIdBuildFlashMonitor_8;

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
	//updateStatusBarItem();
	
	subscriptions.push(myStatusBarItemSelectPort_0);
	subscriptions.push(myStatusBarItemSetTarget_1);
	subscriptions.push(myStatusBarItemMenuconfig_2);
	subscriptions.push(myStatusBarItemSetBuild_3);
	subscriptions.push(myStatusBarItemBuildFlash_5);
	subscriptions.push(myStatusBarItemFullclean_6);
	subscriptions.push(myStatusBarItemMonitor_7);
	subscriptions.push(myStatusBarItemBuildFlashMonitor_8);
	//subscriptions.push(disposable);
	//context.subscriptions.push(disposable);

	terminal.sendText(get_idf_cmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function updateParameter() {
	if(process.platform === 'win32'){
		terminalOptions.shellPath = 'cmd';
		get_idf_cmd = "get_idf.bat";
		selectPortCOM = "COM1";
	}
	else if(process.platform === 'linux'){
		terminalOptions.shellPath = 'bash';
		get_idf_cmd = "get_idf";
		selectPortCOM = "/dev/ttyUSB0";
	}
}

