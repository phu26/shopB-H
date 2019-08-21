export class HoSoXetTuyen {
    Id: number;
	Ten: string;
	ThiSinhId: number;
	DotTuyenSinhId: number;
	LoaiHoSoId: number;
	KichHoat: boolean;
	NgayTao: Date;
	Ngaysua: Date;
	NguoiTao: string;
	NguoiSua: string;
	KhaoSat: object;
	ThiSinh: object;
	NguyenVongs: Array<any>;
	CotDiems: Array<any>;
    constructor(private hoSoXetTuyen?) {
		 if(hoSoXetTuyen)
		 {
			this.Id = hoSoXetTuyen.Id || null;
			this.Ten = hoSoXetTuyen.Ten || null;
			this.ThiSinhId = hoSoXetTuyen.ThiSinhId || null;
			this.DotTuyenSinhId = hoSoXetTuyen.DotTuyenSinhId || null;
			this.LoaiHoSoId = hoSoXetTuyen.LoaiHoSoId || null;
			this.KichHoat = hoSoXetTuyen.KichHoat || null;
			this.NgayTao = hoSoXetTuyen.NgayTao || null;
			this.Ngaysua = hoSoXetTuyen.Ngaysua || null;
			this.NguoiTao = hoSoXetTuyen.NguoiTao || null;
			this.NguoiSua = hoSoXetTuyen.NguoiSua || null;
		 }
	}
}