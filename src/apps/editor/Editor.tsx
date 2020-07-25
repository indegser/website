import { FC } from "react";
import FormContainer from "common/atoms/container/FormContainer";
import Label from "common/atoms/form/Label";
import { RectPrimaryButton } from "common/atoms/button/Button";
import { useEditorForm } from "./Editor.hooks";
import { FormGroup } from "common/atoms/form/FormGroup";
import ImageUpload from "./image-upload/ImageUpload";
import styled from "@emotion/styled";
import Preview from "./Preview";
import { Tabs, TabPane } from "ui/tabs";

interface Props {
  story?: IStory;
}

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Editor: FC<Props> = ({ story }) => {
  const { watch, register, handleSubmit } = useEditorForm(story);

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label required label="슬러그" htmlFor="slug" />
            <input ref={register} id="slug" name="slug" />
          </FormGroup>
          <Tabs defaultActiveKey="1">
            <TabPane tab="쓰기" key="1">
              <FormGroup>
                <textarea
                  rows={12}
                  ref={register}
                  id="content"
                  name="content"
                />
              </FormGroup>
            </TabPane>
            <TabPane tab="미리보기" key="2">
              <Preview watch={watch} />
            </TabPane>
          </Tabs>
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
