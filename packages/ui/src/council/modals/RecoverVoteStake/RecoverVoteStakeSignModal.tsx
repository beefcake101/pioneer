import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef, State } from 'xstate'

import { AccountLockInfo, lockInfoLayout } from '@/accounts/components/AccountLockInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { EmptyListHeader, ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { TransactionEvent } from '@/common/model/machines'
import { TransactionContext } from '@/proposals/modals/AddNewProposal/machine'

import { RecoverVoteStakeModalCall } from '.'

interface Props {
  service: ActorRef<TransactionEvent, State<TransactionContext>>
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
}

export const RecoverVoteStakeSignModal = ({ service, transaction }: Props) => {
  const {
    hideModal,
    modalData: { address, stake },
  } = useModal<RecoverVoteStakeModalCall>()
  const { allAccounts } = useMyAccounts()

  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: address,
  })

  return (
    <TransactionModal onClose={hideModal} service={service}>
      <ModalBody>
        <TextMedium light>
          You intend to recover <TokenValue value={stake} /> stake locks from account.
        </TextMedium>

        <RowGapBlock gap={8}>
          <ListHeaders $colLayout={lockInfoLayout}>
            <EmptyListHeader />
            <ListHeader>Unlocking</ListHeader>
            <ListHeader>Recoverable stake</ListHeader>
          </ListHeaders>
          <InputComponent inputSize="l" disabled>
            <AccountLockInfo
              account={accountOrNamed(allAccounts, address, 'Account')}
              amount={stake}
              lockType={'Voting'}
            />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>

      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Amount:"
            value={stake}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          />
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          />
        </TransactionInfoContainer>

        <ButtonPrimary size="medium" disabled={!isReady} onClick={sign}>
          Sign and recover stake
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}