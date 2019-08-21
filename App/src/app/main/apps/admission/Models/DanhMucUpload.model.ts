export class DanhMucUpload {
    Id: number;
    Ten: string;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
	NguoiSua: string;
    constructor(item?) {
        item = item || {};
        this.Id = item.Id || null;
        this.Ten = item.Ten || "";       
        this.NgayTao = item.NgayTao || null;
	    this.NgaySua = item.NgaySua || null;
	    this.NguoiTao = item.NguoiTao || "";
        this.NguoiSua = item.NguoiSua || "";
    }
}