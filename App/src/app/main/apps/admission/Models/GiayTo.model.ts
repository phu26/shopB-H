import { getMatIconFailedToSanitizeLiteralError } from "@angular/material";

export class GiayTo {
    Id: number;
    Ten: string;
    FileName: string;
    Extension: string;
	FileType: string;
	Size: number;
	Path: string;
	LoaiFileGiayTo: string;
	ThuTu: number;
	HoSoId: number;
	MoTa: string;
	NgayUpFile: Date;
	KhachHangId: number;
	TableName: string;
	TableId: number;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
	NguoiSua: string;
	DaNop: boolean;
	FileDinhKem: GiayTo;
	IsBatBuoc:boolean;
	KichThuoc:string; //3x4; 4x6
	DungLuong:number;
	
    constructor(giayto?) {
		if(giayto!=null) {
			this.Id = giayto.Id || null;
			this.Ten = giayto.Ten || null;
			this.FileName = giayto.FileName || null;
			this.Extension = giayto.Extension || null;
			this.FileType = giayto.FileType || null;
			this.Size = giayto.Size || null;
			this.Path = giayto.Path || null;
			this.LoaiFileGiayTo = giayto.LoaiFileGiayTo || null;
			this.ThuTu = giayto.ThuTu || null;
			this.HoSoId = giayto.HoSoId || null;
			this.MoTa = giayto.MoTa || null;
			this.NgayUpFile = giayto.NgayUpFile || null;
			this.KhachHangId = giayto.KhachHangId || null;
			this.TableName = giayto.TableName || null;
			this.TableId = giayto.TableId || null;
			this.NgayTao = giayto.NgayTao || null;
			this.NgaySua = giayto.NgaySua || null;
			this.NguoiTao = giayto.NguoiTao || null;
			this.NguoiSua = giayto.NguoiSua || null;
			this.DaNop = giayto.DaNop || null;
			this.FileDinhKem = giayto.FileDinhKem || new GiayTo();
			this.IsBatBuoc = giayto.IsBatBuoc || false;
			this.KichThuoc = giayto.KichThuoc || '';
			this.DungLuong = giayto.DungLuong || 0;
		
		}
    }
}