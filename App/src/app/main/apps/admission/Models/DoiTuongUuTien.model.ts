import { FuseUtils } from "@fuse/utils";
// import { ThiSinh } from "./ThiSinh.model";

export class DoiTuongUuTien {
    Id: number;
    Ten: string;
    DiemCong: number;
    MaDoiTuongUuTien:string;
    NgayTao: Date;
	NgaySua: Date;
	NguoiTao: string;
    NguoiSua: string;
    // ThiSinhs: ThiSinh[];
    /**
     * Constructor
     *
     * @param doiTuongUuTien
     */
    constructor(doiTuongUuTien?) {
        doiTuongUuTien = doiTuongUuTien || {};
        this.Id = doiTuongUuTien.Id || null;
        this.Ten = doiTuongUuTien.Ten || '';
        this.DiemCong = Number(doiTuongUuTien.DiemCong) || 0;
        this.MaDoiTuongUuTien = doiTuongUuTien.MaDoiTuongUuTien || '';
        this.NgayTao = doiTuongUuTien.NgayTao || '';
        this.NgaySua = doiTuongUuTien.NgaySua || '';
        this.NguoiTao = doiTuongUuTien.NguoiTao || '';
        this.NguoiSua = doiTuongUuTien.NguoiSua || '';
        // this.ThiSinhs = doiTuongUuTien.ThiSinhs || [];
    }
}
