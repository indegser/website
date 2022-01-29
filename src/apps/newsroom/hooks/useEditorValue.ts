import { useState } from "react";
import { Descendant } from "slate";
import { CustomElement } from "global";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.",
      },
      {
        type: "link",
        url: "https://en.wikipedia.org/wiki/Hypertext",
        children: [{ text: "hyperlink" }],
      },
      {
        text: "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.",
      },
    ],
  },
  {
    type: "image",
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }],
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=46hO2j7Y_Q4",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "You can delete images with the cross in the top left. Try deleting this sheep:",
      },
    ],
  },
  {
    type: "image",
    url: "https://source.unsplash.com/zOwZKwZOZq8",
    children: [{ text: "" }],
  },
];

export const useEditorValue = () => {
  return useState(initialValue);
};
