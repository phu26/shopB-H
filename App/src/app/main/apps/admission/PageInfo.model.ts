export class PageInfo {
    expand: string;
	filter: string;
	sort: string;
	page: number;
	pageSize: number;
   
    constructor(obj?: any) {
		this.expand                 = obj && obj.Id           || null;
		this.filter                = obj && obj.filter          || null;
		this.sort                  = obj && obj.sort          || null;
		this.page                  = obj && obj.page          || null;
		this.pageSize               = obj && obj.pageSize          || null;
	}
    
}