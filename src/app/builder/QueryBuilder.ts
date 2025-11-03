import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }
    console.log(searchTerm, searchableFields)

    return this
  }

  filter() {
    const queryObj = { ...this.query }

    // Filtering
    const excludeFields = ['searchTerm']

    excludeFields.forEach(el => delete queryObj[el])

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  DiscountCalculation() {
    const originalExec = this.modelQuery.exec.bind(this.modelQuery)

    this.modelQuery.exec = async (...args: any) => {
      const results: any[] = await originalExec(...args)

      return results.map(product => {
        const obj = product.toObject ? product.toObject() : product

        const originalPrice = obj.price
        const finalPrice = obj.discount
          ? originalPrice - (originalPrice * obj.discount) / 100
          : originalPrice

        return {
          ...obj,
          originalPrice,
          finalPrice,
        }
      })
    }

    return this
  }
}

export default QueryBuilder
