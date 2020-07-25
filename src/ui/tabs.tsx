import * as RcTabs from "rc-tabs";
import styled from "@emotion/styled";
import { ClassNames } from "@emotion/core";
import { FC } from "react";

export const Tabs: FC<RcTabs.TabsProps> = (props) => {
  return (
    <ClassNames>
      {({ css }) => (
        <RcTabs.default
          animated
          prefixCls={css`
            margin: 1rem 0;

            &-nav-list {
              display: flex;
              border-bottom: 1px solid var(--border100);
            }

            &-tab {
              margin-right: 32px;
              padding: 12px 0;
              font-size: 15px;
              cursor: pointer;
              outline: none;
              user-select: none;
              letter-spacing: 0.2px;
            }

            &-tab-active {
              color: var(--primary100);
              font-weight: 500;
            }

            &-tab-btn {
              &:focus {
                outline: none;
              }
            }

            &-ink-bar {
              position: absolute;
              height: 1.5px;
              background: var(--primary100);
              bottom: -1px;
            }
          `}
          {...props}
        />
      )}
    </ClassNames>
  );
};

export const TabPane = styled(RcTabs.TabPane)``;
