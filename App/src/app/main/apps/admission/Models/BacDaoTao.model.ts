export class BacDaoTao {
    Id: number;
    Ten: string;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
	NguoiSua: string;
    constructor(bacdaotao?) {
        bacdaotao = bacdaotao || {};
        this.Id = bacdaotao.Id || null;
        this.Ten = bacdaotao.Ten || "";       
        this.NgayTao = bacdaotao.NgayTao || null;
	    this.NgaySua = bacdaotao.NgaySua || null;
	    this.NguoiTao = bacdaotao.NguoiTao || "";
        this.NguoiSua = bacdaotao.NguoiSua || "";
    }
}