const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Thiết lập giao diện để nhập dữ liệu từ Terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập chương bắt đầu (a): ', (start) => {
    rl.question('Nhập chương kết thúc (b): ', (end) => {
        const a = parseInt(start);
        const b = parseInt(end);

        // Kiểm tra tính hợp lệ của số nhập vào
        if (isNaN(a) || isNaN(b) || a > b) {
            console.log('Lỗi: Vui lòng nhập số hợp lệ và đảm bảo a <= b.');
            rl.close();
            return;
        }

        console.log(`\nBắt đầu tạo từ chương ${a} đến ${b}...\n`);

        // Vòng lặp để tạo thư mục và file
        for (let i = a; i <= b; i++) {
            const dirPath = path.join(__dirname, i.toString());
            const filePath = path.join(dirPath, 'noidung.txt');

            // 1. Tạo thư mục nếu nó chưa tồn tại
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                console.log(`[+] Đã tạo thư mục: ${i}`);
            }

            // 2. Tạo file noidung.txt trống
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, ''); // Ghi một file rỗng
                console.log(`    -> Đã tạo file: noidung.txt`);
            } else {
                console.log(`    -> File noidung.txt đã tồn tại, bỏ qua để không mất dữ liệu.`);
            }
        }

        console.log('\nHoàn tất!');
        rl.close();
    });
});