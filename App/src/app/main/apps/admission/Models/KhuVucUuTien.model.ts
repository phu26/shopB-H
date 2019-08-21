export class KhuVucUuTien {
    Id: number;
    Ten: string;
    DiemCong: number;
    MaKhuVucUuTien:string;
    NgayTao: Date;
    NgaySua: Date;
    NguoiTao: string;
    NguoiSua: string;
    constructor(khuVucUuTien?) {
        khuVucUuTien = khuVucUuTien || {},
            this.Id = khuVucUuTien.Id || null,
            this.Ten = khuVucUuTien.Ten || '',
            this.DiemCong = khuVucUuTien.DiemCong || null,
            this.MaKhuVucUuTien = khuVucUuTien.MaKhuVucUuTien || '',
            this.NgayTao = khuVucUuTien.NgayTao || null,
            this.NgaySua = khuVucUuTien.NgaySua || null,
            this.NguoiTao = khuVucUuTien.NguoiTao || null,
            this.NguoiSua = khuVucUuTien.NguoiSua || null
    }
}