import { Injectable } from 'graphql-modules'
import { Person } from '../../models/person-model'

@Injectable()
export class PersonProvider {
  async findPersonById(ownerId: string): Promise<Person> {
    return await Person.findPersonById(ownerId)
  }
}
