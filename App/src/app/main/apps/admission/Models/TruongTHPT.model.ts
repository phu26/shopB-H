export class TruongTHPT {
    Id: number;
    Ten: string;
    KichHoat: boolean;
    MaTruong:string;
    MaTinh:string;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
    NguoiSua: string;
    DiaChi: string;
    Loai: string;
    constructor(truongthpt?) {
        truongthpt = truongthpt || {};
        this.Id = truongthpt.Id || null;
        this.Ten = truongthpt.Ten || "";
        this.KichHoat = truongthpt.KichHoat || false;
        this.MaTruong = truongthpt.MaTruong || '';
        this.MaTinh = truongthpt.MaTinh || '';
        this.NgayTao = truongthpt.NgayTao || null;
	    this.NgaySua = truongthpt.NgaySua || null;
	    this.NguoiTao = truongthpt.NguoiTao || "";
        this.NguoiSua = truongthpt.NguoiSua || "";
        this.Loai = truongthpt.Loai || "";
        this.DiaChi = truongthpt.DiaChi || "";
    }
}