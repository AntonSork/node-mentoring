export class Service<Input, Output extends { id: string }> {
  private model;
  constructor(entityModel) {
    this.model = entityModel;
  }

  public async get(id: string, softRemoving?: boolean): Promise<Output> {
    const options = {
      where: {
        id
      }
    };

    if (softRemoving) {
      options.where['isdeleted'] = false;
    }

    const entity = await this.model.findOne(options);
    return entity?.dataValues;
  }

  public async create(entity: Input): Promise<Output> {
    return await this.model.create(entity);
  }

  public async update(entity: Output): Promise<Output> {
    const { id } = entity;

    const options = {
      where: { id },
      returning: true
    };

    return await this.model.update(entity, options);
  }


  public async softDelete(entity: Output): Promise<Output> {
    const { id } = entity;
    entity = { ...entity, isdeleted: true }
    const options = {
      where: { id },
      returning: true
    };

    const result = await this.model.update(entity, options)
    return result;
  }

  public async hardDelete(entity: Output): Promise<Output> {
    const { id } = entity;
    const options = {
      where: { id },
      returning: true,
      truncate: false
    };

    console.log(options);
    

    const result = await this.model.destroy(options)
    return result;
  }

  public async getAll(filters?): Promise<Output[]> {
    const options = {
      where: {
        isdeleted: false
      }
    };
    return await this.model.findAll(options);
  }
}