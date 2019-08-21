import { CotDiem } from "./CotDiem.model";
import { ToHopCotDiem } from "./ToHopCotDiem.model";
import { NganhDaoTao } from "./NganhDaoTao.model";

export class NguyenVong {
    Id: number;
	HoSoXetTuyenId: number;
	NganhDaoTaoId: number; //edited
	ToHopCotDiemId: number;
	ThuTuNguyenVong: number;
	TrungTuyen: boolean;
	UISDongBo: number;
	InHoSo: boolean;
	DuDieuKienXetTuyen: boolean;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
	NguoiSua: string;
	Diem: number;
	CotDiems: Array<CotDiem> 
	TopHopCotDiems: Array<ToHopCotDiem>
	ChuyenNganhDaoTao:NganhDaoTao;
	NganhDaoTao:NganhDaoTao;
	ChoPhepChonChuyenNganh:boolean=false;
	ChuyenNganhDaoTaos:Array<NganhDaoTao>=[];
    constructor(nguyenVong?) {
		nguyenVong 				= nguyenVong || {};
		this.Id 				= nguyenVong.Id || null;
		this.HoSoXetTuyenId 	= nguyenVong.HoSoXetTuyenId || null;
		this.NganhDaoTaoId 		= nguyenVong.NganhDaoTaoId || null;
		this.ToHopCotDiemId 	= nguyenVong.ToHopCotDiemId || null;
		this.ThuTuNguyenVong 	= nguyenVong.ThuTuNguyenVong || 0;
		this.TrungTuyen 		= nguyenVong.TrungTuyen || null;
		this.UISDongBo			= nguyenVong.UISDongBo || null;
		this.InHoSo 			= nguyenVong.InHoSo || null;
		this.DuDieuKienXetTuyen = nguyenVong.DuDieuKienXetTuyen || null;
		this.NgayTao 			= nguyenVong.NgayTao || null;
		this.NgaySua 			= nguyenVong.NgaySua || null;
		this.NgaySua 			= nguyenVong.NgaySua || null;
		this.NguoiTao 			= nguyenVong.NguoiTao || null;
		this.NguoiSua 			= nguyenVong.NguoiSua || null;
		this.Diem 				= nguyenVong.Diem || null;
		this.CotDiems			= nguyenVong.CotDiems || Array<CotDiem>();
		this.TopHopCotDiems     = nguyenVong.TopHopCotDiems || new Array<ToHopCotDiem>();
		this.ChoPhepChonChuyenNganh=nguyenVong.ChoPhepChonChuyenNganh|| false;
		this.ChuyenNganhDaoTaos=nguyenVong.ChuyenNganhDaoTaos||[];
		this.NganhDaoTao=nguyenVong.NganhDaoTao || {};
		this.ChuyenNganhDaoTao=nguyenVong.ChuyenNganhDaoTao||{};
    }
}