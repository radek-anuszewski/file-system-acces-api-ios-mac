self.addEventListener('message', async e => {
    const { fileName, fileContent, directoryName } = e.data;
    const root = await navigator.storage.getDirectory();
    const directoryHandle = await root.getDirectoryHandle(directoryName);
    const fileHandle = await directoryHandle.getFileHandle(`${fileName}.txt`, { "create" : true });
    const fileAccessHandle = await fileHandle.createSyncAccessHandle();
    const data = new TextEncoder().encode(fileContent);
    await fileAccessHandle.write(data, { at: 0 });
    self.postMessage('finished');
});