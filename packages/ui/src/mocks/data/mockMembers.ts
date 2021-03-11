import { BaseMember } from '../../common/types'
import rawMembers from './raw/members.json'

type MockMember = BaseMember & { registeredAtBlock: string; invitees?: string[] }

export const mockMembers: MockMember[] = rawMembers.map((rawMember) => {
  return {
    ...rawMember,
  }
})