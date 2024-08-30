Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "cmd.exe", "/c """ & WScript.Arguments(0) & """", "", "runas", 1