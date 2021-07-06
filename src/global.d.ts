import { Component, ReactElement } from "react";
import "react-markdown/src/ast-to-react";

module "react-markdown" {
  declare function ReactMarkdown(options: any): ReactElement;
}
