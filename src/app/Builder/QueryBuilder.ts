import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }
  filter() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryObj: Record<string, any> = { ...this.query };
 
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];
    excludeFields.forEach((el) => {
      delete queryObj[el];
    });

    // Apply minPrice and maxPrice filters
    if (queryObj.minPrice || queryObj.maxPrice) {
      // console.log(queryObj)
    
      queryObj.pricePerHour = {} as { $gte?: number; $lte?: number };
      if (queryObj.minPrice) {
        queryObj.pricePerHour.$gte = parseFloat(queryObj.minPrice as string);
        delete queryObj.minPrice;
      }
      if (queryObj.maxPrice) {
        queryObj.pricePerHour.$lte = parseFloat(queryObj.maxPrice as string);
        delete queryObj.maxPrice;
      }
    
    }


    // console.log(queryObj)
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) ;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}

export default QueryBuilder;