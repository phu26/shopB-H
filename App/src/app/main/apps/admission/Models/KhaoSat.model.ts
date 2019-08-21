export class KhaoSat {
    Id: number;
    Ten: string;
    KichHoat: boolean;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
    NguoiSua: string;
    constructor(khaosat?) {
        khaosat = khaosat || {};
        this.Id = khaosat.Id || null;
        this.Ten = khaosat.Ten || "";
        this.KichHoat = khaosat.KichHoat || false;;
        this.NgayTao = khaosat.NgayTao || null;
	    this.NgaySua = khaosat.NgaySua || null;
	    this.NguoiTao = khaosat.NguoiTao || "";
        this.NguoiSua = khaosat.NguoiSua || "";
    }
}