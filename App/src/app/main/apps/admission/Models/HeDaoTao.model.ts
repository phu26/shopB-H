export class HeDaoTao {
    Id: number; 
	Ten: string;
	KichHoat: boolean; 
	NgayTao: Date;
	Ngaysua: Date;
	NguoiTao: string;
	NguoiSua: string;
    constructor(heDaoTao?) {
		heDaoTao = heDaoTao || {};
		this.Id = heDaoTao.Id || null,
		this.Ten = heDaoTao.Ten || '',
		this.KichHoat = heDaoTao.KichHoat || ''
    }
}