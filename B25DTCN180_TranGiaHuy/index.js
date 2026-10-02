let currentTicketCode = "";
let isTicketValid = false;
let totalRevenue = 0;
let totalVisits = 0;
let isRunning = true;
while (isRunning) {
    let menu = `==============================================
   Hệ thống đặt lịch Louts Spa
==============================================
1. Nhập và kiểm chuẩn mã lịch hẹn
2. Tính tiền liệu trình chăm sóc
3. Thẩm định mã khách hàng may mắn
0. Thoát chương trình
==============================================
Vui lòng nhập lựa chọn của bạn (0 - 3): `;
    let choice = prompt(menu);
    if (choice === null) {
        continue;
    }
    choice = choice.trim();
    switch (choice) {
        case "0":
            console.log("Cam on ban da su dung he thong!");
            isRunning = false;
            break;
        case "1":
            currentTicketCode = "";
            isTicketValid = false;
            let rawTicket = prompt("Nhập chuỗi mã lịch hẹn:");

            if (rawTicket === null || rawTicket.trim() === "") {
                console.log("Loi: Chưa nhập mã lịch hẹn");
            } else {
                let normalizedTicket = rawTicket.trim().toUpperCase();

                if (normalizedTicket.length < 6) {
                    console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
                } else if (!normalizedTicket.startsWith("SPA-")) {
                    console.log("Lỗi: Sai tiền tố SPA-");
                } else if (normalizedTicket.includes(" ")) {
                    console.log("Lỗi: Chứa khoảng trắng ở giữa");
                } else {
                    currentTicketCode = normalizedTicket;
                    isTicketValid = true;
                    console.log("Thành công: Mã phiếu hợp lệ.");
                }
            }
            break;
        case "2":
            if (!isTicketValid) {
                console.log("Loi: Chua co ma phieu hop le. Vui long chon Case 1 truoc.");
            } else {
                let countInput = prompt("Nhap so luong chi dinh:");
                
                if (countInput !== null && countInput.trim() !== "") {
                    let serviceCount = Number(countInput);
                    let priceInput = prompt("Nhap don gia moi chi dinh (VND):");

                    if (priceInput !== null && priceInput.trim() !== "") {
                        let pricePerService = Number(priceInput);

                        let baseCost = serviceCount * pricePerService;
                        let discount = serviceCount >= 4 ? Math.round(baseCost * 0.1) : 0;
                        let tax = Math.round((baseCost - discount) * 0.08);
                        let totalPayment = (baseCost - discount) + tax;

                        totalRevenue += totalPayment;
                        totalVisits += 1;

                        let printedTicket = currentTicketCode;
                        currentTicketCode = "";
                        isTicketValid = false;

                        console.log("--- HÓA ĐƠN  ---");
                        console.log("Mã phiếu: " + printedTicket);
                        console.log("Số lượng: " + serviceCount);
                        console.log("Đơn giá: " + pricePerService);
                        console.log("Chi phí cơ sở: " + baseCost);
                        console.log("Tiền giảm giá: " + discount);
                        console.log("Phụ phí: " + tax);
                        console.log("Tổng thanh toán: " + totalPayment);
                    }
                }
            }
            break;
        case "3":
            let serial = prompt("Nhap chuoi so in tren the khach hang:");

            if (serial !== null) {
                serial = serial.trim();

                if (serial === "" || serial.length < 2) {
                    console.log("Loi: Ma ho so khong hop le.");
                } else {
                    let reversedSerial = "";
                    for (let i = serial.length - 1; i >= 0; i--) {
                        reversedSerial += serial[i];
                    }

                    let isPalindrome = (serial === reversedSerial);

                    let digitSum = 0;
                    for (let i = 0; i < serial.length; i++) {
                        digitSum += Number(serial[i]);
                    }

                    let isDivisibleBy9 = (digitSum % 9 === 0);
                    let award = "Khong co";

                    if (isPalindrome && isDivisibleBy9) {
                        award = "Giai Dac biet (900.000 VND)";
                    } else if (isPalindrome && !isDivisibleBy9) {
                        award = "Giai Nhat (300.000 VND)";
                    } else if (!isPalindrome && isDivisibleBy9) {
                        award = "Giai Nhi (50.000 VND)";
                    }

                    console.log("--- KET QUA THAM DINH ---");
                    console.log("Chuoi so: " + serial);
                    console.log("Dao nguoc: " + reversedSerial);
                    console.log("Tong chu so: " + digitSum);
                    console.log("Chia het cho 9: " + (isDivisibleBy9 ? "Co" : "Khong"));
                    console.log("Giai thuong: " + award);
                }
            }
            break;
            
        

        default:
            console.log("Loi: Lua chon khong hop le. Vui long chon tu 0 den 3.");
            break;
    }
}