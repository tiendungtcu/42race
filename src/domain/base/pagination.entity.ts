/* eslint-disable max-classes-per-file */
import { BaseEntity } from './base.entity';
import { Type, Expose as JsonProperty } from 'class-transformer';

export class Sort {
    public property: string;
    public direction: 'ASC' | 'DESC' | string;
    public sortStr: string;
    constructor(sort: string) {
        if (sort) {
            [this.property, this.direction] = sort.split(',');
            this.sortStr = sort;
        }
    }

    asOrder(): any {
        const order = {};
        order[this.property] = this.direction;
        return order;
    }
    
    asOrderMultiple(): any {
        const order = {};
        const orders: string[] = this.sortStr.split('|');
        orders.forEach( (val, idx) => {
          const [property, direction] = val.split(',');
          order[property] = direction;
        })
        return order;
      }
}

export class PageRequest {
    @JsonProperty()
    page = 0;

    @JsonProperty()
    size = 20;
    
    //@Type(() => Sort)
    sort = new Sort('updatedAt,desc').asOrder();

    constructor(page: any, size: any, sort: any) {
        this.page = +page || this.page;
        this.size = +size || this.size;
        this.sort = sort ? new Sort(sort).asOrderMultiple() : this.sort;
    }
}

export class Page<T extends BaseEntity> {
    constructor(public content: T[], public total: number, public pageable: PageRequest) {}
}
