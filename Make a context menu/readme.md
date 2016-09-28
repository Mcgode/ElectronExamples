# Make a context menu

### What is a context menu?

A context menu is a popup menu, containing items. This popup is triggered by a right click.
 
### How to make a context menu


First, call the Electron Menu API in the main process:
    
```javascript
    // main.js
 
    const Electron = require('electron');
    const { ipcMain, Menu, MenuItem } = Electron
```

Do the same in the renderer process
    
```javascript
    // home.html
 
    const Electron = require('electron');
    const { ipcRenderer, remote } = Electron;
    const { Menu } = remote;
```

Next, you have to build up your menu, you can do that from a template, or dynamically

```javascript
    // Build menu from template
    
    const context_menu_template = [
        {
            label: 'Option 1',
            click() { /* Do something */ }
        },
        
        {
            type: 'separator'
        },
        
        {
            label: 'Option 2',
            click() { /* Do something else */ }
        }
    ];
    
    const context_menu_from_template = Menu.buildFromTemplate(context_menu_template);
    
    
    // Build it dynamically
    
    function makeDynamicMenu(data_to_make_it) {
        
        var context_menu_built_dynamically = new Menu();
        
        context_menu_built_dynamically.append(new MenuItem({
            label: 'Dynamic option 1',
            click() {
                data_to_make_it.do_something()
                // Etc... 
            }
        }));
        
        context_menu_built_dynamically.append(new MenuItem({
                    type: 'separator'
        }));
        
        // ...
        
        return context_menu_built_dynamically
    }
```

Then, it's up to you to decide if you want the menu processing task to be handled either synchronously (by the renderer process) or asynchronously (by the main process).


```javascript
    // home.html
    
    var html_element = document.getElementById('my-id');
    
    // Synchronous handle
    html_element.addEventListener('contextmenu', (event) => {
        context_menu.popup(remote.getCurrentWindow())
        // And other handle stuff here
    })
    
    // Asynchronous handle
    html_element.addEventListener('contextmenu', (event) => {
        ipcRenderer.send('asynchronous-context-menu')
    })
    
    
    // main.js
    
    // Asynchronous handle in main process
    ipcMain.on('asynchronous-context-menu', (ipc_event) => {
        context_menu.popup(main_window)
        // And other handle stuff here
    })
```