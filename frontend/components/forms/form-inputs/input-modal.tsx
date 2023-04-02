import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import { TextInputPackage } from '../../../types/types'
import { modalInputValidationSchema } from '../form-elements/validation'
import { Input, Text, Center, Container } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { Styles } from './styles'
import SmallButton from '../../widgets/small-button/small-button'

export const DATA_CY_INPUT_MODAL = 'input_modal'
export const DATA_CY_MODAL_ADD = 'modal_add'
export const DATA_CY_MODAL_INPUT_TEXT = 'modal_input_text'

export type EditInputModalFormData = {
  textInput: string | undefined
}

export type ValidationConstants = {
  minTextLength?: number
  maxTextLength?: number
}

type InputModalProps = {
  isOpen: boolean
  onClose: () => void
  saveData: (newValue: string) => void
  originalText?: string | undefined
  textPackage: TextInputPackage
}

const InputModal = ({ isOpen, onClose, saveData, originalText, textPackage }: InputModalProps) => {
  const { translate } = useTranslation()
  const [modalWidth, setModalWidth] = useState(350)

  useEffect(() => {
    if (window) {
      setModalWidth(window.innerWidth - 50)
    }
  }, [])

  const initialValues = { textInput: originalText ?? '', date: undefined, time: undefined }

  const {
    control,
    reset,
    formState: { isValid, errors }
  } = useForm<EditInputModalFormData>({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(modalInputValidationSchema(translate, textPackage.minTextLength, textPackage.maxTextLength)),
    shouldFocusError: true
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset()
        onClose()
      }}
    >
      <ModalOverlay />
      <ModalContent {...Styles.modalContent(modalWidth)} data-cy={DATA_CY_INPUT_MODAL}>
        <form>
          <ModalHeader>{translate(textPackage.modalTitleKey)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Controller
              name="textInput"
              control={control}
              render={({ field }) => {
                return (
                  <Center>
                    <Container {...Styles.addButtonContainer}>
                      <Input
                        value={field.value}
                        onChange={(event) => field.onChange(event.target.value)}
                        placeholder={translate(textPackage.placeholderKey) ?? ''}
                        {...Styles.textInput}
                        data-cy={DATA_CY_MODAL_INPUT_TEXT}
                      />
                      <Center {...Styles.errorMessageContainer}>
                        {errors.textInput?.message ? (
                          <Text {...Styles.errorMessage}>{errors.textInput?.message}</Text>
                        ) : (
                          <SmallButton
                            text={translate('general_add')}
                            dataCy={DATA_CY_MODAL_ADD}
                            isLarger={true}
                            onClick={() => {
                              saveData(field.value as string)
                              reset()
                            }}
                            isDisabled={!isValid}
                          />
                        )}
                      </Center>
                    </Container>
                  </Center>
                )
              }}
            />
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default InputModal
