/**
 * Created by Max Godefroy on 27/09/2016.
 */

// Require Electron API
const Electron = require('electron');

// Call Electron sub-libraries
const { app, BrowserWindow, ipcMain, Menu, MenuItem, dialog } = Electron;


var main_window;

const home_url = `file://${__dirname}/home.html`;


app.on('ready', () => {
    createMainWindow()
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});


app.on('activate', () => {
    if (main_window === null) {
        createMainWindow()
    }
});


function createMainWindow() {

    main_window = new BrowserWindow({ width: 500, height: 500, show: false });

    main_window.once('ready-to-show', () => { main_window.show() });

    main_window.loadURL(home_url);

    main_window.once('closed', () => { main_window = null })

}

var context_menu;

ipcMain.on('requested-context-menu', () => {

    // Context menu can be made from a template, or dynamically, like here
    context_menu = new Menu();
    context_menu.append(new MenuItem({
        label: 'You can click here...',
        click() {
            // Fancy alert
            dialog.showMessageBox(main_window, {
                buttons: ['Ok'],
                title: 'Message',
                message: '... and you clicked. Good job!'
            })
        }
    }));

    // Makes the context menu pop up on mouse location
    context_menu.popup(main_window)

});

