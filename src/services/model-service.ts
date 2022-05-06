/**
 * Generic Service class for our models to do handle errors and logic
 */
class ModelService<T> {
  /**
   * @param model - the class you wish to the Service to use
   */
  constructor(protected model: any) {}

  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findByPk(id: string): Promise<any | null> {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async save(object: any): Promise<any | null> {
    try {
      return object.save();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(id: string, newAttributes: any) {
    try {
      const modelToUpdate = await this.model.findByPk(id);
      if (modelToUpdate) {
        const updatedModel = await modelToUpdate.update(newAttributes);
        return updatedModel;
      }
    } catch (error) {
      return null;
    }
  }

  async delete(id: string) {
    try {
      const modelToDelete = await this.model.findByPk(id);
      
      if (modelToDelete) {
        modelToDelete.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false; 
    }
  }
}

export { ModelService };
