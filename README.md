# ESP-IDF-Tools Extension for VS Code

The purpose of this VScode extension is to enable users to develop Espressif ESP idf projects more efficiently on VScode, which can be used on both Windows and Linux platforms. This extension allows for easy configuration, build, flash, monitor, debug and more on ESP idf projects. [Espressif documentation](https://docs.espressif.com/projects/vscode-esp-idf-extension/en/latest/index.html)

# How to use

How to use [Video Tutorials](https://www.youtube.com/@%E6%9C%AA%E7%9F%A5%E5%8F%98%E9%87%8Funkx).

## Install

1. Download and install [Visual Studio Code](https://code.visualstudio.com).

2. Install ESP-IDF system prerequisites for your operating system:

- Prerequisites for [MacOS and Linux](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/linux-macos-setup.html).
- Prerequisites for [Windows](https://dl.espressif.com/dl/esp-idf/).**Please note that an offline installation package needs to be downloaded for installation**.

3. If your platform is Windows. Please follow here to perform some additional operations([Video Tutorials](https://www.youtube.com/@%E6%9C%AA%E7%9F%A5%E5%8F%98%E9%87%8Funkx)):

    Create this file in the installation directory of esp-idf (Default:`C:\Espressif`)(Or obtain the file [here](https://github.com/unkxTeam/vscode-esp-idf-tools-extension/assets)): `get_idf.bat`.Then open the file and edit the content as:
    ```shell
    idf_cmd_init.bat esp-idf-ad5d4ae340c39bc556afa783e091e773
    ```
    Then add `C:\Espressif` in the 'path' of the environment variable.

4. In Visual Studio Code, Open the **Extensions** view by clicking on the Extension icon in the Activity Bar on the side of Visual Studio Code or the **View: Show Extensions** command (shortcut: <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>X</kbd> or <kbd>Ctrl+Shift+X</kbd>).

5. Search for [ESP-IDF Extension](https://marketplace.visualstudio.com/items?itemName=unkx.esp-idf-tools-extension).

6. Install the extension. After you install the extension, Multiple icons will appear in the status bar at the bottom of VScode, click to use as needed.

**Enjoy!**
