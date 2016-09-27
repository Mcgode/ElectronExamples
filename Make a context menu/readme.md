# Make a context menu

### What is a context menu?

A context menu is a popup menu, containing items. This popup is triggered by a right click.
 
### How to make a context menu


First, call the API in the main process:
    
```javascript
    const Electron = require('electron');
    const { BrowserWindow, ipcMain, Menu, MenuItem } = Electron
```
    