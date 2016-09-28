# Make a context menu

Remember, you can always check out the mini-project to have a demo.


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
        context_menu.popup(remote.getCurrentWindow(), event.x, event.y)
        // And other handle stuff here
    })
    
    // Asynchronous handle
    html_element.addEventListener('contextmenu', (event) => {
        ipcRenderer.send('asynchronous-context-menu', additionnal_data, event.x, event.y)
        // It appears that 'event' cannot be passed as an object to the main process (Electron v1.3.3 and v1.4.1)
    })
    
    
    // main.js
    
    // Asynchronous handle in main process
    ipcMain.on('asynchronous-context-menu', (ipc_event, additionnal_data, mouse_x, mouse_y) => {
        context_menu.popup(main_window)
        // And other handle stuff here
    })
```

The x and y coordinates allow you to display the context menu at the right click position, not the current mouse position on popup, since there is a little latency.