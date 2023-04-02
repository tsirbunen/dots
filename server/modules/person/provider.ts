import { Injectable } from 'graphql-modules'
import { Person } from '../../models/person/person-model'
import { PersonDB } from '../../models/person/types'

@Injectable()
export class PersonProvider {
  async findPersonById(ownerId: string): Promise<PersonDB> {
    return await Person.findPersonById(ownerId)
  }
}
