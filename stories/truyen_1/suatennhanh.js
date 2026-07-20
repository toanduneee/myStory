const fs = require('fs');
const path = require('path');

// Quét toàn bộ thư mục truyện
const items = fs.readdirSync(__dirname);

items.forEach(item => {
    const folderPath = path.join(__dirname, item);
    
    // Kiểm tra xem có phải là folder chương (tên là số) không
    if (fs.statSync(folderPath).isDirectory() && !isNaN(item)) {
        const filesTrongFolder = fs.readdirSync(folderPath);
        
        // Tìm file .txt đầu tiên trong folder đó
        const fileTxtDầuTiên = filesTrongFolder.find(f => f.toLowerCase().endsWith('.txt') && f !== 'noidung.txt');
        
        if (fileTxtDầuTiên) {
            const oldPath = path.join(folderPath, fileTxtDầuTiên);
            const newPath = path.join(folderPath, 'noidung.txt');
            
            fs.renameSync(oldPath, newPath);
            console.log(`Đã đổi: ${item}/${fileTxtDầuTiên} -> ${item}/noidung.txt`);
        }
    }
});
console.log('Hoàn tất đổi tên toàn bộ dự án!');