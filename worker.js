self.addEventListener('message', async e => {
    const { fileName, fileContent, directoryName, type } = e.data;
    const root = await navigator.storage.getDirectory();
    const directoryHandle = await root.getDirectoryHandle(directoryName);
    if (type === 'write') {
        const fileHandle = await directoryHandle.getFileHandle(`${fileName}.txt`, { "create" : true });
        const fileAccessHandle = await fileHandle.createSyncAccessHandle();
        const data = new TextEncoder().encode(fileContent);
        await fileAccessHandle.write(data, { at: 0 });
        self.postMessage({type: 'written' });
    }
    if (type === 'read') {
        const fileHandle = await directoryHandle.getFileHandle(`${fileName}.txt`, { "create" : true });
        const fileAccessHandle = await fileHandle.createSyncAccessHandle();
    }
});