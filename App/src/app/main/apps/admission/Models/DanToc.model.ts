export class DanToc {
    Id: number;
    Ten: string;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
	NguoiSua: string;
    constructor(danhToc?) {
        danhToc = danhToc || {};
        this.Id = danhToc.Id || null;
        this.Ten = danhToc.Ten || "";       
        this.NgayTao = danhToc.NgayTao || null;
	    this.NgaySua = danhToc.NgaySua || null;
	    this.NguoiTao = danhToc.NguoiTao || "";
        this.NguoiSua = danhToc.NguoiSua || "";
    }
}