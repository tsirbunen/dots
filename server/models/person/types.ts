export interface PersonDB {
  id: string
  name?: string | null
  createdAt: Date
  deletedAt: Date | null
  updatedAt: Date
}
