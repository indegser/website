import { forwardRef, HTMLProps } from 'react'
import Box from '../box/Box'
import { InfoLabelText, FieldLabelText } from '../typography/LabelText'
import Textarea from './Textarea'

export enum FormGroupWidthVariant {
  Short = '250px',
  FullWidth = '100%',
}

export enum FormGroupFieldVariant {
  Textfield = 'text',
  Textarea = 'textarea',
}

interface InputProps extends HTMLProps<HTMLInputElement> {
  widthVariant?: FormGroupWidthVariant
  fieldVariant?: FormGroupFieldVariant.Textfield
  required?: boolean
}
interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  widthVariant?: FormGroupWidthVariant
  fieldVariant?: FormGroupFieldVariant.Textarea
  required?: boolean
}

const FormGroup = forwardRef<any, InputProps | TextAreaProps>(
  ({ name, label, fieldVariant, widthVariant, required, ...props }, ref) => {
    const renderField = () => {
      const fieldProps = {
        ...props,
        name,
        ref,
      }

      if (fieldVariant === FormGroupFieldVariant.Textarea) {
        return <Textarea {...(fieldProps as any)} />
      }

      return <input {...(fieldProps as HTMLProps<HTMLInputElement>)} />
    }

    return (
      <Box
        my={3}
        style={{ width: widthVariant || FormGroupWidthVariant.FullWidth }}
      >
        <Box mb={2}>
          <label htmlFor={name}>
            <FieldLabelText>{label}</FieldLabelText>
            {!required && <InfoLabelText>(optional)</InfoLabelText>}
          </label>
        </Box>
        <Box>{renderField()}</Box>
      </Box>
    )
  }
)

export default FormGroup
