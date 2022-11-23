import { Injectable } from 'graphql-modules'
import { Owner } from '../../models/owner-model'
import { CustomError, OwnerType } from '../../types/types'

@Injectable()
export class OwnerProvider {
  async findOwnerById(ownerId: string): Promise<OwnerType | CustomError> {
    return await Owner.findOwnerById(ownerId)
  }
}
