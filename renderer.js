

  const { ipcRenderer } = require('electron');

  ipcRenderer.on('editor-event', (event, arg) => {
    console.log(arg);
    event.sender.send('editor-reply', `Received ${arg}`);

    if (arg === 'toggle-bold') {
      editor.toggleBold();
    }

    if (arg === 'save') {
      event.sender.send('save', editor.value());
    }

    if(arg === 'new-doc') {
      event.sender.send('new-doc', editor.value(''));
    }
  });

  ipcRenderer.on('load', (event, content) => {
    if (content) {
      editor.value(content);
    }
  });

  ipcRenderer.send('editor-reply', 'Page Loaded');

  function dropHandler(event) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      if (event.dataTransfer.items[0].kind === 'file') {
        var file = event.dataTransfer.items[0].getAsFile();

        if (file.type === 'text/markdown') {
          var reader = new FileReader();
          reader.onload = e => {
            // console.log(e.target.result);
            editor.codemirror.setValue(e.target.result);
          };

          reader.readAsText(file);
        }
      }
    }
  }