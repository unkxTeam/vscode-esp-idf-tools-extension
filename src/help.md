<!-- https://md2html.com -->
# 参考资料
1. 乐鑫官方的[ESP-IDF文档中心](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/index.html)
2. esp-idf常用命令及总结：

    | 命令             | 说明                                                         |
    | ---------------- | ------------------------------------------------------------ |
    | idf.py set-target esp32c3 | 设置目标芯片，比如：<br />esp32 esp32s2 esp32c3 esp32s3 esp32p4 ... |
    | idf.py menuconfig | 配置目标芯片、项目功能组件等 |
    | idf.py build     | 编译工程代码                                                 |
    | idf.py clean     | 会把构建输出的文件从构建目录中删除，从而清理整个项目。<br />下次构建时会强制“重新完整构建”这个项目。清理时，不会删除 CMake 配置输出及其他文件。 |
    | idf.py fullclean | 会将整个 build 目录下的内容全部删除，包括所有 CMake 的配置输出文件。<br />下次构建项目时，CMake 会从头开始配置项目。 |
    | idf.py -p PORT flash | 将程序下载到目标芯片，其中PORT要改为对应的串口号，比如：COM3，/dev/ttyUSB0 |
    | idf.py -p PORT monitor | 打开串口监视器，查看LOG日志输出。其中PORT要改为对应的串口号，比如：COM3，/dev/ttyUSB0 |
    | idf.py -p PORT flash monitor | 一次性实现：编译、烧录、打开串口监视器，查看LOG日志输出。其中PORT要改为对应的串口号，比如：COM3，/dev/ttyUSB0 |

# 视频教程

- [哔哩哔哩](https://www.bilibili.com/video/BV1YUL1z3Ee2)
- [YouTube](https://youtube.com/playlist?list=PLLlul6hf_nLnqmhkqW7F4g8KuBVbn2fv7&si=ErHBLomNsJbYmH17)