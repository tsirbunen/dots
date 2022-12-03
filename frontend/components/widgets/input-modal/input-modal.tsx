import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '../../../hooks/use-translation'
import { TextDateTimeDataHolder, TextDateTimeDataType } from '../../forms/data-models/text-date-time-data-holder'
import { modalInputValidationSchema } from '../../forms/validation/validation'
import DataTypeSelector from './data-type-selector'
import TextInput from './text-input'
import { getModalContentStyle } from './styles'
import { TextDateTimeItemsInputConstantsPackage } from '../../../utils/constant-values'

export const DATA_CY_INPUT_MODAL = 'input_modal'

export type EditInputModalFormData = {
  textInput: string | undefined
  date: Date | undefined
  time: undefined
}

export type ValidationConstants = {
  minTextLength?: number
  maxTextLength?: number
}

type InputModalProps = {
  isOpen: boolean
  onClose: () => void
  onlyTextInput: boolean
  saveData: (newValue: string | TextDateTimeDataHolder) => void
  originalText?: string | undefined
  textConstantsPackage: TextDateTimeItemsInputConstantsPackage
}

const InputModal = ({
  isOpen,
  onClose,
  onlyTextInput,
  saveData,
  originalText,
  textConstantsPackage
}: InputModalProps) => {
  const { translate } = useTranslation()
  const [modalWidth, setModalWidth] = useState(350)
  const [dataType, setDataType] = useState<TextDateTimeDataType>(TextDateTimeDataType.PLAIN_TEXT)

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
    resolver: yupResolver(
      modalInputValidationSchema(
        translate,
        dataType,
        textConstantsPackage.minTextLength,
        textConstantsPackage.maxTextLength
      )
    ),
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
      <ModalContent {...getModalContentStyle(modalWidth)} data-cy={DATA_CY_INPUT_MODAL}>
        <form>
          <ModalHeader>{translate(textConstantsPackage.modalTitleKey)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!onlyTextInput && (
              <DataTypeSelector
                setSelectedDataType={(newDataType: TextDateTimeDataType) => setDataType(newDataType)}
                selectedDataType={dataType}
              />
            )}

            {dataType === TextDateTimeDataType.PLAIN_TEXT && (
              <TextInput
                onlyTextInput={onlyTextInput}
                saveData={saveData}
                placeholder={translate(textConstantsPackage.placeholderKey) ?? ''}
                control={control}
                reset={reset}
                errors={errors}
                isValid={isValid}
              />
            )}
            {dataType === TextDateTimeDataType.DATE_TIME && <div>COMING SOON!</div>}
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default InputModal
