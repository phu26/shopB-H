import { LoaiDiem } from "./LoaiDiem.model";

export class CotDiem {
    Id: number;
    Ten: string;
    QuyDinhId: number;
    GhiChu: string;
    NgayTao: Date;
    NgaySua: Date;
    NguoiTao: string;
    NguoiSua: string;
    Diem: number;
    HK1_10: number;
    HK2_10: number;
    HK1_11: number;
    HK2_11: number;
    HK1_12: number;
    HK2_12: number;
    THPTQG: number;
    Ma: string;
    LoaiDiem: LoaiDiem;
    Loai: string;
    Checked: boolean;
    LoaiHinhThuc: string;
    constructor(cotDiem?) {
        cotDiem = cotDiem || {};
        this.Id = cotDiem.Id || null;
        this.Ten = cotDiem.Ten || '';
        this.QuyDinhId = cotDiem.QuyDinhId || null;
        this.GhiChu = cotDiem.GhiChu || '';
        this.NguoiTao = cotDiem.NguoiTao || '';
        this.NguoiSua = cotDiem.NguoiSua || '';
        this.NgaySua = cotDiem.NgaySua || '';
        this.NgayTao = cotDiem.NgayTao || '';
        this.Diem = cotDiem.Diem || 0;
        this.LoaiDiem = cotDiem.LoaiDiem || new LoaiDiem();
        this.Loai = cotDiem.Loai || '';
        this.Checked = cotDiem.Checked || false;
        this.Ma = cotDiem.Ma || '';
        this.LoaiHinhThuc = cotDiem.LoaiHinhThuc || 'xettuyen';
        this.HK1_10 = cotDiem.HK1_10 || 0;
        this.HK2_10 = cotDiem.HK2_10 || 0;
        this.HK1_11 = cotDiem.HK1_11 || 0;
        this.HK2_11 = cotDiem.HK2_11 || 0;
        this.HK1_12 = cotDiem.HK1_12 || 0;
        this.HK2_12 = cotDiem.HK2_12 || 0;
        this.THPTQG = cotDiem.THPTQG || 0;
    }
}