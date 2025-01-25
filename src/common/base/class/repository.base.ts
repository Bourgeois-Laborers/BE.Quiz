import { FindOptionsWhere, Repository } from 'typeorm';

interface PaginateProps<T> {
  where: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  page: number;
  take: number;
}

export abstract class RepositoryBase<T> {
  constructor(private readonly repositoryBase: Repository<T>) {}

  public async paginate({ page, take, where }: PaginateProps<T>): Promise<T[]> {
    const skip = ((page || 1) - 1) * take;

    return this.repositoryBase.find({ where, skip, take });
  }
}
