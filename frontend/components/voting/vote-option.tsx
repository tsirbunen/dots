// import { Center, Flex, IconButton, Text } from '@chakra-ui/react'
// import { MdOutlineHowToVote } from 'react-icons/md'
// import { PollState } from '../../types/graphql-schema-types.generated'
// import { Poll, Vote } from '../../types/types'
// import { ParticipantNames } from './participant-names'
// import { Styles } from './styles'

// type VoteOptionProps = {
//   votersWithColors: Record<string, string>
//   poll: Poll
//   userId: string
//   votesGiven: Record<string, number>
//   voteOption: (optionId: string) => void
// }

// export const VoteOption = ({ votersWithColors, poll, userId, votesGiven, voteOption }: VoteOptionProps) => {
//   const showParticipantNames = !poll.isAnonymous
//   const totalVotesCount =
//     Object.keys(votesGiven).length === 0 ? 0 : Object.values(votesGiven).reduce((acc, curr) => acc + curr)
//   const votesLeft = poll.totalVotesCountMax - totalVotesCount
//   return (
//     <Flex {...Styles.optionsContainer}>
//       {showParticipantNames && <ParticipantNames votersWithColors={votersWithColors} isAnonymous={false} />}
//       {poll.options.map((option) => {
//         const testVotes: Vote[] = [
//           { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Matti' },
//           { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Matti' },
//           { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Timo' },

//           { id: '4353344t3', optionId: '98998899898', voterId: null, name: 'Pekka' }
//         ]
//         const batches: Vote[][] = []
//         let batch: Vote[] = []
//         testVotes.forEach((vote) => {
//           if (batch.length === 15) {
//             batches.push([...batch])
//             batch = []
//           }
//           batch.push(vote)
//         })
//         batches.push([...batch])
//         const batchWidgets: JSX.Element[] = batches.map((b) => {
//           return (
//             <Flex key={'MUUTA'} style={{ flexDirection: 'row' }}>
//               {b.map((vote) => {
//                 return (
//                   <Flex
//                     key={'lklklkl'}
//                     {...Styles.voteDot(votersWithColors?.[vote?.name ?? 'sdfds'] ?? 'sdasdaasda', true)}
//                   />
//                 )
//               })}
//             </Flex>
//           )
//         })
//         let myOptionVotes = 0
//         option.votes.forEach((vote) => {
//           if (vote.voterId === userId) myOptionVotes += 1
//         })
//         if (votesGiven[option.id]) myOptionVotes += votesGiven[option.id]
//         const canVoteThisOption = myOptionVotes < poll.optionVotesCountMax && votesLeft > 0
export {}
//         return (
//           <Flex
//             key={'dfsfdfdsdfdsfdsdsf'}
//             style={{
//               margin: '10px',
//               flex: 1,
//               width: '100%',
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between'
//               // backgroundColor: 'pink'
//             }}
//           >
//             <Flex key={option.id} style={{ flexDirection: 'column' }}>
//               <Text {...Styles.content}>{option.content}</Text>
//               {votesGiven[option.id] && (
//                 <Flex style={{ marginTop: '10px', flexDirection: 'row' }}>
//                   {Array(votesGiven[option.id])
//                     .fill('0')
//                     .map((item) => {
//                       return <Flex key={'dsadasaas'} {...Styles.currentVoterDot(false)} />
//                     })}
//                 </Flex>
//               )}
//               {(true || poll?.showStatusWhenVoting || poll?.state === PollState.Closed) && (
//                 <Flex style={{ marginTop: '10px', flexDirection: 'column' }}>{batchWidgets}</Flex>
//               )}
//             </Flex>
//             {canVoteThisOption && (
//               <Flex style={{ flexDirection: 'column', margin: '10px' }}>
//                 <IconButton
//                   {...Styles.iconButton}
//                   isRound
//                   aria-label={'vote'}
//                   icon={<MdOutlineHowToVote {...Styles.icon} />}
//                   data-cy={'lllll'}
//                   onClick={() => voteOption(option.id)}
//                 />
//               </Flex>
//             )}
//           </Flex>
//         )
//       })}
//     </Flex>
//   )
// }
