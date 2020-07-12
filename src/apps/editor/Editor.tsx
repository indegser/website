import { FC } from "react";
import FormContainer from "common/atoms/container/FormContainer";
import Label from "common/atoms/form/Label";
import { PrimaryButton, RectPrimaryButton } from "common/atoms/button/Button";
import { useEditorForm } from "./Editor.hooks";
import { FormGroup } from "common/atoms/form/FormGroup";
import ImageUpload from "./image-upload/ImageUpload";
import styled from "@emotion/styled";

interface Props {
  story?: IStory;
}

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Editor: FC<Props> = ({ story }) => {
  const { register, handleSubmit } = useEditorForm(story);

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label required label="슬러그" htmlFor="slug" />
            <input
              ref={register}
              id="slug"
              name="slug"
              defaultValue={story?.slug}
            />
          </FormGroup>
          <FormGroup>
            <Label label="내용" htmlFor="content" />
            <textarea
              rows={12}
              ref={register}
              id="content"
              name="content"
              defaultValue={story?.content}
            />
          </FormGroup>
          <FormGroup>
            <Action>
              <RectPrimaryButton type="submit">Publish</RectPrimaryButton>
            </Action>
          </FormGroup>
        </form>
        <ImageUpload />
      </FormContainer>
    </div>
  );
};

export default Editor;
