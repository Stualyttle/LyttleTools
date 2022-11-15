# Lyttle Tools: _v2.0.0_

_By Stualyttle_

## Features:

- **Auto update & install in .git folder.**
    - Opt-in
- **git versioning**
    - Easily copy the current version to the clipboard to use in your commit messages.
    - Automatically updates, when pulling & committing!
    - Format: `YY.W(W).D(D).R(R...)): `
        - y = year
        - w = week
        - d = day
        - r = revision
    - Example: `22.46.6.4: `
        - 22 = 2022
        - 46 = week 46
        - 6 = day 6 (Saturday)
        - 4 = revision 4 (that day)
- **Node version lockings**
    - Lock the node version so everyone uses the same node version in your team.
    - Locks the app when not correct
- **Node modules change notification**
    - This helps the team deside when you should delete the node modules to prevent bugs.
    - Just copy the current version to a config file & everyone gets the notification & can delete the node modules. (if
      they want to) or the app can do that.

---

## Install the package:


### MacOS/Linux:
```
curl -sSL https://install-git.lyttle.it/sh | bash > /dev/null && npm -s --prefix .tools start
```

### Windows:
```
curl -sSL https://install-git.lyttle.it/bat | cmd.exe > nul & npm -s --prefix .tools start
```

- If the commando does not work, you are probably running powershell, to fix this run `cmd.exe` in the terminal you are
  currently running, and rerun the command again after running the cmd.exe command:
    - 1: `cmd.exe`
    - 2: `curl -sSL https://install-git.lyttle.it/bat | cmd.exe > nul & npm -s --prefix .lyttle_tools start`
- If after that all it still fails
    - Open https://install-git.lyttle.it/bat
    - Press `ctrl + s` to save file, and save it as `install.bat
    - Open the file to run it. (in your github root folder)
