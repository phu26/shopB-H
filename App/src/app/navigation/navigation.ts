import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Xét tuyển',
        type     : 'item',
        icon     : 'apps',
        url      : '/admission/dot-tuyen-sinh/quan-ly'
    },
    {
        id       : 'applications',
        title    : 'Danh mục',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id : 'danh-muc',
                title: 'Danh mục',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id       : 'danh-muc-dot-tuyen-sinh',
                        title    : 'Đợt tuyển sinh',
                        type     : 'item',
                        icon     : 'ballot',
                        url      : '/admission/dot-tuyen-sinh/admin'
                    },
                    {
                        id       : 'danh-muc-nganh',
                        title    : 'Ngành đào tạo',
                        type     : 'item',
                        icon     : 'collections_bookmark',
                        url      : '/admission/nganh-dao-tao'
                    },
                    {
                        id       : 'danh-muc-he-dao-tao',
                        title    : 'Hệ đào tạo',
                        type     : 'item',
                        icon     : 'ballot',
                        url      : '/admission/he-dao-tao'
                    },
                    {
                        id       : 'danh-muc-bac-dao-tao',
                        title    : 'Bậc đào tạo',
                        type     : 'item',
                        icon     : 'ballot',
                        url      : '/admission/bac-dao-tao'
                    },
                    {
                        id       : 'hinh-thuc-xet-tuyen',
                        title    : 'Hình thức xét tuyển',
                        type     : 'item',
                        icon     : 'collections_bookmark',
                        url      : '/admission/hinh-thuc-xet-tuyen'
                    },
                    {
                        id       : 'danh-muc-to-hop-cot-diem',
                        title    : 'Tổ hợp cột điểm',
                        type     : 'item',
                        icon     : 'ballot',
                        url      : '/admission/to-hop-cot-diem'
                    },
                    {
                        id       : 'khu-vuc-uu-tien',
                        title    : 'Khu vực ưu tiên',
                        type     : 'item',
                        icon     : 'school',
                        url      : '/admission/khu-vuc-uu-tien'
                    },
                    {
                        id       : 'doi-tuong-uu-tien',
                        title    : 'Đối tượng ưu tiên',
                        type     : 'item',
                        icon     : 'dashboard',
                        url      : '/admission/doi-tuong-uu-tien'
                    },
                    {
                        id       : 'danh-muc-quan-huyen',
                        title    : 'Đơn vị hành chính',
                        type     : 'item',
                        icon     : 'ballot',
                        url      : '/admission/quan-huyen'
                    },
                    {
                        id       : 'truong',
                        title    : 'Danh mục Trường',
                        type     : 'item',
                        icon     : 'school',
                        url      : '/admission/truong'
                    },
                    {
                        id       : 'danh-muc-khao-sat',
                        title    : 'Khảo sát',
                        type     : 'item',
                        icon     : 'dashboard',
                        url      : '/admission/khao-sat'
                    },
                    {
                        id       : 'thong-bao-ngoai',
                        title    : 'Cấu hình thông báo',
                        type     : 'item',
                        icon     : 'dashboard',
                        url      : '/admission/thong-bao-ngoai'
                    },
                ]
            }
            
        ]
    }
]
